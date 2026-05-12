import express from "express";
import { handleSubmitScreening } from "../controllers/screening";
const router=express.Router();
router.post("/screening/submit",handleSubmitScreening);

export default router;