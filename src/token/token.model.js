'use strict';

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, unique: true },
  username: { type: String },
  timestamp: { type: String },
  isRevoked: Boolean
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
