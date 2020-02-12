const AbstractNode = require("./AbstractNode");
const Number = require("./Number");

class Sum extends AbstractNode {
  constructor(sign, mulSign) {
    super([], sign, mulSign);
    this.type = "sum";
  }

  evaluate() {
    var result = new Number(0);
    for (var element of this.elements) {
      result = result.addNumber(element.evaluate());
    }
    result.setMulSign(this.getMulSign());
    result.applySign(this.getSign());
    return result;
  }
}

module.exports = Sum;
