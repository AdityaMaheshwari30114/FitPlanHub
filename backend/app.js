const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authroutes");
const trainerRoutes = require("./routes/trainerroutes");
const planRoutes = require("./routes/planroutes");
const subscriptionRoutes = require("./routes/subscriptionroutes");
const followRoutes = require("./routes/followroutes");
const feedRoutes = require("./routes/feedroutes");

// basic middlewares
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/trainer", trainerRoutes);
app.use("/plans", planRoutes);
app.use("/subscribe", subscriptionRoutes);
app.use("/follow", followRoutes);
app.use("/feed", feedRoutes);

// test route
app.get("/", (req, res) => {
    res.send("FitPlanHub backend is live");
});

module.exports = app;
