import express from "express";
import { userMiddleware } from "../middleware/verify.js";
import { uploadMultipleFiles, uploadSingleFiles } from "../controllers/files.controllers.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/single", upload.single('files'), uploadSingleFiles)
router.post("/multiple", upload.array('multiple_files', 3), uploadMultipleFiles)

export default router;
