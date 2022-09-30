"use strict";

const REDIS = require("../db/redis_db");
/**
 * @author Nguyen Tiến Tài
 *
 * @param {number} number
 *
 * @returns {string} return "Ok"
 */
const incr = (key) => {
  return REDIS.incr(key, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 * @param {*} key
 *
 * @returns {json} "
 */
const ttl = (key) => {
  return REDIS.ttl(key, (err, ttl) => {
    if (err) {
      err;
    }
    ttl;
  });
};

/**
 * @param {*} key
 *
 * @returns {json} "
 */
const get = (key) => {
  return REDIS.get(key, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 * @param {*,*}
 *
 * @returns {json} "
 */
const set = (key, value, time) => {
  return REDIS.set(key, value, "EX", time, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 * @param {*,*} key
 *
 * @returns {number}
 */
const expire = (key, ttl) => {
  return REDIS.expire(key, ttl, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 * @param {*} key
 *
 * @returns {string} return "Ok"
 */
const del = (key) => {
  return REDIS.del(key, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 * @param {*,number}
 *
 * @returns {string} return "Ok"
 */
const setnx = (key, count) => {
  return REDIS.setnx(key, count, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 *
 * @param {*,number} number
 *
 * @returns {string} return "Ok"
 */
const decrby = (key, count) => {
  return REDIS.decrby(key, count, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 *
 * @param {*} number
 *
 * @returns {string} return "Ok"
 */
const incrby = (key, count) => {
  return REDIS.incrby(key, count, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

/**
 *
 * @param {*} number
 *
 * @returns {string} return "Ok"
 */
const exists = (key) => {
  return REDIS.exists(key, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};
/**
 * Order Not buy auto delete
 * @param {*,number}
 *
 * @returns {string} return "Ok"
 */
//?Delete Event order
const addDelayEventOrder = ({ orderId, delay }) => {
  return REDIS.set(
    orderId,
    "notify-keyspace-events",
    "EX",
    delay,
    (err, result) => {
      if (err) {
        err;
      }
      result;
    }
  );
};
const saveTokenRedis = (orderId, value, delay) => {
  return REDIS.set(orderId, value, "EX", delay, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};
//? Redis Pub
const RedisPub = (name, value) => {
  return REDIS.publish(name, value, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};

module.exports = {
  incr,
  ttl,
  get,
  set,
  expire,
  addDelayEventOrder,
  del,
  setnx,
  decrby,
  exists,
  incrby,
  saveTokenRedis,
  RedisPub,
};
