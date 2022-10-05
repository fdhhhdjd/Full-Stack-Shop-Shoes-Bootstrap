//! Library
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const bodyParser = require("body-parser");
const compression = require("compression");
const cron = require("node-cron");
//! Import
const REDIS = require("./src/v1/db/redis_db");
const Mongo_DB = require("./src/v1/db/mongo_db");
const connect_amqp = require("./src/v1/db/rabbitmq");
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

//* ------------------------- Users ------------------------- //

// !! USER_ROUTES
const users_routes = require("./src/v1/user_api/routes/user.routes");

app.use("/api", users_routes);

//* ------------------------- Products ------------------------- //

// !! PRODUCT_ROUTES
const products_routes = require("./src/v1/user_api/routes/product.routes");

app.use("/api", products_routes);

//* ------------------------- Category ------------------------- //

// !! CATEGORY_ROUTES
const category_routes = require("./src/v1/user_api/routes/categories.routes");

app.use("/api", category_routes);

// !! REVIEW_ROUTES
const user_review = require("./src/v1/user_api/routes/review.routes");

app.use("/api", user_review);

// !! FEEDBACK_ROUTES
const user_feedback = require("./src/v1/user_api/routes/feedback.routes");

app.use("/api", user_feedback);

// !! CAROUSEL_ROUTES
const user_carousel = require("./src/v1/user_api/routes/carousel.routes");

app.use("/api", user_carousel);
// !! VOUCHER_ROUTES
const voucher_carousel = require("./src/v1/user_api/routes/voucher.routes");

app.use("/api", voucher_carousel);

// !! PAYMENT_ROUTES
const payment_carousel = require("./src/v1/user_api/routes/payment.routes");

app.use("/api", payment_carousel);

//* ------------------------- Admins ------------------------- //
//!! ADMIN_ROUTE
const admins_routes = require("./src/v1/admin_api/routes/admin.routes");

//!Route Admin
app.use("/api", admins_routes);

//!Product Admin
const product_routes = require("./src/v1/admin_api/routes/product_admin.route");
app.use("/api", product_routes);

// !! CATEGORY_ROUTES
const category_routes_admin = require("./src/v1/admin_api/routes/categories.routes");

app.use("/api", category_routes_admin);

// !!  FEEDBACK_ROUTES
const feedback_routes_admin = require("./src/v1/admin_api/routes/feedback.route");

app.use("/api", feedback_routes_admin);

// !!  FEEDBACK_ROUTES
const carousel_routes_admin = require("./src/v1/admin_api/routes/carousel.routes");

app.use("/api", carousel_routes_admin);

// !!  VOUCHER_ROUTES
const voucher_routes_admin = require("./src/v1/admin_api/routes/voucher.routes");

app.use("/api", voucher_routes_admin);

module.exports = app;
