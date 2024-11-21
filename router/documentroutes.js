const express = require("express");
const documentController = require("../controllers/documentcontroller");

const router = express.Router();

router.post("/upload", documentController.uploadDocument);
router.get("/", documentController.getDocuments);

module.exports = router;
