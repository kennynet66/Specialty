CREATE OR ALTER PROCEDURE acceptBooking (
    @bookingId VARCHAR(255)
)
AS
BEGIN
    UPDATE Booking
    SET isAccepted = 1
    WHERE bookingId = @bookingId
END