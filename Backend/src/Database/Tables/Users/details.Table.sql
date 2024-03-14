CREATE TABLE Details(
    detailsId VARCHAR(255),
    userId VARCHAR(255),
    DOB VARCHAR(255),
    gender VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    phoneNumber VARCHAR(255),
    dateJoined DATETIME,
    about text,
    bankAcNo BIGINT,
    bankAcName VARCHAR(255),
	CONSTRAINT fk_user_id FOREIGN KEY(userId)
	REFERENCES Users(userId)
)
