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

// live vote count
router.get("/vote/count", jwtAuthMiddleware, candidateController.voteCounter);

// vote for a candidate
router.post(
  "/vote/:candidateId",
  jwtAuthMiddleware,
  candidateController.voteForCandidate
);

module.exports = router;
