CREATE OR ALTER PROCEDURE userReviews(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Reviews
    WHERE specialistId = @userId
END;