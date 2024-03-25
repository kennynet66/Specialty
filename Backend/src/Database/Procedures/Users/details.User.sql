CREATE OR ALTER PROCEDURE userDetails(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Details WHERE userId = @userId
END