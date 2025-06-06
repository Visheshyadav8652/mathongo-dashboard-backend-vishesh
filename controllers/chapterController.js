const Chapter = require('../models/chapterModel');
const redisClient = require('../utils/redisClient');

// Get all chapters with filters and pagination
exports.getAllChapters = async (req, res) => {
  try {
    const { page = 1, limit = 10, class: classFilter, unit, status, weakChapters, subject } = req.query;
    const filter = {};
    if (classFilter) filter.class = classFilter;
    if (unit) filter.unit = unit;
    if (status) filter.status = status;
    if (weakChapters !== undefined) filter.weakChapters = weakChapters === 'true';
    if (subject) filter.subject = subject;

    const total = await Chapter.countDocuments(filter);
    const chapters = await Chapter.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, chapters });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a chapter by ID
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload chapters from JSON file (admin only)
exports.uploadChapters = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const chaptersData = JSON.parse(req.file.buffer.toString());
    if (!Array.isArray(chaptersData)) return res.status(400).json({ error: 'Invalid JSON format' });
    const failed = [];
    const inserted = [];
    for (const data of chaptersData) {
      try {
        const chapter = new Chapter(data);
        await chapter.save();
        inserted.push(chapter);
      } catch (err) {
        failed.push({ data, error: err.message });
      }
    }
    // Invalidate all chapters cache
    const keys = await redisClient.keys('chapters:*');
    if (keys.length) await redisClient.del(keys);
    res.json({ inserted: inserted.length, failed });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
