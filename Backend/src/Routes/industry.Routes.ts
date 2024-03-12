import { Router } from "express";
import { allIndustries, createIndustry, deleteIndustry } from "../Controllers/industry.Controller";

const industryRoutes = Router();

industryRoutes.post('/new', createIndustry);
industryRoutes.get('/all', allIndustries);
industryRoutes.delete('/delete/:id', deleteIndustry);

export default industryRoutes