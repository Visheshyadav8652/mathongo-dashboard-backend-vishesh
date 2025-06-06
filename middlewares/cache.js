const redisClient = require('../utils/redisClient');

// Cache middleware for GET /api/v1/chapters
module.exports = async (req, res, next) => {
  const key = `chapters:${JSON.stringify(req.query)}`;
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      console.log('Serving chapters from Redis cache for key:', key);
      return res.json(JSON.parse(cached));
    }
    // Monkey-patch res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      console.log('Caching chapters in Redis for key:', key);
      redisClient.setEx(key, 3600, JSON.stringify(data)); // 1 hour
      originalJson(data);
    };
    next();
  } catch (err) {
    next();
  }
};
