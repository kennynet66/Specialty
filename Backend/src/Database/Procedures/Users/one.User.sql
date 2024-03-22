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

CREATE OR ALTER PROCEDURE getAllSpecialists
AS
BEGIN
    SELECT u.userId, fullName, profileImg, email, d.gender, d.about, i.industryName, d.rate FROM Users u
    INNER JOIN Details d
    ON u.userId = d.userId
    INNER JOIN industry i 
    on d.industry = i.industryId
    WHERE u.role = 'specialist'
END;


CREATE OR ALTER PROCEDURE getOneSpecialist(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT u.userId, fullName, profileImg, email, d.gender, d.about, i.industryName, d.rate FROM Users u
    INNER JOIN Details d
    ON u.userId = d.userId
    INNER JOIN industry i 
    on d.industry = i.industryId
    WHERE u.role = 'specialist' AND u.userId = @userId
END