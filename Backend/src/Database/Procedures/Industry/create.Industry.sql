CREATE OR ALTER PROCEDURE createIndustry(
    @industryId VARCHAR(255),
    @industryName VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Industry(industryId, industryName)
    VALUES(@industryId, @industryName);
END;
