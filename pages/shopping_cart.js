const get_class_info = require('../tasks/get_class_info')
const reg_loop = require('../tasks/reg_loop')



module.exports = (async (page) => {
    // await page.screenshot({ path: './newshot.png' })
    console.log("Entering shopping cart function")
    const frame = await page.$('iframe[name="TargetContent"]')

    const contentFrame = await frame.contentFrame()
    await contentFrame.waitFor(5000)
    // const contentFrame = await frame.contentFrame()
    // await contentFrame.waitForNavigation({ waitUntil: 'domcontentloaded' })

    // await page.screenshot({ path: './cart.png' })

    await Promise.all([
        contentFrame.waitForNavigation(),
        contentFrame.click('a[id="DERIVED_SSS_SCL_SSS_ENRL_CART$276$"]')
    ])

    await contentFrame.click('input[id="SSR_DUMMY_RECV1$sels$1$$0"]')

    const semText = await contentFrame.evaluate(() => {
        const element = document.querySelector('span[id="TERM_CAR$1"]')
        const text = element.innerText

        return text
    })
    
    console.log(`Selected ${semText} semester`)

    await Promise.all([
        contentFrame.waitForNavigation(),
        contentFrame.click('a[id="DERIVED_SSS_SCT_SSR_PB_GO"]')
    ])

    // await page.screenshot({ path: './screenshot.png' })

    const classInformation = await get_class_info(contentFrame)

    await Promise.all(classInformation)

    return classInformation

    

    // await page.screenshot({ path: './screenshot.png' })
    
    // const tableRows = await contentFrame.$$('[id^="trSSR_REGFORM_VW"]')
    // console.log(tableRows)
    // const tableRow = await contentFrame.evaluate(() => {
    //     const block = document.querySelectorAll('[id^="trSSR_REGFORM_VW"]')

    //     return block
    // })

    // console.log(tableRows)

    // await tableRows[0].screenshot({ path: './screenshot.png' })
    // await tableRows[1].screenshot({ path: './screenshot.png' })

    
    // var test = tableRows.map(async (e) => {
    //     const imgElement = await e.$('img[class="SSSIMAGECENTER"]')
    //     const test = await imgElement.evaluate((node) => node.alt)

    //     return test
    // })

    // await Promise.all(test)
    
    // // const imgElement = await tableRows[0].$('img[class="SSSIMAGECENTER"]')
    // // const test = await imgElement.evaluate((node) => node.alt)

    // test.map(async (e) => {
    //     console.log(await e)
    // })
    // const propertyHandle = await imgElement.getProperty('alt')
    // const propertyValue = await propertyHandle.jsonValue()

    // await imgElement.screenshot({ path: './element.png' })

    return
})