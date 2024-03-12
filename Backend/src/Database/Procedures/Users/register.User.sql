CREATE OR ALTER PROCEDURE registerUser(
    @userId VARCHAR(255),
    @fullName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users(userId,fullName, email, password)
    VALUES(@userId, @fullName, @email, @password);
END