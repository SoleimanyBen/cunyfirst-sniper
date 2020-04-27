const puppeteer = require('puppeteer')

async function runLoop(page) {
    await page.reload()

    console.log("Reloaded and running loop")

    runLoop(page)
}

async function run() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.google.com')

    runLoop(page)
}

run()