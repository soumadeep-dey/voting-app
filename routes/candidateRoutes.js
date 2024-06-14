const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

// get candidate list
router.get("/", candidateController.getCandidates);

// create new candidate
router.post("/:candidateId", candidateController.createCandidate);

// update existing candidate
router.put("/:candidateId", candidateController.updateCandidate);

// delete candidate
router.delete("/:candidateId", candidateController.deleteCandidate);

module.exports = router;
