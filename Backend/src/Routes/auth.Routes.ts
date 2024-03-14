import { Router } from "express";
import { checkUserDetails, loginUser, registerUser, validateUser } from "../Controllers/auth.Controller";
import { verifyToken } from "../Middleware/verifyToken";

const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.put('/validate-user/:id', validateUser);
authRoutes.get('/details', verifyToken, checkUserDetails);

export default authRoutes;