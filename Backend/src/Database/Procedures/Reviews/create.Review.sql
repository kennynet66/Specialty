CREATE OR ALTER PROCEDURE createReview(
    @reviewId VARCHAR(255),
    @userId VARCHAR(255),
    @specialistId VARCHAR(255),
    @review text
)
AS
BEGIN
    INSERT INTO Reviews(reviewId, userId, specialistId, review, postedAt)
    VALUES(@reviewId, @userId, @specialistId, @review, GETDATE())
END