
module.exports = async function registrationLoop(page, classInformation) {
    var run = true
    var classOpen = false

    setTimeout(async () => {
        console.log("Checking to see if a class is open")
        classInformation.map(async (info) => {
            info = await info
            if (info.classAvailable) {
                classOpen = true
                
                // await obj.rowElement.click(`input[name="P_SELECT$${obj.rowIndex}"]`)
                const checkpoint = await info.rowElement.$(`input[name="P_SELECT$${info.rowIndex}"]`)
                await checkpoint.click()
            }
        })

        console.log("Refreshing page")
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] })
    }, 10000)

    return
}