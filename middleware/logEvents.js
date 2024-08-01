const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFile) => {
  const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const requestLog = (req, res, next) => {
  const start = Date.now();
  const duration = Date.now() - start;
  const clientIp = req.ip.includes("::ffff:")
    ? req.ip.split("::ffff:")[1]
    : req.ip;
  logEvents(
    `${req.method}\t${req.headers.origin}\t${clientIp} - ${req.url} ${res.statusCode} ${res.statusMessage} - ${duration} ms`,
    "reqLog.txt"
  );
  next();
};

module.exports = { logEvents, requestLog };
