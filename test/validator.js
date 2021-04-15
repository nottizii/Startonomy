/* eslint-disable */
function validate(thing, type) {
    this.thing = thing
    this.type = type
    return typeof thing === type
}

console.log(validate(null, 'null'))