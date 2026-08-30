require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./backend/models/User");
const Job = require("./backend/models/Job");
const auth = require("./backend/middleware/auth");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.send("User registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// -------------------------
// USER LIST (for view-jobs dropdown)
// -------------------------

app.get("/api/users", auth, async (req, res) => {
  try {
    const users = await User.find()
      .select("username -_id")
      .sort({ username: 1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------
// JOB ROUTES
// -------------------------

// Get logged-in user's own jobs (for index.html)
app.get("/api/jobs", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ username: req.user.username }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get jobs for a specific user (for view-jobs.html dropdown)
app.get("/api/jobs/user/:username", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ username: req.params.username }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one job
app.get("/api/jobs/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create job
app.post("/api/jobs", auth, async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      description: req.body.description,
      username: req.user.username,
      dateAdded: Date.now(),
    });

    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job (only the owner can update)
app.put("/api/jobs/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    if (job.username !== req.user.username) {
      return res.status(403).json({
        message: "You are not allowed to edit this job.",
      });
    }

    job.title = req.body.title;
    job.description = req.body.description;

    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job (only the owner can delete)
app.delete("/api/jobs/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    if (job.username !== req.user.username) {
      return res.status(403).json({
        message: "You are not allowed to delete this job.",
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server locally
if (require.main === module) {
  app.listen(3000, function () {
    console.log("Server running on http://localhost:3000");
  });
}

module.exports = app;
