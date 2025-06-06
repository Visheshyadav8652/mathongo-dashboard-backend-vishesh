// Server entry point
const app = require('./app');
const mongoose = require('mongoose');
const { createClient } = require('redis');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_URL = process.env.REDIS_URL;

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Redis connection
const redisClient = createClient({ url: REDIS_URL });
redisClient.connect().then(() => console.log('Redis connected')).catch(console.error);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
