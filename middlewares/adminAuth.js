// Middleware to check for admin token in headers
module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
