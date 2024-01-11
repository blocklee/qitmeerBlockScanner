// src/models/blockResult.js
const mongoose = require('../../db');

const blockResultSchema = new mongoose.Schema({
    hash: String,
    txsvalid: Boolean,
    confirmations: Number,
    version: Number,
    weight: Number,
    height: Number,
    txRoot: String,
    order: Number,
    transactions: [String],
    stateRoot: String,
    bits: String,
    difficulty: Number,
    pow: {
        pow_name: String,
        pow_type: Number,
        nonce: Number,
    },
    timestamp: String,
    parentroot: String,
    parents: [String],
    children: [String],
});

const BlockResult = mongoose.model('BlockResult', blockResultSchema);

module.exports = BlockResult;
