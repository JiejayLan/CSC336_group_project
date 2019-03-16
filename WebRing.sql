DROP DATABASE IF EXISTS WebRing;
CREATE DATABASE WebRing;
USE WebRing;

CREATE TABLE User (
	name VARCHAR(64),
	created_on DATETIME,
	PRIMARY KEY(name)
);

CREATE TABLE WebRing (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(512),
	description TEXT,
	creator VARCHAR(64) REFERENCES User(name),
	created_on DATETIME,
	PRIMARY KEY(id)
);

CREATE TABLE Member (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	user VARCHAR(64) REFERENCES User(name),
	ring INTEGER UNSIGNED REFERENCES WebRing(id)
        ON DELETE CASCADE,
	joined_on DATETIME,
	PRIMARY KEY(id),
    UNIQUE KEY (user, ring)
);

CREATE TABLE Urls (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	url VARCHAR(2048),  -- Microsoft says IE can handle up to 2083,
						-- and other browsers have their own limits.
						-- I think that 2048 should be enough for anyone.
	ring INTEGER UNSIGNED REFERENCES WebRing(id)
        ON DELETE CASCADE,
	next INTEGER UNSIGNED REFERENCES Urls(id),
	previous INTEGER UNSIGNED REFERENCES Urls(id),
    added_on DATETIME,
    added_by INTEGER UNSIGNED REFERENCES Member(id),
	PRIMARY KEY(id)
);

DELIMITER //

CREATE PROCEDURE DeleteURL (IN pId INTEGER UNSIGNED)
BEGIN
    DECLARE nxt, prev INTEGER UNSIGNED;
	SELECT next FROM Urls WHERE id = pId INTO nxt;
	SELECT previous FROM Urls WHERE id = pId INTO prev;
    DELETE FROM Urls WHERE id = pId;
    UPDATE Urls SET next=nxt WHERE id=prev;
    UPDATE Urls SET previous=prev WHERE id=nxt;
END//

CREATE PROCEDURE AppendURL (IN pRing INTEGER UNSIGNED, IN pUrl VARCHAR(2048), IN pUser VARCHAR(64))
BEGIN
    DECLARE low, high INTEGER UNSIGNED;
	SELECT id FROM Urls WHERE ring = pRing ORDER BY added_on, id DESC LIMIT 1 INTO high;
	SELECT previous FROM Urls WHERE id = high INTO low;
	INSERT INTO Urls VALUES (0, pUrl, pRing, low, high, NOW(), getMemberId(pRing, pUser));
    IF high IS NULL THEN -- Here we assume that `low IS NULL` iff `high IS NULL`
        UPDATE Urls SET next=LAST_INSERT_ID(), previous=LAST_INSERT_ID() WHERE id=LAST_INSERT_ID();
    ELSE
        UPDATE Urls SET next=LAST_INSERT_ID() WHERE id=high;
        UPDATE Urls SET previous=LAST_INSERT_ID() WHERE id=low;
    END IF;
END//

CREATE PROCEDURE InsertURL (IN pUrl VARCHAR(2048), IN pUser VARCHAR(64), IN pId INTEGER UNSIGNED, INOUT newId INTEGER UNSIGNED)
BEGIN
    -- NOTE:  This is just a demo, but we should do a security check here
    -- to see if the user is a member of the ring being inserted into.
    DECLARE ring_id, prev INTEGER UNSIGNED;
	SELECT ring FROM Urls WHERE id = pId INTO ring_id;
	SELECT previous FROM Urls WHERE id = pId INTO prev;
	INSERT INTO Urls VALUES (0, pUrl, ring_id, pId, prev, NOW(), getMemberId(ring_id, pUser));
    SELECT LAST_INSERT_ID() INTO newId;
    UPDATE Urls SET next=LAST_INSERT_ID() WHERE id=prev;
    UPDATE Urls SET previous=LAST_INSERT_ID() WHERE id=pId;
END//

CREATE PROCEDURE CreateWebRing (IN name VARCHAR(512), IN description TEXT, IN user VARCHAR(64), IN url VARCHAR(2048), INOUT newId INTEGER UNSIGNED)
BEGIN
    -- The initial member is added via trigger.
    INSERT INTO WebRing VALUES (0, name, description, user, NOW());
    SELECT LAST_INSERT_ID() INTO newId;
    IF url IS NOT NULL THEN
        CALL AppendURL(newId, url, user);
    END IF;
END//

CREATE FUNCTION getMemberId (pRing INTEGER UNSIGNED, pName VARCHAR(64))
RETURNS INTEGER UNSIGNED
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE member_id INTEGER UNSIGNED;
    SELECT id FROM Member WHERE user = pName AND ring = pRing INTO member_id;
    RETURN member_id;
END//

CREATE TRIGGER AddFirstMember
AFTER INSERT ON WebRing FOR EACH ROW
BEGIN
    INSERT INTO Member VALUES (0, NEW.creator, NEW.id, NOW());
END//

DELIMITER ;

INSERT INTO User VALUES ('JC', '2001-01-01 01:01:01'),
						('AT', '2002-02-02 02:02:02'),
						('KG', '2003-03-03 03:03:03'),
						('JVN', '2004-04-04 04:04:04');

SET @cool = 0;
SET @awful = 0;
SET @mathy = 0;

CALL CreateWebRing(
    'Cool Stuff',
    'A WebRing for only the coolest webpages...  The list is empty because as all of the cool people know, nothing is cool.',
    'JC',
    NULL,
    @cool);

CALL CreateWebRing(
    'Awful Stuff',
    'A WebRing for only the most awful stuff...  My cup runneth over.',
    'JC',
    NULL,
    @awful);

CALL CreateWebRing(
    'Mathy Stuff',
    'A WebRing for only the most mathy stuff.',
    'AT',
    NULL,
    @mathy);

INSERT INTO Member VALUES (0, 'JC', @mathy, '2002-07-01 01:02:00');

CALL AppendURL(@awful, 'https://reddit.com', 'JC');
CALL AppendURL(@awful, 'https://slashdot.org', 'JC');
CALL AppendURL(@awful, 'https://news.ycombinator.com', 'JC');
CALL AppendURL(@awful, 'https://www.mysql.com/', 'JC');
CALL AppendURL(@mathy, 'https://terrytao.wordpress.com/', 'AT');
CALL AppendURL(@mathy, 'https://www.johndcook.com/blog/', 'AT');
CALL AppendURL(@mathy, 'https://blogs.ams.org/blogonmathblogs/', 'JC');

CREATE VIEW WebRingUrlInfo AS
    SELECT WR.id,
           IFNULL(COUNT(U.id), 0) AS url_count
    FROM WebRing WR
    JOIN Urls U ON U.ring = WR.id
    GROUP BY WR.id;

CREATE VIEW WebRingMemberInfo AS
    SELECT WR.id,
           IFNULL(COUNT(M.id), 0) AS member_count
    FROM WebRing WR
    JOIN Member M ON M.ring = WR.id
    GROUP BY WR.id;

CREATE VIEW WebRingInfo AS
    SELECT WR.id,
           WR.name,
           WR.creator,
           DATE_FORMAT(WR.created_on, '%Y-%c-%d %h:%i:%s') AS created_on,
           WR.description,
           UI.url_count,
           MI.member_count
    FROM WebRing WR
    LEFT OUTER JOIN WebRingUrlInfo UI ON WR.id = UI.id
    JOIN WebRingMemberInfo MI ON WR.id = MI.id
    ORDER BY WR.name;
