const mongoose = require('mongoose');

const BoardSchema = require('../schemas/board');

module.exports = Board = mongoose.model('board', BoardSchema);
