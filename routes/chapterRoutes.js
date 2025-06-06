const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const adminAuth = require('../middlewares/adminAuth');
const multer = require('multer');
const upload = multer();
const cache = require('../middlewares/cache');

// GET all chapters (with filters, pagination, and cache)
router.get('/', cache, (req, res, next) => {
  console.log('GET /api/v1/chapters called');
  next();
}, chapterController.getAllChapters);

// GET a specific chapter by ID
router.get('/:id', chapterController.getChapterById);

// POST upload chapters (admin only, JSON file upload)
router.post('/', adminAuth, upload.single('file'), chapterController.uploadChapters);

module.exports = router;
