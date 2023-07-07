const express = require("express");
const app = express();
const winston = require("winston");
const expressWinston = require("express-winston");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, meta }) => {
      const { req, res } = meta;
      const { method } = req;
      const url = req.originalUrl || req.url;
      const statusCode = res.statusCode;
      const responseTime = res.responseTime || 0;
      const ip = req.ip || "";
      const requestData = req.body;
      const host = req.headers.host || "";
      return `[${timestamp}] ${level}: ${message} - ${method} ${host}${url} ${statusCode} ${responseTime}ms - IP: ${ip} - Data: ${JSON.stringify(
        requestData
      )}`;
    })
  ),
});

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Include request and response metadata in logs
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // Log message format
  })
);

app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(5000, () => {
  console.log("Server 1 is running on port 5000");
});
