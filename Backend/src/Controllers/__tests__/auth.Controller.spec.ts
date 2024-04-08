import mssql from 'mssql'
import { loginUser, registerUser } from '../auth.Controller';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

describe("Successfully registers a valid user", () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
  })

  // Successfully registers a user if the data is valid
  it("Successfully registers a user", async () => {
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
  it("returns an error when an empty body is parsed", () => {
    const req = {
      body: {}
    }

    registerUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({ "error": "\"fullName\" is required" })
    expect(res.status).toHaveBeenCalledWith(202)
  })
  // When the fullName field is empty
  it("returns an error when the fullName field is empty", () => {
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
  it("returns an error when the email field is empty", () => {
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
  it("returns an error when the email field is empty", () => {
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
  it("returns an error when the email field is missing", () => {
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
  it("returns an error when the email field is missing", () => {
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
  })

  it("Successfully logs in a user", () => {
    let expectedUser = {
      userId: '373a0664-9937-4a1c-b263-c55ac4c4d71a',
      fullName: 'John Doe',
      email: 'test@jestjs.io',
      password: '$2b$05$41vZvHmwbvn26Vvy1a.xxeDmVoI24BdOLcQS1qlpXshZXJlnq1S1i',
      role: 'user',
      isAdmin: false,
      isVerified: true,
      isWelcomed: true,
      profileImg: 'http://res.cloudinary.com/dtvrzfi1b/image/upload/v1712052441/fqjmyu1vovcdzeokxv8c.jpg'
    }

    const req = {
      body: {
        email: "test@jestjs.io",
        password: "correct password"
      }
    }

    jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValueOnce({ recordSet: [expectedUser] })
    } as never)
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

    function mockCreateToken() {
      const token = jest.spyOn(jwt, 'sign').mockReturnValueOnce("generated token gftfgfju09j2nd209n29j" as never)
      return token
    }

    const token = mockCreateToken().mockReturnValue()

    loginUser(req as any, res)

    expect(res.json).toHaveBeenCalledWith({
      success: "Login successful",
      token
    })
  })
})