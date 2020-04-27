require('dotenv').config()

const puppeteer = require('puppeteer');

const login = require('./pages/login')
const shopping_cart = require('./pages/shopping_cart.js')

async function runLoop(browser, page) {
    const newPage = await browser.newPage()

    console.log("Navigating to new page")
    await newPage.goto(page.url())
    await newPage.waitFor(2500)

    console.log("Checking shopping cart")
    const classes = await shopping_cart(newPage)

    // console.log(newClasses)

    console.log("Checking to see if a class is open")
    var classOpen = false
    const selectionResults = await classes.map(async (classInfo) => {
        classInfo = await classInfo
        if (classInfo.classAvailable) {
            // await obj.rowElement.click(`input[name="P_SELECT$${obj.rowIndex}"]`)
            const checkbox = await classInfo.rowElement.$(`input[name="P_SELECT$${classInfo.rowIndex}"]`)
            await checkbox.click()

            return true
        }

        return false
    })

    await Promise.all(selectionResults).then(async (results) => {
        const frame = await newPage.$('iframe[name="TargetContent"]')

        const contentFrame = await frame.contentFrame()
        await contentFrame.waitFor(5000)

        if (results.includes(true)) {
            console.log("Attempting to register for classes")
            await Promise.all([
                contentFrame.waitForNavigation({ waitUntil: 'networkidle2' }),
                contentFrame.click('a[name="DERIVED_REGFRM1_LINK_ADD_ENRL"]'),
            ])

            console.log("Registering for classes")
            await contentFrame.click('a[name="DERIVED_REGFRM1_SSR_PB_SUBMIT"]')
            await contentFrame.waitFor(2500)
        }
    })
    

    console.log("Closing original page")
    await page.close()

    console.log("Rerunning class check loop...")
    runLoop(browser, newPage)
}

async function run() {
    try {
        
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
    
        // await page.goto('https://www.google.com', { waitUntil: 'networkidle2' })
        await page.setViewport({ width: 1366, height: 768 })

        await login(page)

        const classes = await shopping_cart(page)

        await runLoop(browser, page, classes)

        // await browser.close()
    } catch(e) {
        console.log("Error: ", e)
    }
}

run()

