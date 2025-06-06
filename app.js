// Main Express app setup
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chapterRoutes = require('./routes/chapterRoutes');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/v1/chapters', chapterRoutes);

module.exports = app;
