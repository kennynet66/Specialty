CREATE OR ALTER PROCEDURE industryExists(
    @industryName VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Industry WHERE industryName = @industryName;
END