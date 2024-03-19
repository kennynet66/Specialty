CREATE OR ALTER PROCEDURE validateUser(
    @userId VARCHAR(255),
    @detailsId VARCHAR(255)
)
AS
BEGIN
    UPDATE Users SET isVerified = 1 WHERE userId = @userId;
    INSERT INTO Details(detailsId, userId, dateJoined)
    VALUES(@detailsId, @userId, GETDATE());
END

