import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('AuthService', () => {
  let service: AuthService;
  let testingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("Should register a user", () => {
    const mockUser = {
      fullName: "Kenny Maina",
      email: "kennynet66@gmail.com",
      password: "12345678",
      industry: "Sample industry",
      rate: 12,
      isSpecialist: false
  }

  service.registerUser(mockUser).subscribe(res => {
    expect(res).toBeTruthy();
    expect(res.success).toEqual("User created successfully")
  })

  const mockReq = testingController.expectOne('http://localhost:3900/auth/register');

  // Assertions
  expect(mockReq.request.method).toEqual("POST");
  expect(mockReq.request.body).toEqual(mockUser)
  })

  it("Should validate a user", () => {
    const userId = "somerandomid";
    service.validateUser(userId).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockReq = testingController.expectOne(`http://localhost:3900/auth/validate-user/${userId}`);

    // Assertions
    expect(mockReq.request.method).toEqual("PUT");
    expect(mockReq.request.body).toEqual({});
  })

  it("Should login a user", () =>{
    const mockUser = {
      email: "test@testie.test",
      password: "!Pa$$w0rd"
    }

    service.loginUser(mockUser).subscribe(res => {
      expect(res).toBeTruthy();
    });

    let mockReq = testingController.expectOne('http://localhost:3900/auth/login');

    // Assertions
    expect(mockReq.request.method).toBe("POST");
    expect(mockReq.request.body).toEqual(mockUser);
  })

  it("Should check user details", () => {
    const token = "randomtoken ucyw8ychr3uke23ikexxucxk276fyh3r8gv4h8gc"

    service.checkUserDetails(token).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockReq = testingController.expectOne('http://localhost:3900/auth/details');

    expect(mockReq.request.method).toEqual('GET');
  });
});
