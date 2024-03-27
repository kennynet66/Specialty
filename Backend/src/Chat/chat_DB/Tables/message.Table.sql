CREATE TABLE Messages(
	messageId VARCHAR(255),
	chatId VARCHAR(255),
	message VARCHAR(max),
	senderId VARCHAR(255),
	receiverId VARCHAR(255),
	sentAt DATETIME,
	CONSTRAINT fk_chatId FOREIGN KEY(chatId)
	REFERENCES Chats(chatId)
)


ALTER TABLE Messages ADD senderId VARCHAR(255)
ALTER TABLE Messages ADD reciverId VARCHAR(255)