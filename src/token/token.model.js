'use strict';

const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, unique: true },
  username: { type: String, unique: true },
  timestamp: { type: String, unique: true },
  isRevoked: Boolean
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
