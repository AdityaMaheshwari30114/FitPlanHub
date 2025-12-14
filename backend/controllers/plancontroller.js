const FitnessPlan = require("../models/fitnessplan");
const Subscription = require("../models/subscription");

const handlecreateplan = async (req, res) => {
    try {
        const { title, description, price, duration } = req.body;

        if (!title || !description || !price || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (price <= 0) {
            return res.status(400).json({ message: "Price must be positive" });
        }

        const newPlan = new FitnessPlan({
            title,
            description,
            price,
            duration,
            trainerId: req.user.id
        });

        await newPlan.save();

        res.status(201).json({
            message: "Fitness plan created",
            plan: newPlan
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to create plan" });
    }
};

const handleupdateplan = async (req, res) => {
    try {
        const plan = await FitnessPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        // ownership check - Important - prevent trainer editing another trainer’s plan
        if (plan.trainerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        Object.assign(plan, req.body);
        await plan.save();

        res.json({
            message: "Plan updated",
            plan
        });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

const handledeleteplan = async (req, res) => {
    try {
        const plan = await FitnessPlan.findById(req.params.id);

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        // ownership check
        if (plan.trainerId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await plan.deleteOne();

        res.json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};

const handlegetplans = async (req, res) => {
    try {
        const plans = await FitnessPlan.find()
            .populate("trainerId", "name");

        const preview = plans.map(plan => ({
            id: plan._id,
            title: plan.title,
            price: plan.price,
            trainer: plan.trainerId.name
        }));

        res.json(preview);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch plans" });
    }
};

const handlegetplandetails = async (req, res) => {
    try {
        const plan = await FitnessPlan.findById(req.params.id)
            .populate("trainerId", "name");

        if (!plan) {
            return res.status(404).json({ message: "Plan not found" });
        }

        let isSubscribed = false;

        if (req.user) {
            const subscription = await Subscription.findOne({
                userId: req.user.id,
                planId: plan._id
            });

            if (subscription) {
                isSubscribed = true;
            }
        }
        // title, price and trainer name-> non-subscribed users
        if (!isSubscribed) {
            return res.json({
                id: plan._id,
                title: plan.title,
                price: plan.price,
                trainer: plan.trainerId.name
            });
        }

        res.json({
            id: plan._id,
            title: plan.title,
            description: plan.description,
            duration: plan.duration,
            price: plan.price,
            trainer: plan.trainerId.name
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch plan" });
    }
};


module.exports = {
    handlecreateplan,
    handleupdateplan,
    handledeleteplan,
    handlegetplans,
    handlegetplandetails
};
