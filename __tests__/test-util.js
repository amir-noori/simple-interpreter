const assert = require('assert');
const evaParser = require("../parser/evaParser.js");

function test(eva, code, expected) {
    parsedExp = evaParser.parse(code);
    assert.strictEqual(eva.eval(parsedExp), expected);
}

module.exports = {
    test
};