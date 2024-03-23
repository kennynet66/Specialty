CREATE TABLE Chats(
    chatId VARCHAR(255) PRIMARY KEY NOT NULL,
    senderId VARCHAR(255),
    receiverId VARCHAR(255),
    sentAt DATETIME
)


SELECT * FROM Chats

DROP TABLE Chats