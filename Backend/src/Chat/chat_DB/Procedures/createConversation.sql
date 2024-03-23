CREATE OR ALTER PROCEDURE createChat(
    @chatId VARCHAR(255),
    @senderId VARCHAR(255),
    @receiverId VARCHAR(255),
    @message text,
    @messageId VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Chats(chatId, senderId, receiverId, sentAt)
    VALUES(@chatId, @senderId, @receiverId, GETDATE());
    INSERT INTO Messages(messageId, chatId, message)
    VALUES(@messageId, @chatId, @message)
END;