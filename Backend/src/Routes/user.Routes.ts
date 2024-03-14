import { Router } from "express";
import { setRole, updateDetails } from "../Controllers/user.Controller";

const userRoutes = Router();

userRoutes.put('/set-role/:id', setRole);
userRoutes.put('/update-details/:id', updateDetails);

export default userRoutes;