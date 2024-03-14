CREATE OR ALTER PROCEDURE deleteIndustry(
    @industryId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM Industry WHERE industryId = @industryId;
END;