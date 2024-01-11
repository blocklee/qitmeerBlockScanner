const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/getBlock', async (req, res) => {
    try {
        const { blockID } = req.body;
        const url = 'https://127.0.0.1:18131';

        const data = {
            method: 'getBlockByID',
            params: [blockID, true, true, true],
            jsonrpc: '2.0',
            id: 1
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            auth: {
                username: 'qitmeer',
                password: 'qitmeer123'
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        };

        const response = await axios.post(url, data, config);
        res.json(response.data.result); // 只返回 result 字段
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
