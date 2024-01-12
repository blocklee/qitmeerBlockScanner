const puppeteer = require('puppeteer');

const url = 'https://www.meerscan.io/tx?p=5';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // 获取动态生成的HTML内容
    const dynamicHTML = await page.content();
    console.log('Dynamic HTML:', dynamicHTML);

    // 在这里使用Cheerio加载动态生成的HTML并提取数据
    const $ = cheerio.load(dynamicHTML);

    const blockOrder = $('.table .rowStartCenter .th:first-child').text().trim();
    const txid = $('.table .rowStartCenter .th:nth-child(2)').text().trim();
    const vinAmount = $('.table .rowStartCenter .th:nth-child(3)').text().trim();

    console.log('Block Order:', blockOrder);
    console.log('Txid:', txid);
    console.log('Vin Amount:', vinAmount);

    await browser.close();
})();




// const axios = require('axios');
// const cheerio = require('cheerio');
//
// const url = 'https://www.meerscan.io/tx?p=5';
//
// axios.get(url)
//     .then(response => {
//         const $ = cheerio.load(response.data);
//
//         // 输出整个HTML以便调试
//         console.log('HTML:', $.html());
//
//         // 使用选择器获取表头数据
//         const blockOrder = $('.table .rowStartCenter .th:first-child').text().trim();
//         const txid = $('.table .rowStartCenter .th:nth-child(2)').text().trim();
//         const vinAmount = $('.table .rowStartCenter .th:nth-child(3)').text().trim();
//
//         console.log('Block Order:', blockOrder);
//         console.log('Txid:', txid);
//         console.log('Vin Amount:', vinAmount);
//
//         // 使用选择器获取表格数据
//         $('.table .tbody .tr').each((index, element) => {
//             // 提取每一行中的数据
//             const rowData = {
//                 blockOrder: $(element).find('.td:first-child').text().trim(),
//                 txid: $(element).find('.td:nth-child(2)').text().trim(),
//                 vinAmount: $(element).find('.td:nth-child(3)').text().trim(),
//             };
//
//             // 在这里可以将提取到的数据打印或存储到其他地方
//             console.log('Row Data:', rowData);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
//
