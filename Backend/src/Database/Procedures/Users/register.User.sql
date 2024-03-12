CREATE OR ALTER PROCEDURE registerUser(
    @userId VARCHAR(255),
    @fullName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @rate INT,
    @industry VARCHAR(255),
    @isSpecialist BIT
)
AS
BEGIN
    INSERT INTO Users(userId,fullName, email, password, rate, industry, isSpecialist)
    VALUES(@userId, @fullName, @email, @password, @rate, @industry, @isSpecialist);
END