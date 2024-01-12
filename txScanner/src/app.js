const axios = require('axios');
const fs = require('fs');
const https = require('https');

// 设置RPC用户名和密码
const rpcUser = 'qitmeer';
const rpcPass = 'qitmeer123';

// 构建请求头
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${rpcUser}:${rpcPass}`).toString('base64')
};

// Additional option to accept self-signed certificates
const axiosOptions = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
};

// 生成 CSV 文件头部
let csvContent = 'order,txsvalid,transactionHash,transactionType,timestamp\n';

// 定义获取区块数据的函数
async function getBlockData(blockID) {
    const requestData = {
        method: 'getBlockByID',
        params: [blockID, true, true, true],
        jsonrpc: '2.0',
        id: 1
    };

    try {
        const response = await axios.post('https://127.0.0.1:18131', requestData, { headers, ...axiosOptions });
        const blockData = response.data.result;

        const { order, txsvalid, transactions, timestamp } = blockData;

        transactions.forEach(transaction => {
            const { txhash, type } = transaction;

            // 过滤掉 TxTypeCoinbase 类型的交易
            if (type !== 'TxTypeCoinbase') {
                const row = `${order},${txsvalid},"${txhash}","${type}","${timestamp}"\n`;
                // 追加到 CSV 文件
                fs.appendFile('block_data_all.csv', row, (err) => {
                    if (err) {
                        console.error(`保存 CSV 文件失败 (${blockID}):`, err);
                    }
                });
            }
        });
    } catch (error) {
        console.error(`请求失败 (${blockID}):`, error.message);
    }
}

// 定义获取区块数据的起始和结束块号
const startBlockID = 1459477;
const endBlockID = 2636288;

// 循环获取区块数据
async function start() {
    for (let blockID = startBlockID; blockID <= endBlockID; blockID++) {
        await getBlockData(blockID);
    }
}

// 启动程序
start().then(() => {
    console.log('数据获取完成');
});
