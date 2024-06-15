const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const { jwtAuthMiddleware } = require("../middleware/jwt");

// get candidate list
router.get("/", candidateController.getCandidates);

// create new candidate
router.post("/", jwtAuthMiddleware, candidateController.createCandidate);

// update existing candidate
router.put(
  "/:candidateId",
  jwtAuthMiddleware,
  candidateController.updateCandidate
);

// delete candidate
router.delete(
  "/:candidateId",
  jwtAuthMiddleware,
  candidateController.deleteCandidate
);

// vote for a candidate
router.post(
  "/vote/:partyName",
  jwtAuthMiddleware,
  candidateController.voteForCandidate
);

// live vote count
router.get("/vote/count", jwtAuthMiddleware, candidateController.voteCounter);

module.exports = router;
