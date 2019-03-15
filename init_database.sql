DROP DATABASE IF EXISTS job_first;
CREATE DATABASE job_first;
USE job_first;


CREATE TABLE User (
    user_ID INTEGER UNSIGNED NOT NULL,
	username VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
    phone_number VARCHAR,
    email VARCHAR,

	PRIMARY KEY(user_ID)
);

-- NEED INFO
CREATE TABLE Employee (
    employee_ID INTEGER UNSIGNED NOT NULL REFERENCES User(user_ID),
    education VARCHAR(128),
    experience VARCHAR(256),

	PRIMARY KEY(employee_ID)
);

CREATE TABLE Employer (
    employer_ID INTEGER UNSIGNED NOT NULL REFERENCES User(user_ID),
    business VARCHAR,
    address VARCHAR,
    
	PRIMARY KEY(employeer_ID)
);

-- do we need user_type to only store one attribute???
CREATE TABLE User_Type(
    type_ID INTEGER UNSIGNED NOT NULL REFERENCES User(user_ID),
    type_name VARCHAR(64),
	PRIMARY KEY(type_ID)
);

CREATE TABLE Jobs (
    job_ID INTEGER UNSIGNED,
    poster_ID INTEGER UNSIGNED NOT NULL REFERENCES Employeer(employeer_ID),
    job_title VARCHAR,
    description VARCHAR,
    location VARCHAR,

	PRIMARY KEY(job_ID)
);

CREATE TABLE Applied (
    applicant_ID INTEGER UNSIGNED NOT NULL REFERENCES Employee(employee_ID),
    applied_jobID INTEGER UNSIGNED NOT NULL REFERENCES Jobs(job_ID),
    application_ID INTEGER UNSIGNED NOT NULL REFERENCES Application(application_ID),
    PRIMARY KEY(applicant_ID, applied_jobID)
);

CREATE TABLE Follow(
    follower_ID INTEGER UNSIGNED NOT NULL REFERENCES Employee(employee_ID),
    followed_ID INTEGER UNSIGNED NOT NULL REFERENCES Employeer(employeer_ID),
    PRIMARY KEY(follower_ID, followed_ID)
);

-- NEED INFO
CREATE TABLE Application(
    application_ID INTEGER UNSIGNED NOT NULL,
    created_on DATETIME,
    applicant_ID INTEGER UNSIGNED NOT NULL REFERENCES Employee(employee_ID),
    applied_jobID INTEGER UNSIGNED NOT NULL REFERENCES Jobs(job_ID),
    PRIMARY KEY(application_ID)
);

CREATE TABLE Language(
    language_ID INTEGER UNSIGNED NOT NULL ,
    language_name VARCHAR(64),
    PRIMARY KEY(language_ID )
);

CREATE TABLE Speak(
    person_ID INTEGER UNSIGNED NOT NULL REFERENCES Employee(employee_ID),
    language_ID INTEGER UNSIGNED NOT NULL REFERENCES Language(language_ID),
    PRIMARY KEY(person_ID, language_ID)
);



