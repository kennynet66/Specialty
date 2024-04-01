CREATE OR ALTER PROCEDURE cancelBooking(
    @bookingId VARCHAR(255)
)
AS
BEGIN
    UPDATE Booking
    SET isCanceled = 1
    WHERE bookingId = @bookingId
END