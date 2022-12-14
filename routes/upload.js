import { Router } from "express";
import { check } from "express-validator";
import {
  getFile,
  modifyFile,
  uploadFile,
} from "../controllers/upload.controller.js";
import { validCollections } from "../helpers/db-validators.js";
import handleErrors from "../middlewares/handleErrors.js";
import validateFile from "../middlewares/validateFile.js";

const router = Router();

router.get(
  "/:collection/:id",
  [
    check("id", "Debe ser un id valido de mongoo").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    handleErrors,
  ],
  getFile
);

router.post("/", validateFile, uploadFile);

router.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "Debe ser un id valido de mongoo").isMongoId(),
    check("collection").custom((c) =>
      validCollections(c, ["users", "products"])
    ),
    handleErrors,
  ],
  modifyFile
);

export default router;
