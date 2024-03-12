CREATE OR ALTER PROCEDURE deleteIndustry(
    @industryId VARCHAR(255)
)
AS
BEGIN
    DELETE From Users WHERE industry = @industryId;
    DELETE FROM Industry WHERE industryId = @industryId;
END;