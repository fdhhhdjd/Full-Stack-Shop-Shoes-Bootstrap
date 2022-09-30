const IOREDIS = require("ioredis");
const CONFIGS = require("../configs/configs");
// const REDIS = new IOREDIS({
//   port: CONFIGS.REDIS_PORT,
//   host: CONFIGS.REDIS_HOST,
// });
const REDIS = new IOREDIS({
  port: CONFIGS.REDIS_PORT,
  host: CONFIGS.REDIS_HOST,
  user: CONFIGS.REDIS_USER,
  password: CONFIGS.REDIS_PASSWORD,
});

REDIS.on("connect", () => {
  // console.log("----------", CONFIGS);
  console.log("Client connected to redis Push...");
});
REDIS.on("ready", () => {
  console.log("Client connected to redis push and ready to use...");
});
REDIS.on("error", (error) => {
  console.log("fail");
});
REDIS.on("end", () => {
  console.log("Client disconnected from redis push");
});
REDIS.on("SIGINT", () => {
  REDIS.quit();
});

module.exports = REDIS;
