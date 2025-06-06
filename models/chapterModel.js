const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  unit: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  weakChapters: { type: Boolean, default: false },
  subject: { type: String, required: true },
  // Add any other fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Chapter', chapterSchema);
