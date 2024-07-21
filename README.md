# Logiclynxz Backend

## Description
Backend Server of Logiclynxz Dashboard

## Prerequisites
- Node.js (https://nodejs.org/)
- npm (comes with Node.js)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Logiclynxz/logiclynxz-dashboard-backend.git
cd logiclynxz-dashboard-backend
```
### 2. Clone the repository
a. Initialize npm
If you haven't already initialized npm in your project, run the following command:
```bash
npm init -y
```
b. Install Express
Express is a fast, unopinionated, minimalist web framework for Node.js.
```bash
npm install express
```
c. Install Mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
```bash
npm install mongoose
```
d. Install Nodemon
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.
```bash
npm install --save-dev nodemon
```
e. Install Dotenv
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
```bash
npm install dotenv
```

### 3. Setting up Nodemon
To use Nodemon, update the scripts section in your package.json file:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
Now, you can start your server in development mode using:
```bash
npm run dev
```
### 4. Setting up environment variables
Create a .env file in the root of your project and add your environment variables:
```env
MONGO_URI=mongodb+srv://<username>:<password>@marnapp.ppitasf.mongodb.net/logiclynxz-dashboard?retryWrites=true&w=majority&appName=marnapp
PORT=5000
```

### 5. Create the main server file
Create an index.js file in the root of your project with the following content:
```javascript
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

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

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


```
### 6. Run the application
Run the application in development mode:
```bash
npm run dev
```
