const Follow = require("../models/follow");
const FitnessPlan = require("../models/fitnessplan");
const Subscription = require("../models/subscription");

const handlegetfeed = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get followed trainers
        const follows = await Follow.find({ userId });
        const trainerIds = follows.map(f => f.trainerId);

        // 2. Get plans from followed trainers
        const plans = await FitnessPlan.find({
            trainerId: { $in: trainerIds }
        }).populate("trainerId", "name");

        // 3. Get subscribed plans
        const subscriptions = await Subscription.find({ userId });
        const subscribedPlanIds = subscriptions.map(s => s.planId.toString());

        // 4. Build feed response
        const feed = plans.map(plan => ({
            id: plan._id,
            title: plan.title,
            price: plan.price,
            trainer: plan.trainerId.name,
            purchased: subscribedPlanIds.includes(plan._id.toString())
        }));

        res.json(feed);
    } catch (err) {
        res.status(500).json({ message: "Failed to load feed" });
    }
};

module.exports = { handlegetfeed };
