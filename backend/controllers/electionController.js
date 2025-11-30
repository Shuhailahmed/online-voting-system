import Election from "../models/Election.js";
import Vote from "../models/Vote.js";

export const createElection = async (req, res, next) => {
  try {
    const { title, description, status, startAt, endAt } = req.body;
    const election = await Election.create({
      title,
      description,
      status,
      startAt,
      endAt,
    });
    res.status(201).json(election);
  } catch (err) {
    next(err);
  }
};

export const updateElection = async (req, res, next) => {
  try {
    const election = await Election.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    res.json(election);
  } catch (err) {
    next(err);
  }
};

export const deleteElection = async (req, res, next) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election)
      return res.status(404).json({ message: "Election not found" });

    // Optional: prevent deleting completed elections with votes
    const voteCount = await Vote.countDocuments({ election: election._id });
    if (voteCount > 0 && election.status === "completed") {
      return res
        .status(400)
        .json({ message: "Cannot delete completed election with votes" });
    }

    await election.deleteOne();
    res.json({ message: "Election deleted" });
  } catch (err) {
    next(err);
  }
};

export const getAllElections = async (req, res, next) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 });
    res.json(elections);
  } catch (err) {
    next(err);
  }
};

export const getElectionById = async (req, res, next) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election)
      return res.status(404).json({ message: "Election not found" });
    res.json(election);
  } catch (err) {
    next(err);
  }
};

export const getActiveElections = async (req, res, next) => {
  try {
    const now = new Date();
    const elections = await Election.find({
      status: "active",
      startAt: { $lte: now },
      endAt: { $gte: now },
    }).sort({ startAt: 1 });
    res.json(elections);
  } catch (err) {
    next(err);
  }
};

export const getUpcomingElections = async (req, res, next) => {
  try {
    const now = new Date();
    const elections = await Election.find({
      startAt: { $gt: now },
    }).sort({ startAt: 1 });
    res.json(elections);
  } catch (err) {
    next(err);
  }
};

export const getCompletedElections = async (req, res, next) => {
  try {
    const now = new Date();
    const elections = await Election.find({
      endAt: { $lt: now },
    }).sort({ endAt: -1 });
    res.json(elections);
  } catch (err) {
    next(err);
  }
};
