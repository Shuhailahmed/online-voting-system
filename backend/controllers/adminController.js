import Election from "../models/Election.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const [totalElections, activeElections, completedElections, voterCount] =
      await Promise.all([
        Election.countDocuments(),
        Election.countDocuments({ status: "active" }),
        Election.countDocuments({ status: "completed" }),
        User.countDocuments({ role: "voter" }), // <-- count voters only
      ]);

    res.json({
      totalElections,
      activeElections,
      completedElections,
      voterCount,
    });
  } catch (err) {
    next(err);
  }
};
