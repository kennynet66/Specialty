CREATE OR ALTER PROCEDURE userBookings(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT * FROM Booking b
    WHERE b.specialistId = @userId AND isCompleted = 0 AND isCanceled = 0 AND isAccepted = 0
END

UPDATE Booking
SET isAccepted = 0
