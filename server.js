require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const { requestLog } = require("./middleware/logEvents");

//express app
const app = express();

// middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// Logger middleware
app.use(requestLog);

// routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
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
