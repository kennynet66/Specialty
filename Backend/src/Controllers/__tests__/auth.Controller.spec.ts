import mssql from 'mssql'
import { loginUser, registerUser } from '../auth.Controller';
import bcrypt from 'bcrypt'
import * as authController from '../auth.Controller'

describe("Successfully registers a valid user", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  });

  // Successfully registers a user if the data is valid
  it("Successfully registers a valid user", async () => {
    const req = {
      body: {
        fullName: "John Doe",
        email: "john@jestjs.io",
        password: "!Pa$$w0rd"
      }
    }

    jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("Hashed password - 7gyverf987uygbeuygfyttojnbvc02ugfyhjcj3876f3wh3tce" as never)

    const mockedInput = jest.fn().mockReturnThis()
    const mockedExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: [1] })

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute
    }

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest)
    }

    jest.spyOn(mssql, "connect").mockResolvedValue(mockedPool as never)

    await registerUser(req as any, res)
    expect(res.json).toHaveBeenCalledWith({ success: "Registered successfully" })
    expect(res.status).toHaveBeenCalledWith(200)
  })

  // When an empty body is parsed
  it("Returns an error when an empty body is parsed", () => {
    const req = {
      body: {}
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"fullName\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // When the fullName field is empty
  it("Returns an error when the fullName field is empty", () => {
    const req = {
      body: {
        fullName: "",
        email: "test@jestjs.io",
        password: "!Pa$$w0rd"
      }
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"fullName\" is not allowed to be empty" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // When the email field is empty
  it("Returns an error when the email field is empty", () => {
    const req = {
      body: {
        fullName: "John Doe",
        email: "",
        password: "!Pa$$w0rd"
      }
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is not allowed to be empty" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // When password field is empty
  it("Returns an error when the password field is empty", () => {
    const req = {
      body: {
        fullName: "John Doe",
        email: "test@jestjs.io",
        password: ""
      }
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"password\" is not allowed to be empty" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // Email field is MIA
  it("Returns an error when the email field is missing", () => {
    const req = {
      body: {
        fullName: "John Doe",
        password: "!Pa$$w0rd"
      }
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // Password field is MIA
  it("Returns an error when the password field is missing", () => {
    const req = {
      body: {
        fullName: "John Doe",
        email: "test@jestjs.io"
      }
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"password\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
})

describe("It successfully logs in a valid user", () => {
  let res: any

  beforeEach(() => {
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    }
  });

  it('Successfully logs in a valid user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };

    const mockPool = {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [{ email: 'test@example.com', password: 'hashedPassword', isVerified: true }] })
    };
    jest.spyOn(mssql, 'connect').mockResolvedValue(mockPool as never);

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    jest.spyOn(authController, 'createToken').mockReturnValue('token');

    await authController.loginUser(req as any, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: 'Login successful',
      token: expect.any(String)
    });
  });

  // Email tests
  it("Returns an error when body is empty", () => {
    const req = {
      body: {}
    }

    loginUser(req as any, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })

  it("Returns an error when email field is missing", () => {
    const req = {
      body: {
        password: "!Pa$$w0rd."
      }
    }

    loginUser(req as any, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })

  it("Returns an error when email field is empty", () => {
    const req = {
      body: {
        email: "",
        password: "!Pa$$w0rd."
      }
    }

    loginUser(req as any, res);

    // Assertions
    expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is not allowed to be empty" })
    expect(res.status).toHaveBeenCalledWith(202)
  })

  // Password test cases
  it("Returns an error when password field is missing", () => {
    const req = {
      body: {
        email: "test@test.com"
      }
    };

    loginUser(req as any, res);

    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({ "error": "\"password\" is required" })
  });

  it('Returns an error when the password field is empty', () => {
    const req = {
      body: {
        email: "test@test.com",
        password: ""
      }
    };

    loginUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({ "error": "\"password\" is not allowed to be empty" });
    expect(res.status).toHaveBeenCalledWith(202)
  });

});