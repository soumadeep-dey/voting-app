const mongoose = require("mongoose");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

// Check if user is admin
const isAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === "admin";
  } catch {
    return false;
  }
};

const candidateController = {
  getCandidates: async (req, res) => {
    try {
      const allCandidates = await Candidate.find({}, "name party");
      console.log("✅ Candidates list fetched");
      res.status(200).json(allCandidates);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createCandidate: async (req, res) => {
    try {
      // Check admin authorization
      if (!(await isAdmin(req.userPayload.id))) {
        return res
          .status(403)
          .json({ message: "Access denied: only admin can access" });
      }
      // Candidate data save
      const candidateData = req.body;
      const newCandidate = new Candidate(candidateData);
      const savedCandidate = await newCandidate.save();
      console.log("✅ New candidate data saved");
      res.status(200).json(savedCandidate);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateCandidate: async (req, res) => {
    try {
      // Check admin authorization
      if (!(await isAdmin(req.userPayload.id))) {
        return res
          .status(403)
          .json({ message: "Access denied: only admin can access" });
      }
      // Update Candidate
      const candidateId = req.params.candidateId;

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        console.log("Invalid candidate ID:", candidateId);
        return res.status(400).send({ error: "Invalid candidate ID" });
      }
      const updateData = req.body;
      if (updateData.votes || updateData.voteCount) {
        return res
          .status(422)
          .json({ message: "can't update vote count or votes" });
      }
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        candidateId,
        updateData,
        { new: true } // This option returns the updated document
      );
      if (!updatedCandidate)
        return res.status(404).json({ error: "Candidate not found" });
      console.log("✅ Updated candidate data");
      res.status(200).json(updatedCandidate);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteCandidate: async (req, res) => {
    try {
      // Check admin authorization
      if (!(await isAdmin(req.userPayload.id))) {
        return res
          .status(403)
          .json({ message: "Access denied: only admin can access" });
      }
      // Delete Candidate
      const candidateId = req.params.candidateId;

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(candidateId)) {
        console.log("Invalid candidate ID:", candidateId);
        return res.status(400).send({ error: "Invalid candidate ID" });
      }
      const deleteCandidate = await Candidate.findByIdAndDelete(candidateId);
      if (!deleteCandidate)
        return res.status(404).json({ error: "Candidate not found" });
      console.log("✅ Deleted candidate data");
      res.status(200).json(deleteCandidate);
    } catch (err) {
      console.log("⛔️ Internal Server Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
};

module.exports = candidateController;
