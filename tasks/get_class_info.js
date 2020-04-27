
function classIsOpen(status) {
    if (status === "Open") {
        return true
    }

    return false
}

module.exports = async function getClassInformation(scFrame) {
    const tableRows = await scFrame.$$('[id^="trSSR_REGFORM_VW"]')

    var contentRows = tableRows.map(async (e, i) => {
        let classInformation = {
            rowElement: e,
            rowIndex: i,
            className: null,
            classId: null,
            classTeacher: null,
            classAvailable: false,
        }

        await e.screenshot({ path: './screenshot.png' })

        const nameElement = await e.$(`a[name="P_CLASS_NAME$${i}"]`)
        const name = await nameElement.evaluate((node) => node.innerText)

        const nameSplit = name.split('\n')

        classInformation.className = nameSplit[0]
        classInformation.classId = nameSplit[1]

        const teacherElement = await e.$('span[id^="DERIVED_REGFRM1_SSR_INSTR_LONG"]')
        const teacher = await teacherElement.evaluate((node) => node.innerText)

        classInformation.classTeacher = teacher

        const imgElement = await e.$('img[class="SSSIMAGECENTER"]')
        const status = await imgElement.evaluate((node) => node.alt)
        
        classInformation.classAvailable = classIsOpen(status)

        return classInformation
    })

    await Promise.all(contentRows)
    
    return contentRows
}