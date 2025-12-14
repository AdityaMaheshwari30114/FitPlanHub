const Follow = require("../models/follow");
const User = require("../models/user");

const handlefollowtrainer = async (req, res) => {
    try {
        const trainerId = req.params.trainerId;
        const userId = req.user.id;

        const trainer = await User.findById(trainerId);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(404).json({ message: "Trainer not found" });
        }

        const alreadyFollowing = await Follow.findOne({ userId, trainerId });
        if (alreadyFollowing) {
            return res.status(409).json({ message: "Already following trainer" });
        }

        const follow = new Follow({ userId, trainerId });
        await follow.save();

        res.status(201).json({ message: "Trainer followed" });
    } catch (err) {
        res.status(500).json({ message: "Follow failed" });
    }
};

const handleunfollowtrainer = async (req, res) => {
    try {
        await Follow.findOneAndDelete({
            userId: req.user.id,
            trainerId: req.params.trainerId
        });

        res.json({ message: "Trainer unfollowed" });
    } catch (err) {
        res.status(500).json({ message: "Unfollow failed" });
    }
};

module.exports = { handlefollowtrainer, handleunfollowtrainer };
