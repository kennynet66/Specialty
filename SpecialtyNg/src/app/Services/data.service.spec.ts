import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { expectedSpecialists } from './testData/specialists';
import { expectedIdustries } from './testData/industries';
import { expectedUsers } from './testData/users';
import { expectedReviews } from './testData/review';
import { expectedSCancelled, expectedUserBookings } from './testData/bookings';

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should get all specialists", () => {
    service.getAllSpecialists().subscribe(res => {
      expect(res).toBeTruthy()
    })

    const mockReq = testingController.expectOne('http://localhost:3900/users/all-specialists')
    mockReq.flush(Object.values(expectedSpecialists))
    expect(mockReq.request.method).toBe('GET')
  })
  it("should get one specialist", () => {
    let specialistId = "certain-test-id"
    service.getOneSpecialist(specialistId).subscribe((res: any) => {
      expect(res).toBeTruthy()
    })

    const mockReq = testingController.expectOne(`http://localhost:3900/users/specialist/${specialistId}`)

    // Assertions
    mockReq.flush(Object.values(expectedSpecialists[1]))
    expect(mockReq.request.method).toBe('GET')
  })

  it("Should get all Industries", () => {
    service.getAllIndustries().subscribe((res: any) => {
      expect(res).toBeTruthy()
      expect(res.length).toBe(3)
    })

    const mockReq = testingController.expectOne('http://localhost:3900/industry/all')

    // Assertions
    mockReq.flush(Object.values(expectedIdustries))
    expect(mockReq.request.method).toBe('GET')
  })


  it("Sets a user's role", () => {
    let userId = "282165eb-985a-47ed-a874-616ef3396f44"
    let mockRole = "mock role"
    service.setRole(userId, mockRole).subscribe(res => {
      expect(res.success).toEqual("specialist")
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/users/set-role/${userId}`)

    // Assertions
    expect(mockReq.request.method).toBe('PUT')
    expect(mockReq.request.body).toBe(mockRole)
  })

  it("Updates user details", () => {
    const mockDetails = {
      gender: "test gender",
      DOB: "12/12/12",
      about: "This is a random about",
      country: "test-te",
      city: "test-cty",
      phoneNumber: "123456789",
      bankAcNo: 123456789,
      industry: "testing industry",
      bankAcName: "test bank"
    }

    const userId = "282165eb-985a-47ed-a874-616ef3396f44"

    service.updateUser(mockDetails, userId).subscribe(res => {
      expect(res.success).toEqual("Details updated successfully")
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/users/update-details/${userId}`)

    // Assertions
    expect(mockReq.request.method).toEqual('PUT')
    expect(mockReq.request.body).toBe(mockDetails)
  })

  it("Should get one user", () => {
    const userId = "2ba12349-20fe-4d9a-8773-55f0c51b8df1";

    service.getUser(userId).subscribe((res: any) => {
      expect(res).toBeTruthy();
    })

    const mockReq = testingController.expectOne(`http://localhost:3900/users/one-user/${userId}`);

    // Assertions
    mockReq.flush(Object.values(expectedUsers[1]))
    expect(mockReq.request.method).toBe('GET')
  })

  it("Should create a review", () => {
    const userId = "Some user id"
    const specialistId = "Some specialist id"
    const review = {
      review: "this is a good review"
    }

    service.createReview(userId, specialistId, review.review).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.success).toEqual("Review created successfully")
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/reviews/create-review/${userId}/${specialistId}`)

    // Assertions
    expect(mockReq.request.method).toBe('POST')
    expect(mockReq.request.body).toEqual(review)
  })

  it("Should get specialists reviews", () => {
    const specialistId = "5051b85f-3aa9-4a3c-a3d3-139330f0adf5"
    service.getReviews(specialistId).subscribe(res => {
      expect(res).toBeTruthy();
    })

    const mockReq = testingController.expectOne(`http://localhost:3900/reviews/user-reviews/${specialistId}`)

    // Assertions
    mockReq.flush(Object.values(expectedReviews))
    expect(mockReq.request.method).toEqual("GET")
  })

  it("Should update a user's profile image", () => {
    const userId = "some user id"
    const image = {
      image: "some image link"
    }

    service.updateProfileImage(userId, image.image).subscribe(res => {
      expect(res).toBeTruthy()
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/users/setProfileImage/${userId}`)

    // Assertions
    expect(mockReq.request.method).toBe('POST')
    expect(mockReq.request.body).toEqual(image.image)
  })

  it("Creates a booking", () => {
    const specialistId = "Some specialist id";
    const userId = "some user id"
    const details = {
      jobDescription: "This is very random",
      duration: 10,
      salary: 100
    }

    service.createBooking(userId,specialistId, details).subscribe(res => {
      expect(res).toBeTruthy()
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/bookings/create-booking/${userId}/${specialistId}`)

    // Assertions
    expect(mockReq.request.method).toBe('POST')
    expect(mockReq.request.body).toEqual(details)
  })

  it("should get user bookings", ()=>{
    const userId = "some user id";

    service.getUserBookings(userId).subscribe(res => {
      expect(res).toBeTruthy();
    })

    const mockReq = testingController.expectOne(`http://localhost:3900/bookings/user-bookings/${userId}`);

    mockReq.flush(Object.values(expectedUserBookings));
    expect(mockReq.request.method).toBe('GET');
  })

  it("Should cancel bookings", () => {
    const bookingId = "random booking id";

    service.cancelBooking(bookingId).subscribe(res =>{
      expect(res).toBeTruthy();
    });

    const mockReq = testingController.expectOne(`http://localhost:3900/bookings/cancel-booking/${bookingId}`);

    expect(mockReq.request.method).toBe('PUT');
  });

  it("Should get a specialist's cancelled bookings", () => {
    const specialistId  = "Some specialist id"

    service.sCancelledBookings(specialistId).subscribe(res => {
      expect(res).toBeTruthy()
    })

    let mockReq = testingController.expectOne(`http://localhost:3900/sbookings/cancelled/${specialistId}`);

    // Assertions
    mockReq.flush(Object.values(expectedSCancelled));

    expect(mockReq.request.method).toBe('GET');
  })

  it("Should get specialist bookings", () =>{
    const specialistId = "Some specialist id"; 

    service.getSBookings(specialistId).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockReq = testingController.expectOne(`http://localhost:3900/sbookings/bookings/${specialistId}`);

    expect(mockReq.request.method).toEqual('GET');
  })

  it("Should get specialist accepted bookings", () => {
    const specialistId = "Some specialist id";

    service.getSAcceptedBookings(specialistId).subscribe(res => {
      expect(res).toBeTruthy()
    });

    const mockReq = testingController.expectOne(`http://localhost:3900/sbookings/accepted/${specialistId}`);

    expect(mockReq.request.method).toEqual('GET')
  });
});
