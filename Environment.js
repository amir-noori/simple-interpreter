
class Environment {

    constructor(records = {}, parent = null) {
        this.records = records;
        this.parent = parent;
    }

    define(name, value) {
        this.records[name] = value;
        return value;
    }

    assign(name, value) {
        this.lookup(name)[name] = value;
    }

    lookup(name) {
        if (!this.records.hasOwnProperty(name)) {
            if (this.parent != null) {
                const value = this.parent.lookup(name);
                if (value) {
                    return this.parent.records;
                }
            }
            throw new ReferenceError(`Variable ${name} is not defined!`);
        }
         
        return this.records;
    }
}

module.exports = Environment;