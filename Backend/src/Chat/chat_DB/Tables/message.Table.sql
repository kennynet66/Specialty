CREATE TABLE Messages(
    messageId VARCHAR(255),
    chatId VARCHAR(255),
    message text
    CONSTRAINT fk_chat_id FOREIGN KEY(chatId)
    REFERENCES Chats(chatId)
)