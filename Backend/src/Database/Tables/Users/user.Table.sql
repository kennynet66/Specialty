CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    fullName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' NOT NULL,
    isAdmin BIT DEFAULT 0 NOT NULL,
    isVerified BIT DEFAULT 0 NOT NULL,
	isWelcomed BIT DEFAULT 0 NOT NULL,
    profileImg VARCHAR(255) DEFAULT 'https://picsum.photos/721/400' NOT NULL
)
    -- isSpecialist BIT DEFAULT 0 NOT NULL,
    -- industry VARCHAR(255),
    -- rate INT DEFAULT 0 NOT NULL,

-- DROP TABLE Users
-- ALTER TABLE Users ADD rate INT DEFAULT 0 NOT NULL

ALTER TABLE Users
DROP COLUMN rate;
ALTER TABLE Users
DROP CONSTRAINT DF__Users__rate__29221CFB

SELECT * FROM Users
SELECT * FROM Details

DELETE FROM Details
DELETE FROM Users

UPDATE Users SET profileImg = 'https://picsum.photos/721/400';
ALTER TABLE Details ADD rate INT DEFAULT 0 NOT NULL