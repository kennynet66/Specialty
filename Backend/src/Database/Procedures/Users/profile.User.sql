CREATE OR ALTER PROCEDURE updateProfileImage(
    @id VARCHAR(255),
    @image VARCHAR (255)
)
AS
BEGIN
    UPDATE Users SET
    profileImg = @image
    WHERE userId = @id
END

SELECT * FROM Users