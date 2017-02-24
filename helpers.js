
function tryParseInt(arg) {
    var result = parseInt(arg);
    // Parse int returns NaN if the first character in `arg` cannot be converted to a string.
    // @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    if (isNaN(result)) {
        throw Error("Argument port must be an integer. '" + arg + "' is not valid.");
    }
    return result;
}

module.exports = {tryParseInt};