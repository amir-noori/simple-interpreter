const Eva = require('../Eva');
const Environment = require('../Environment');

const tests = [
    require('./self-eval-test.js'),
    require('./math-test.js'),
    require('./variable-test.js'),
    require('./block-test.js'),
    require('./if-test.js'),
    require('./while-test.js'),
];

const eva = new Eva();
tests.forEach(test => {
    test(eva)
});

