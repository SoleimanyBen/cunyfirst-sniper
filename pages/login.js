

module.exports = (async (page) => {
    const htmlIds = {
        usernameInput: "CUNYfirstUsernameH",
        passwordInput: "CUNYfirstPassword",
    }

    // console.log(page)

    await page.goto('https://cunyfirst.cuny.edu/')

    await page.type(`input[id="${htmlIds.usernameInput}"]`, process.env.CUNYFIRST_EMAIL)
    await page.type(`input[id="${htmlIds.passwordInput}"]`, process.env.CUNYFIRST_PASSWORD)

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('button[id="submit"]')
    ])

    await page.click('a[id="pthnavbca_PORTAL_ROOT_OBJECT"]')
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('li[id="crefli_HC_SSS_STUDENT_CENTER"]')
    ])

    return
})