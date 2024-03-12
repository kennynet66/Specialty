import { Router } from "express";
import { createIndustry } from "../Controllers/industry.Controller";

const industryRoutes = Router();

industryRoutes.post('/new', createIndustry)

export default industryRoutes