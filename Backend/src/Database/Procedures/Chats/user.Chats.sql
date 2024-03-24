CREATE OR ALTER PROCEDURE userChats(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT c.*, u.fullName FROM Chats c
    INNER JOIN Users u
    ON c.receiverId = u.userId 
    WHERE senderId = @userId OR receiverId = @userId
END;