DROP TABLE Booking

CREATE TABLE Booking(
    bookingId VARCHAR(255),
    userId VARCHAR(255),
    specialistId VARCHAR(255),
    duration INT,
    jobDescription text,
    salary INT,
    isCompleted BIT DEFAULT 0 NOT NULL
)

ALTER TABLE Booking ADD isCanceled BIT DEFAULT 0 NOT NULL

ALTER TABLE Booking DROP COLUMN icCanceled