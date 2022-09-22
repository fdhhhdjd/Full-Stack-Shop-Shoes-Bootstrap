const dotenv = require("dotenv");
const app = require("./app.js");
dotenv.config({ path: __dirname + "../.env" });
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../.env" });
}
app.get("/api/", (req, res) => {
  const health_check = {
    uptime: process.uptime(),
    message: "Tài Đẹp trai ",
    timestamp: Date.now(),
  };
  return res.send(health_check);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is listening on port:http://localhost:${PORT}`)
);
