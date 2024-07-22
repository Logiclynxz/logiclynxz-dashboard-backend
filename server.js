require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//express app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log("There is an error:", error);
  });
