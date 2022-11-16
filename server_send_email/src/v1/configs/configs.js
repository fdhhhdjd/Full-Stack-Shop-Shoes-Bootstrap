module.exports = {
  /**
   * * Environment Settings
   */
  NODE_ENV: process.env.NODE_ENV,
  /**
   * * SMTP Settings
   */
  SMTP_HOST: process.env.SMPT_HOST,
  SMTP_PORT: process.env.SMPT_PORT,
  SMTP_SERVICE: process.env.SMPT_SERVICE,
  SMTP_MAIL: process.env.SMPT_MAIL,
  SMTP_PASSWORD: process.env.SMPT_PASSWORD,
  /**
   * * Redis caching Settings
   */
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_USER: process.env.REDIS_USER,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};
