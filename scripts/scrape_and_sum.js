const { chromium } = require('playwright');

const seeds = [86,87,88,89,90,91,92,93,94,95];
const baseUrl = "https://sanand0.github.io/tdsdata/js_table/?seed=";

(async () => {
    let grandTotal = 0;
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const seed of seeds) {
        const url = `${baseUrl}${seed}`;
        await page.goto(url);
        const tables = await page.$$('table');
        for (const table of tables) {
            const rows = await table.$$('tr');
            for (const row of rows) {
                const cells = await row.$$('td');
                for (const cell of cells) {
                    const text = await cell.textContent();
                    const num = parseFloat(text.replace(/,/g, ''));
                    if (!isNaN(num)) grandTotal += num;
                }
            }
        }
    }

    console.log("Grand Total:", grandTotal);
    await browser.close();
})();
