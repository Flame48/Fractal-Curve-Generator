class Variable {
    constructor(name, rule, base) {
        this.name = name;
        this.rule = rule;
        this.base = base;
    } //name is a string but rule and base are functions

    activate(n) {
        if(n==0) {
            this.base();
            return;
        }
        this.rule(n);
    }
}

class Constants {
    constructor(action) {
        this.action = action;
    }
}