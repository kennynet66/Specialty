CREATE OR ALTER PROCEDURE getOneUser(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT  u.userId, profileImg, fullName, email,d.DOB, d.gender, d.city, d.phoneNumber FROM Users u
    INNER JOIN Details d 
    ON d.userId = u.userId
    WHERE u.userId = @userId;
END;