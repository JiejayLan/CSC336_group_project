DROP DATABASE IF EXISTS job_first;
CREATE DATABASE job_first;
USE job_first;

CREATE TABLE User_Type(
    type_ID INTEGER NOT NULL,
    type_name VARCHAR(64),
	PRIMARY KEY(type_ID)
)ENGINE=INNODB;
INSERT INTO User_Type(type_ID ,type_name)
VALUES
    (
        1,
        'employee'
    ),
    (
        2,
        'employer'
    );

CREATE TABLE User (
    user_ID INTEGER UNSIGNED NOT NULL,
	username VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
    phone_number VARCHAR(50),
    email VARCHAR(50),
    user_type INTEGER,
    FOREIGN KEY (user_type)
      REFERENCES User_Type(type_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(user_ID)
)ENGINE=INNODB;

INSERT INTO User(user_ID,username,password,phone_number,email,user_type )
    VALUES
        (
            100,
            'shi bin',
            'shibin1',
            '547-502-5653',
            'shibin32@gmail.com',
            1
        ),
        (
            101,
            'jay',
            'jay1',
            '347-502-5643',
            'lanjie45632@gmail.com',
            1
        ),
        (
            103,
            'gong',
            'gong1',
            '557-502-5653',
            'gong2@gmail.com',
            2
        ),
        (
            104,
            'pan',
            'pan1',
            '347-502-5343',
            'pan45632@gmail.com',
            2
        );


CREATE TABLE Employee (
    employee_ID INTEGER UNSIGNED NOT NULL,
    education VARCHAR(128),
    experience VARCHAR(500),
    FOREIGN KEY (employee_ID)
      REFERENCES User(user_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(employee_ID)
)ENGINE=INNODB;

INSERT INTO Employee(employee_ID,education,experience)
    VALUES
        (
            100,
            'high school',
            'one of the best programmer at boorklyn'
        ),
        (
            101,
            'high school',
            'I love food and coding'
        );


CREATE TABLE Employer (
    employer_ID INTEGER UNSIGNED NOT NULL,
    business VARCHAR(128),
    address VARCHAR(128), 
    FOREIGN KEY (employer_ID)
      REFERENCES User(user_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(employer_ID)
)ENGINE=INNODB;
INSERT INTO Employer(employer_ID,business,address)
VALUES
    (
        103,
        'google',
        '254 Avenue S. brooklyn. ny. 11224'
    ),
    (
        104,
        'MTA',
        '254 Avenue A. NY. ny. 11226'
    );



CREATE TABLE Jobs (
    job_ID INTEGER UNSIGNED,
    poster_ID INTEGER UNSIGNED NOT NULL ,
    job_title VARCHAR(128),
    description VARCHAR(500),
    location VARCHAR(128),
    INDEX(poster_ID),
    FOREIGN KEY (poster_ID)
      REFERENCES Employer(employer_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(job_ID)
)ENGINE=InnoDB;


CREATE TABLE Application(
    application_ID INTEGER UNSIGNED NOT NULL,
    created_on DATE,
    applicant_ID INTEGER UNSIGNED NOT NULL,
    applied_jobID INTEGER UNSIGNED NOT NULL,
    INDEX(applicant_ID ),
    INDEX(applied_jobID),
    FOREIGN KEY (applicant_ID)
      REFERENCES Employee(employee_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (applied_jobID)
      REFERENCES Jobs(job_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(application_ID)
)ENGINE=InnoDB;

INSERT INTO Application(application_ID ,created_on,applicant_ID,applied_jobID)
VALUES
    (
        1000,
        '2019-01-01',
        100,
        1000

    ),
    (
        1001,
        '2019-01-01',
        101,
        1001
    );

CREATE TABLE Applied (
    applicant_ID INTEGER UNSIGNED NOT NULL REFERENCES Employee(employee_ID),
    applied_jobID INTEGER UNSIGNED NOT NULL REFERENCES Jobs(job_ID),
    application_ID INTEGER UNSIGNED NOT NULL REFERENCES Application(application_ID),
    INDEX(applicant_ID),
    INDEX(applied_jobID),
    INDEX(application_ID),
    FOREIGN KEY (applicant_ID)
      REFERENCES Employee(employee_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (applied_jobID)
      REFERENCES Jobs(job_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (application_ID)
      REFERENCES Application(application_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(applicant_ID, applied_jobID)
)ENGINE=InnoDB;
INSERT INTO Applied(applicant_ID ,applied_jobID,application_ID)
VALUES
    (
        100,
        1000,
        1000

    ),
    (
        101,
        1001,
        1001
    );

CREATE TABLE Follow(
    follower_ID INTEGER UNSIGNED NOT NULL,
    followed_ID INTEGER UNSIGNED NOT NULL,
    INDEX(follower_ID),
    INDEX(followed_ID),
    FOREIGN KEY (follower_ID)
      REFERENCES Employee(employee_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (followed_ID)
      REFERENCES Employer(employer_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(follower_ID, followed_ID)
)ENGINE=InnoDB;
INSERT INTO Follow(follower_ID,followed_ID)
VALUES
    (
        100,
        103
    ),
    (
        101,
        104
    );

CREATE TABLE Language(
    language_ID INTEGER UNSIGNED NOT NULL ,
    language_name VARCHAR(64),
    PRIMARY KEY(language_ID )
)ENGINE=InnoDB;
INSERT INTO Language(language_ID,language_name)
VALUES
    (
        100,
        'Chinese'
    ),
    (
        101,
        'Taishan hua'
    );

CREATE TABLE Speak(
    person_ID INTEGER UNSIGNED NOT NULL  ,
    language_ID INTEGER UNSIGNED NOT NULL ,
    INDEX(person_ID ),
    INDEX(language_ID),
    FOREIGN KEY (person_ID)
      REFERENCES Employee(employee_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (language_ID)
      REFERENCES Language(language_ID)
      ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(person_ID, language_ID)
)ENGINE=InnoDB;

INSERT INTO Speak(person_ID,language_ID)
VALUES
    (
        100,
        100
    ),
    (
        101,
        101
    );


-- start of function, trigger, view and procedure
DELIMITER //

CREATE PROCEDURE PostJob (IN job_ID INTEGER UNSIGNED, IN poster_ID INTEGER UNSIGNED, IN job_title VARCHAR(128), IN description VARCHAR(500), IN location VARCHAR(128))
BEGIN

    INSERT INTO Jobs VALUES (job_ID, poster_ID, job_title, description, location);

END//

CREATE TRIGGER add_date BEFORE INSERT 
ON Application
FOR EACH ROW 
    set NEW.created_on = NOW();
//

-- CREATE FUNCTION searchJob (location VARCHAR(128), title VARCHAR(128))
-- RETURNS INTEGER UNSIGNED

-- BEGIN
--     DECLARE member_id INTEGER UNSIGNED;
--     SELECT id FROM Member WHERE user = pName AND ring = pRing INTO member_id;
--     RETURN member_id;
-- END//



DELIMITER ;
-- end of function, trigger, view and procedure


-- Insert data
CALL PostJob(1000, 103, "front-end programmer", "need to know HTML,CSS,JS","New York");
CALL PostJob(1001, 103, "MTA bus operator", "20$ per hour, plus extra benefit","Bronx");
CALL PostJob(1002, 104, "back-end programmer", "Need to know mysql, AWS","New York");
CALL PostJob(1003, 104, "MTA train driver", "eed to word overnight","New York");



