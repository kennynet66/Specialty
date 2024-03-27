CREATE OR ALTER PROCEDURE userReviews(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT reviewId, u.userId, specialistId, review, postedAt, fullName, profileImg FROM Reviews r
    INNER JOIN Users u
    ON r.userId = u.userId
    WHERE specialistId = @userId
END;
    -- SELECT * FROM Reviews
    -- WHERE specialistId = '74361e72-c9a9-4d9d-acea-9158894be41d'