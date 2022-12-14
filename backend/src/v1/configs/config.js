module.exports = {
  /**
   * * Environment Settings
   */
  NODE_ENV: process.env.NODE_ENV,
  PORT_FRONTEND_ENV: process.env.FRONTEND_URL,
  /**
   * * SMTP Settings
   */
  SMTP_HOST: process.env.SMPT_HOST,
  SMTP_PORT: process.env.SMPT_PORT,
  SMTP_SERVICE: process.env.SMPT_SERVICE,
  SMTP_MAIL: process.env.SMPT_MAIL,
  SMTP_PASSWORD: process.env.SMPT_PASSWORD,

  /**
   * * JWT Settings
   */
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_KEY: process.env.JWT_KEY,

  /**
   * * DATABASE Settings
   */
  MONGO_DB: process.env.MONGODB_URL,

  /**
   * * Redis caching Settings
   */
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  /**
   * * rabbit_mq caching Settings
   */
  RABBIT_MQ: process.env.RABBIT_MQ,

  /**
   * * Cloudinary settings
   */
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,

  /**
   * * Key token Settings
   */
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

  /**
   * * Recaptcha Settings
   */
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,

  /**
   * * Stripe Settings
   */
  STRIPE_KEY: process.env.STRIPE_KEY,
  STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,

  /**
   * * Stripe Settings
   */
  GOOGLE_CLIENT_IDS: process.env.GOOGLE_CLIENT_IDS,

  /**
    * * Setup rate limit
  */
  IPA_API_RATE_LIMIT_DURATION: process.env.IPA_API_RATE_LIMIT_DURATION,
  IPA_API_RATE_LIMIT: process.env.IPA_API_RATE_LIMIT,

  /**
    * * Algolia setting
  */
  APP_ID_ALGOLIA: process.env.APP_ID_ALGOLIA,
  ADMIN_KEY_ALGOLIA: process.env.ADMIN_KEY_ALGOLIA,
  USER_KEY_ALGOLIA: process.env.USER_KEY_ALGOLIA
};
