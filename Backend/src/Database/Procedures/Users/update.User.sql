CREATE OR ALTER PROCEDURE updateDetails(
    @userId VARCHAR(255),
    @gender VARCHAR(255),
    @DOB VARCHAR(255),
    @about VARCHAR(255),
    @country VARCHAR(255),
    @city VARCHAR(255),
    @phoneNumber VARCHAR(255),
    @bankAcNo BIGINT,
    @bankAcName VARCHAR(255)
)
AS
BEGIN
    UPDATE Details
    SET
    gender = @gender,
    DOB = @DOB,
    about = @about,
    country = @country,
    city = @city,
    phoneNumber = @phoneNumber,
    bankAcNo = @bankAcNo,
    bankAcName = @bankAcName
    WHERE userId = @userId
END