import { registerUser } from "../Controllers/auth.Controller";
import mssql from 'mssql'
import bcrypt from 'bcrypt'
import { Request } from "express";

describe('registerUser', () => {
    let res: any

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })
    // Function successfully registers a new user with valid input data
    it('should register a new user when valid input data is provided', async () => {
      // Mock the necessary dependencies
      const req = {
        body: {
          fullName: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          rate: 5,
          isSpecialist: true
        }
      };

      const pool = {
        request: jest.fn().mockReturnThis(),
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockReturnValue({ recordset: [] }),
        execute: jest.fn().mockReturnValue({ rowsAffected: 1 })
      };
      mssql.connect = jest.fn().mockResolvedValue(pool);
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
  
      // Invoke the function
      await registerUser(req as never, res);
  
      // Check the response
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: "Registered successfully"
      });
    });

    // Function correctly handles empty input data
    it('should return an error when empty input data is provided', async () => {
      // Mock the necessary dependencies
      const req = {
        body: {}
      };
  
      // Invoke the function
      await registerUser(req as never, res);
  
      // Check the response
      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.any(String)
      });
    });
});