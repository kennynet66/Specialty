CREATE OR ALTER PROCEDURE creatBooking(
    @bookingId VARCHAR(255),
    @userId VARCHAR(255),
    @specialistId VARCHAR(255),
    @duration INT,
    @jobDescription text,
    @salary INT
)
AS
BEGIN
    INSERT INTO Booking
        ( bookingId, userId, specialistId, duration, jobDescription, salary
        )
    VALUES
    (
        @bookingId, @userId, @specialistId, @duration, @jobDescription, @salary
    )
END