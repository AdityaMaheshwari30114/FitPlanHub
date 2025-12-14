const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FitnessPlan",
            required: true
        },

        subscribedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
