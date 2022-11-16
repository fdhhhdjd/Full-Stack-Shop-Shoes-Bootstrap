"use strict";

const REDIS = require("../db/redis_db");
const CONSTANTS = require("../configs/constants");
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
//? Redis Add
const hmset = (user_id, product_id, quantity) => {
  return REDIS.hmset(
    `cartUserId:${user_id}`,
    product_id,
    quantity,
    (err, result) => {
      if (err) {
        err;
      }
      ExpireCart(user_id);
      result;
    }
  );
};
//? Get All user add
const hgetall = (user_id) => {
  return REDIS.hgetall(`cartUserId:${user_id}`, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });
};
//? increase and decrease quantity
const hincrby = (user_id, product_id, quantity) => {
  return REDIS.hincrby(
    `cartUserId:${user_id}`,
    product_id,
    quantity,
    (err, result) => {
      if (err) {
        err;
      }
      result;
    }
  );
};
//? length  cart
const hlen = (user_id) => {
  return REDIS.hlen(`cartUserId:${user_id}`, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};
//? Dele cart
const delCart = (user_id, product_id) => {
  return REDIS.hdel(`cartUserId:${user_id}`, product_id, (err, result) => {
    if (err) {
      err;
    }
    result;
  });
};
//? sum quantity user
const sumQuantity = ({ user_id }) => {
  return REDIS.eval(
    `local sum = 0 local i=1 local a1 = redis.call('hvals','cartUserId:${user_id}') while(a1[i]) do sum=sum+a1[i] i=i+1 end return sum`,
    0
  );
};
//? Expire
const ExpireCart = (user_id) => {
  return REDIS.expire(
    `cartUserId:${user_id}`,
    CONSTANTS._1_HOURS_REDIS,
    (err, result) => {
      if (err) {
        err;
      }
      result;
    }
  );
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
  hmset,
  hgetall,
  hincrby,
  sumQuantity,
  hlen,
  delCart,
  ExpireCart,
};
