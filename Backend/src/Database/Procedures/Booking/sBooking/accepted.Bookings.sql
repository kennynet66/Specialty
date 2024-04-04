CREATE OR ALTER PROCEDURE acceptedBookings (
    @specialistId VARCHAR(255)
)
AS
BEGIN
    SELECT u.fullName, u.email, u.profileImg, s.fullName as sentTo, s.profileImg as requestedPic, b.* FROM Booking b
    INNER JOIN Users u
    ON b.userId = u.userId
    INNER JOIN Users s
    ON b.specialistId = s.userId
    WHERE isAccepted = 1 AND specialistId = @specialistId AND isCompleted = 0
END