CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    fullName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BIT DEFAULT 0 NOT NULL,
    isVerified BIT DEFAULT 0 NOT NULL,
	isWelcomed BIT DEFAULT 0 NOT NULL
)
    -- isSpecialist BIT DEFAULT 0 NOT NULL,
    -- industry VARCHAR(255),
    -- rate INT DEFAULT 0 NOT NULL,

-- DROP TABLE Users
-- ALTER TABLE Users ADD isVerified

SELECT * FROM Users
SELECT * FROM Details

ALTER TABLE Users ADD profileImg VARCHAR(255)