CREATE DATABASE IF NOT EXISTS job_board;

CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    description TEXT NOT NULL,
    company VARCHAR(60) NOT NULL,
    location VARCHAR(60) NOT NULL,
    level ENUM('Internship', 'Junior', 'Entry', 'Mid Level', 'Senior') NOT NULL,
    type ENUM('Freelance', 'Contract', 'Part Time', 'Full Time', 'Remote') NOT NULL,
    employer_id INT NOT NULL,
    salary INT,
    FOREIGN KEY (employer_id) REFERENCES employers(id)
);

CREATE TABLE IF NOT EXISTS employers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS seekers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    location VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS job_apps (
	id INT AUTO_INCREMENT PRIMARY KEY,
    job_id NOT NULL INT UNIQUE,
    applicant_id NOT NULL INT,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (applicant_id) REFERENCES seekers(id)
);