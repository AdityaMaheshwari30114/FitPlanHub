const Subscription = require("../models/subscription");
const FitnessPlan = require("../models/fitnessplan");

const handlesubscribe = async (req, res) => {
    try {
        const planId = req.params.planId;
        const userId = req.user.id;

        // to prevent trainer from subscribing
        if (req.user.role === "trainer") {
            return res.status(403).json({ message: "Trainers cannot subscribe to plans" });
        }

        const plan = await FitnessPlan.findById(planId);
        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        const existing = await Subscription.findOne({ userId, planId });
        if (existing) {
            return res.status(409).json({ message: "Already subscribed" });
        }

        const subscription = new Subscription({
            userId,
            planId
        });

        await subscription.save();

        res.status(201).json({
            message: "Subscription successful"
        });
    } catch (err) {
        res.status(500).json({ message: "Subscription failed" });
    }
};

module.exports = { handlesubscribe };
