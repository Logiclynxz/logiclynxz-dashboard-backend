require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

//express app
const app = express();

// middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const clientIp = req.ip.includes('::ffff:') ? req.ip.split('::ffff:')[1] : req.ip;
    console.log(`${clientIp} - ${req.method} ${req.path} ${res.statusCode} ${res.statusMessage} - ${duration} ms`);
  });
  next();
});

// routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

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
