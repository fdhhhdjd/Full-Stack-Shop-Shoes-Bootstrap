//! Library
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const Redis = require("ioredis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const bodyParser = require("body-parser");
const compression = require("compression");
const cron = require("node-cron");
//! Import
const REDIS = require("./src/v1/db/redis_db");
const Mongo_DB = require("./src/v1/db/mongo_db");
const CONSTANTS = require("./src/v1/configs/constants");
//! Connect
Mongo_DB();

//! used library
const app = express();
if (process.env.NODE_ENV === "PRODUCTION") {
  app.enable("trust proxy");
}
app.enable("trust proxy");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
app.use(
  session({
    store: new RedisStore({ client: REDIS }),
    secret: CONSTANTS.KEY_SESSION,
    resave: process.env.NODE_ENV === "PRODUCTION" ? true : false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
      httpOnly: true,
      maxAge: CONSTANTS._5_MINUTES,
    },
  })
);
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
// ------------------------- Users ------------------------- //

// //!! USER_ROUTE
const users_routes = require("./src/v1/user_api/routes/user.routes");

// //!Route USer
app.use("/api", users_routes);

// // ------------------------- Admins ------------------------- //
// //!! ADMIN_ROUTE
// const admins_routes = require("./src/v1/admin_api/routes/admin.routes");

// //!Route Admin
// app.use("/api", admins_routes);

module.exports = app;
