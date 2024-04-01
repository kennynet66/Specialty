CREATE OR ALTER PROCEDURE sCompleteBooking(
    @specialistId VARCHAR(255)
)
AS
BEGIN
    UPDATE Booking
    SET isCompleted = 1
    WHERE specialistId = @specialistId
END