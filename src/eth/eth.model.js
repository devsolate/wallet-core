'use strict';

const mongoose = require('mongoose');

const ethSchema = new mongoose.Schema({
    privateKeyPath: { type: String, unique: true },
    publicKey: { type: String, unique: true },
    addresses: Array,
    name: String,
    userId: String
}, { timestamps: true });

const ETH = mongoose.model('ETH', ethSchema);

module.exports = ETH;
