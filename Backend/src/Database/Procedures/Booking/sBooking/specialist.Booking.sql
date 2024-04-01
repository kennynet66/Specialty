CREATE OR ALTER PROCEDURE sBookings(
    @specialistId VARCHAR(255)
)
AS
BEGIN
    SELECT u.fullName as requestedBy, u.email as requesteeEmail, b.* FROM Booking b
    INNER JOIN Users u
    ON u.userId = b.userId
    WHERE b.specialistId = @specialistId AND b.isAccepted = 0 AND b.isCanceled = 0 AND b.isCompleted = 0
END