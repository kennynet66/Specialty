CREATE OR ALTER PROCEDURE createMessage(
	@messageId VARCHAR(255),
	@chatId VARCHAR(255),
	@message VARCHAR(max),
	@senderId VARCHAR(255),
	@receiverId VARCHAR(255)
)
AS
BEGIN
	INSERT INTO Messages(messageId, chatId, message, sentAt, senderId, receiverId)
	VALUES(@messageId, @chatId, @message, GETDATE(), @senderId, @receiverId);
END;