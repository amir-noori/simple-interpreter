const assert = require('assert');
const testUtil = require('./test-util.js');

module.exports = eva => {

    // block
    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'x', 15],
            ['var', 'y', 5],
            ['*', ['+', 'x', 'y'], 5],
        ]), 100);

    // same variable in nested blocked  
    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'x', 10],
            [
                'begin',
                ['var', 'x', 20],
                'x'
            ],
            'x'
        ]), 10);

    // lookup in parent scope for variable    
    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'x', 10],
            ['var', 'result', [
                'begin',
                ['var', 'y', ['+', 'x', 10]],
                'y'
            ]],
            'result'
        ]), 20);

    assert.strictEqual(eva.eval(
        [
            'begin',
            ['var', 'x', 10],
            ['var', 'result', [
                'begin',
                ['var', 'y', ['+', 'x', 10]],
                'y'
            ]],
            'result'
        ]), 20);



    testUtil.test(eva, `
        (begin
            (var x 10)
            (var y 20)
            (+ (* x 10) y)
        )    
    `, 120)
}