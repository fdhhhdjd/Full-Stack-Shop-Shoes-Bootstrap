module.exports = {
  /**
   * * SMTP Settings
   */
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_SERVICE: process.env.SMPT_SERVICE,
  SMTP_MAIL: process.env.SMPT_MAIL,
  SMTP_PASSWORD: process.env.SMPT_PASSWORD,

  /**
   * * JWT Settings
   */
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,

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
};
