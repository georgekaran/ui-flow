const removePropertyFromObject = (object, propsToBeRemoved) => {
    let newObject = Object.assign({}, object)
    propsToBeRemoved.map(prop => delete newObject[prop])
    return newObject
}

export { removePropertyFromObject }