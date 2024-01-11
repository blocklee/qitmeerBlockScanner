// src/blockScanner.js
const axios = require('axios');
const BlockResult = require('./models/blockResult');
const Transaction = require('./models/transaction');

const apiUrl = 'http://localhost:3000/getBlock';

const fetchData = async (blockID) => {
    try {
        const response = await axios.post(apiUrl, { blockID });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data for block ${blockID}: ${error.message}`);
    }
};

const storeBlockData = async (blockData) => {
    try {
        const blockResult = new BlockResult(blockData);
        await blockResult.save();
        console.log(`Block ${blockData.id} data stored successfully.`);
    } catch (error) {
        console.error(`Error storing block data for block ${blockData.id}:`, error.message);
    }
};

const storeTransactions = async (blockData) => {
    const transactions = blockData.result.transactions;

    for (const transactionData of transactions) {
        try {
            const transaction = new Transaction(transactionData);
            await transaction.save();
            console.log(`Transaction ${transaction.txid} saved successfully.`);
        } catch (error) {
            console.error(`Error saving transaction ${transaction.txid}:`, error.message);
        }
    }
};

const scanBlocks = async (startBlock, endBlock) => {
    for (let blockID = startBlock; blockID <= endBlock; blockID++) {
        try {
            const blockData = await fetchData(blockID);
            await storeBlockData(blockData);
            await storeTransactions(blockData);
        } catch (error) {
            console.error(error.message);
        }
    }

    console.log('Scan complete.');
};

// 设置要扫描的块范围
const startBlock = 1;
const endBlock = 2000000;

// 执行扫描
scanBlocks(startBlock, endBlock);
