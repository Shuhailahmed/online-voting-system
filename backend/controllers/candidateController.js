import Candidate from "../models/Candidate.js";

export const addCandidate = async (req, res, next) => {
  try {
    const { name, party, manifesto } = req.body;
    const { electionId } = req.params;

    const partyLogo = req.files?.partyLogo?.[0]?.path || "";
    const photo = req.files?.photo?.[0]?.path || "";

    const candidate = await Candidate.create({
      election: electionId,
      name,
      party,
      manifesto,
      partyLogo,
      photo,
    });

    res.status(201).json(candidate);
  } catch (err) {
    next(err);
  }
};

export const getCandidatesByElection = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const candidates = await Candidate.find({ election: electionId });
    res.json(candidates);
  } catch (err) {
    next(err);
  }
};

export const deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    await candidate.deleteOne();
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    next(err);
  }
};
