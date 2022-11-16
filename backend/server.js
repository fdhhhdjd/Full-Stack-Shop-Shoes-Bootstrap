const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cluster = require("cluster");
const os = require("os");
const app = require("./app.js");
dotenv.config({ path: __dirname + "../.env" });
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../.env" });
}
const numCpu = os.cpus().length;

app.get("/api/", (req, res) => {
  const health_check = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(health_check);
});

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("online", function (worker) {
    console.log("Worker " + worker.process.pid + " is online");
  });

  cluster.on("exit", function (worker, code, signal) {
    console.log(
      "Worker " +
        worker.process.pid +
        " died with code: " +
        code +
        ", and signal: " +
        signal
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () =>
    console.log(`server is listening on port:http://localhost:${PORT}`)
  );
  process.on("SIGTERM", () => {
    process.exit(0);
  });
  process.on("SIGINT", () => {
    server.close(() => {
      mongoose.connection.close();
      process.exit(0);
    });
  });
}
