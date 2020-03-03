const AbstractContainer = require("./AbstractContainer");

class FunctionCall extends AbstractContainer {
  constructor(constructors, name, sign, mulSign) {
    super(constructors, [], sign, mulSign);
    this.type = "functionCall";
    this.name = name;
  }

  getName() {
    return this.name;
  }

  evaluate() {
    if (this.getStack().exists(this.getName())) {
      var obj = this.getStack().getValue(this.getName());
      if (obj.getType() == "function" || obj.getType() == "genericFunction") {
        return obj.call(this.getElements(), this.getStack());
      }
      throw this.getName() + " is not a function";
    }
    throw this.getName() + " does not exist";
  }

  serialize() {
    var str = "";
    str += this.getName() + "(";
    for (var i = 0; i < this.getElements().length; i++) {
      str += this.getElement(i).serialize();
      if (i < this.getElements().length - 1) {
        str += ", ";
      }
    }
    str += ")";
    return str;
  }
}

module.exports = FunctionCall;