const express = require("express");
const router = express.Router();

const {
    createPaste,
    getAllPastes,
    getPasteById,
    updatePaste,
    deletePaste,
} = require("../controllers/pasteController");

router.get("/:id", getPasteById);
router.put("/:id", updatePaste);
router.post("/", createPaste);
router.get("/", getAllPastes);
router.delete("/:id", deletePaste);

module.exports = router;