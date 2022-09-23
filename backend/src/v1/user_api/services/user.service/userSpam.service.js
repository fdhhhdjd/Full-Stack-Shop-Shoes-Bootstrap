"use strict";
const { incr, ttl, expire } = require("../../../utils/limited_redis");
module.exports = {
  UserSpam: async (GetIPUser) => {
    try {
      const numRequests = await incr(GetIPUser);
      let _ttl;
      if (numRequests === 6) {
        await expire(GetIPUser, 60);
        _ttl = 60;
      } else {
        _ttl = await ttl(GetIPUser);
      }
      if (numRequests > 5) {
        return {
          status: 400,
          _ttl,
          msg: `You Block ${_ttl}s,Thank You`,
        };
      }
      return true;
    } catch (error) {
      return {
        status: 503,
      };
    }
  },
};
