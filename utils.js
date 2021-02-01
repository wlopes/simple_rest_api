function getValidAttributes(incomingAttributes, allowedArray){
    let validAttrs = {};
    Object.keys(incomingAttributes)
    .filter(a => allowedArray.includes(a))
    .map(a => {
        validAttrs[a] = incomingAttributes[a]
    })
    return validAttrs;
}

module.exports = {getValidAttributes};