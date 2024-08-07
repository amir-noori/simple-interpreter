const assert = require('assert');

module.exports = eva => {
    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'y', 0],

            ['while', ['<', 'y', 10],
                ['set', 'y', ['+', 'y', 1]]
            ],
            'y'
        ]), 10);
}