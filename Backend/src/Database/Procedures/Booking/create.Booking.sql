CREATE OR ALTER PROCEDURE createBooking(
    @bookingId VARCHAR(255),
    @userId VARCHAR(255),
    @specialistId VARCHAR(255),
    @jobDescription text,
    @salary INT,
    @duration INT
)
AS
BEGIN
    INSERT INTO Booking
        ( bookingId, userId, specialistId, jobDescription, salary, duration
        )
    VALUES
    (
        @bookingId, @userId, @specialistId, @jobDescription, @salary,  @duration
    )
END

    INSERT INTO Booking
        ( 
            bookingId,
            userId,
            specialistId,
            jobDescription,
            salary,
            duration
        )
    VALUES
    (
        'tctvyb',
        'gvgvv',
        'ygdsvtv',
        'njn yhyuy',
        12,
        12
    )

SELECT * FROM Booking