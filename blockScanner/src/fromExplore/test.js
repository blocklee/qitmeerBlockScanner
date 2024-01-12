const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.meerscan.io/tx?p=5';

axios.get(url)
    .then(response => {
        const htmlContent = response.data;
        console.log('HTML Content:', htmlContent); // 打印HTML内容

        const $ = cheerio.load(htmlContent);

        // ... 其他代码
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
