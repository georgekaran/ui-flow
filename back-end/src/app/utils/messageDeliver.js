function getPropertyValue(key, arrayParams = []) {
    return replaceParams(process.env[key], arrayParams)
}

function replaceParams(message, arrayParams = []) {
    arrayParams.map((param, index) => {
        message = message.replace(`{${index}}`, param)
    })
    return message
}

module.exports = {
    getPropertyValue,
    replaceParams
}