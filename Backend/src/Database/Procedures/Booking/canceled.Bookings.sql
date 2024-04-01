CREATE OR ALTER PROCEDURE canceledBookings(
    @userId VARCHAR(255)
)
AS
BEGIN
    SELECT u.fullName, u.email, u.profileImg, s.fullName as sentTo, s.profileImg as requestedPic, b.* FROM Booking b
    INNER JOIN Users u
    ON b.userId = u.userId
    INNER JOIN Users s
    ON b.specialistId = s.userId
    WHERE b.userId = @userId
    AND isCanceled = 1
END