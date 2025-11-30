import Vote from "../models/Vote.js";
import Candidate from "../models/Candidate.js";

// -------------------- CAST VOTE --------------------
export const castVote = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { candidateId } = req.body;
    const userId = req.user._id;

    const candidate = await Candidate.findOne({
      _id: candidateId,
      election: electionId,
    });

    if (!candidate) {
      return res
        .status(400)
        .json({ message: "Candidate not found in this election" });
    }

    const vote = await Vote.create({
      election: electionId,
      candidate: candidateId,
      user: userId,
    });

    return res.status(201).json({ message: "Vote cast successfully", vote });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already voted in this election" });
    }
    next(err);
  }
};

// -------------------- GET RESULTS --------------------
export const getResults = async (req, res, next) => {
  try {
    const { electionId } = req.params;

    // find all votes for this election
    const votes = await Vote.find({ election: electionId }).populate(
      "candidate"
    );

    const summary = {};

    votes.forEach((v) => {
      const id = v.candidate._id.toString();
      if (!summary[id]) {
        summary[id] = {
          candidateId: id,
          name: v.candidate.name,
          party: v.candidate.party,
          votes: 0,
        };
      }
      summary[id].votes += 1;
    });

    const totalVotes = votes.length;

    const resultArray = Object.values(summary).map((r) => ({
      ...r,
      percentage: totalVotes
        ? ((r.votes / totalVotes) * 100).toFixed(2)
        : "0.00",
    }));

    return res.json({ totalVotes, results: resultArray });
  } catch (err) {
    next(err);
  }
};
