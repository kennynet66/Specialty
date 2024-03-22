import { Router } from "express";
import { deleteUser, getAllSpecialists, getAllUsers, getOneSpecialist, getOneUser, setRole, updateDetails, userDetails } from "../Controllers/user.Controller";

const userRoutes = Router();

userRoutes.get('/all-users', getAllUsers);
userRoutes.put('/set-role/:id', setRole);
userRoutes.put('/update-details/:id', updateDetails);
userRoutes.get('/one-user/:id', getOneUser);
userRoutes.delete('/delete-user/:id', deleteUser);
userRoutes.get('/details/:id', userDetails);
userRoutes.get('/all-specialists', getAllSpecialists);
userRoutes.get('/specialist/:id', getOneSpecialist);

export default userRoutes;