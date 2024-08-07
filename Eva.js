const assert = require("assert");
const Environment = require("./Environment");

class Eva {

    constructor(global = new Environment()) {
        this.global = global;
    }

    eval(exp, env = this.global) {
        // primitive types
        if (isNumber(exp)) {
            return exp;
        }
        if (isString(exp)) {
            return exp.slice(1, -1);
        }
        if (isBoolean(exp)) {
            return exp;
        }

        // operators
        if (exp[0] === "+") {
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }
        if (exp[0] === "-") {
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }
        if (exp[0] === "*") {
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }
        if (exp[0] === "/") {
            const denom = this.eval(exp[2], env)
            if (isNumber(denom) && denom == 0) {
                throw 'NaN! divide by 0';
            }
            return this.eval(exp[1], env) / denom;
        }
        if (exp[0] === ">") {
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }
        if (exp[0] === "<") {
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }
        if (exp[0] === ">=") {
            return this.eval(exp[1], env) >= this.eval(exp[2], env);
        }
        if (exp[0] === "<=") {
            return this.eval(exp[1], env) <= this.eval(exp[2], env);
        }

        // block
        if (exp[0] === "begin") {
            return this._blockEval(exp, env);
        }

        // variable definition
        if (exp[0] === 'var') {
            const [_, name, value] = exp;
            if (!isVariableName(name)) {
                throw `illegal variable name ${name}`;
            }
            return env.define(name, this.eval(value, env));
        }

        // variable lookup
        if (isVariableName(exp)) {
            return env.lookup(exp)[exp];
        }

        // variable assignment
        if (exp[0] === 'set') {
            const [_, name, value] = exp;
            return env.assign(name, this.eval(value, env));
        }

        // condition
        if (exp[0] == 'if') {
            const [_, condition, consequesnt, alternate] = exp;
            if (this.eval(condition, env)) {
                return this.eval(consequesnt, env);
            } else {
                return this.eval(alternate, env);
            }
        }

        // while
        if (exp[0] === 'while') {
            const [_, condition, innerBlock] = exp;
            let result;
            while (this.eval(condition, env)) {
                result = this.eval(innerBlock, env);
            }
            return result;
        }

        throw `NotImplemented ${JSON.stringify(exp)}`
    }

    _blockEval(block, env) {
        let newEnv = new Environment({}, env); // env is the parent environment
        const [tag, ...expressions] = block;
        let result;
        expressions.forEach(expression => {
            result = this.eval(expression, newEnv);
        });
        return result;
    }
}

function isNumber(exp) {
    return typeof exp === "number";
}

function isString(exp) {
    return typeof exp === "string" &&
        exp[0] == '"' && exp.slice(-1) == '"'; // only accept double quoted strings
}

function isBoolean(exp) {
    return typeof exp === "boolean";
}

function isVariableName(exp) {
    return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}


module.exports = Eva


