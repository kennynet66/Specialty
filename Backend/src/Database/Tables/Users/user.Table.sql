CREATE TABLE Users(
    userId VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isSpecialist BIT DEFAULT 0 NOT NULL,
    isAdmin BIT DEFAULT 0 NOT NULL,
    industry VARCHAR(255) DEFAULT 'user',
    rate INT DEFAULT 0 NOT NULL
    CONSTRAINT fk_Industry_Id FOREIGN KEY(industry)
    REFERENCES Industry(industryId)
)