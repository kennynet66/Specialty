CREATE OR ALTER PROCEDURE userBookings(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT u.fullName, u.email, u.profileImg, s.fullName as sentTo ,b.* FROM Booking b
    INNER JOIN Users u
    ON b.userId = u.userId
    INNER JOIN Users s
    ON b.specialistId = s.userId
    WHERE b.userId = @userId AND isCompleted = 0 AND isCanceled = 0 AND isAccepted = 0
END

UPDATE Booking
SET isAccepted = 0

SELECT * FROM Booking