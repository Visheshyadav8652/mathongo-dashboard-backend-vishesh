const redisClient = require('../utils/redisClient');

module.exports = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rate_limit:${ip}`;
    const current = await redisClient.incr(key);

    if (current === 1) {
      // Set expiry for 1 minute
      await redisClient.expire(key, 60);
    }

    if (current > 30) {
      return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    next();
  } catch (err) {
    // If Redis fails, allow the request (fail open)
    next();
  }
};