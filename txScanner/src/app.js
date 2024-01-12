const axios = require('axios');
const fs = require('fs');

// 设置RPC用户名和密码
const rpcUser = 'qitmeer';
const rpcPass = 'qitmeer123';

// 构建请求头
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${rpcUser}:${rpcPass}`).toString('base64')
};

// 生成 CSV 文件头部
let csvContent = 'order,txsvalid,transactionHash,transactionType,timestamp\n';

// 定义获取区块数据的函数
async function getBlockData(blockID) {
    const requestData = {
        method: 'getBlockByID',
        params: [blockID, true, true, false],
        jsonrpc: '2.0',
        id: 1
    };

    try {
        const response = await axios.post('http://127.0.0.1:18131', requestData, { headers });
        const blockData = response.data.result;

        const { order, txsvalid, transactions, timestamp } = blockData;

        transactions.forEach(transaction => {
            const { hash, type } = transaction;

            // 过滤掉 TxTypeCoinbase 类型的交易
            if (type !== 'TxTypeCoinbase') {
                csvContent += `${order},${txsvalid},"${hash}","${type}","${timestamp}"\n`;
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
for (let blockID = startBlockID; blockID <= endBlockID; blockID++) {
    await getBlockData(blockID);
}

// 指定保存的文件路径
const filePath = 'block_data_all.csv';

// 写入 CSV 文件
fs.writeFile(filePath, csvContent, (err) => {
    if (err) {
        console.error('保存 CSV 文件失败:', err);
    } else {
        console.log('CSV 文件保存成功:', filePath);
    }
});
