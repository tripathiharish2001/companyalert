require("dotenv").config();
const express = require("express");
const tasksRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// app.use("cors");
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Hey" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    let port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

    console.log("Successfully connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });
