// src/models/transaction.js
const mongoose = require('../../db');

const transactionSchema = new mongoose.Schema({
    hex: String,
    txid: String,
    txhash: String,
    size: Number,
    version: Number,
    locktime: Number,
    timestamp: String,
    expire: Number,
    vin: { type: mongoose.Schema.Types.Mixed },
    vout: { type: mongoose.Schema.Types.Mixed },
    blockhash: String,
    confirmations: Number,
    txsvalid: Boolean,
    type: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;


// // src/models/transaction.js
// const mongoose = require('../db');
//
// const transactionSchema = new mongoose.Schema({
//     hex: String,
//     txid: String,
//     txhash: String,
//     size: Number,
//     version: Number,
//     locktime: Number,
//     timestamp: String,
//     expire: Number,
//     vin: [{
//         txid: String,
//         vout: Number,
//         sequence: Number,
//         scriptSig: {
//             asm: String,
//             hex: String,
//         },
//     }],
//     vout: [{
//         coin: String,
//         coinid: Number,
//         amount: Number,
//         scriptPubKey: {
//             asm: String,
//             hex: String,
//             reqSigs: Number,
//             type: String,
//             addresses: [String],
//         },
//         to: String,
//     }],
//     blockhash: String,
//     confirmations: Number,
//     txsvalid: Boolean,
//     type: String,
// });
//
// const Transaction = mongoose.model('Transaction', transactionSchema);
//
// module.exports = Transaction;
