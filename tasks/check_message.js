module.exports = async function checkMessage(frame) {
    const imgElement = frame.$('img[class="SSSIMAGECENTER"]')
    const imgAttribute = imgElement.evaluate((node) => { node.alt })

    console.log(imgAttribute)
}