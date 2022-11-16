const rateLimit = require('express-rate-limit')
const CONFIG = require('../configs/config')

module.exports = rateLimit(
    {
        windowMs: CONFIG.IPA_API_RATE_LIMIT_DURATION * 1000, //in milliseconds
        max: CONFIG.IPA_API_RATE_LIMIT,
        message: {
            status: 503,
            success: false,
            element: {
                msg: 'You sent too many requests. Please wait a while then try again',
            },
        },
        standardHeaders: true,
    })