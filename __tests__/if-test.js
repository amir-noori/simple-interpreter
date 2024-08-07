const assert = require('assert');

module.exports = eva => {
    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'x', 15],
            ['var', 'y', 5],
            ['var', 'z', 0],

            ['if', ['>', 'x', 20],
                ['set', 'z', 1],
                ['set', 'z', 2],
            ],
            'z'
        ]), 2);
}