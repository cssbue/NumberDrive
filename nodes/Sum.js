const AbstractContainer = require("./AbstractContainer");

class Sum extends AbstractContainer {
  constructor(constructors, sign, mulSign) {
    super(constructors, [], sign, mulSign);
    this.type = "sum";
    this.connectionStrength = 1;
  }

  evaluate() {
    var result = this.new("Number", 0);
    for (var element of this.elements) {
      var value = element.evaluate();
      if (value.getType() == "number") {
        result = result.addNumber(value);
      }
    }
    return result;
  }

  normSign() {
    if (this.isNegative()) {
      for (var element of this.getElements()) {
        element.applySign(this.getSign());
      }
      this.applySign(this.getSign());
    }
  }

  mulSum(node) {
    this.normSign();
    node.normSign();
    var result = this.new("Sum");
    for (var element of node.getElements()) {
      result.push(this.mulNonSum(element));
    }
    return result.breakDown();
  }

  mulNonSum(node) {
    this.normSign();
    var result = this.new("Sum");
    for (var element of this.getElements()) {
      var summand = this.new("Product");
      summand.applySign(node.getSign());
      summand.applySign(element.getSign());
      node.resetSign();
      element.resetSign();
      if (node.type == "product") {
        summand.setElements(node.getElements());
      } else {
        summand.push(node);
      }
      summand.push(element);
      result.push(summand);
    }
    return result;
  }

  breakDown() {
    var newElements = [];
    if (this.isEvaluable()) {
      return this.evaluate();
    }
    for (var rawElement of this.getElements()) {
      rawElement.applySign(this.getSign());
      var element = rawElement.breakDown();
      if (element.getType() == "sum") {
        for (var subElement of element.getElements()) {
          subElement.applySign(element.getSign());
          newElements.push(subElement);
        }
      } else {
        newElements.push(element)
      }
    }
    this.setSign(1);
    if (newElements.length > 1) {
      this.setElements(newElements);
      return this;
    } else {
      var element = newElements[0];
      element.applySign(this.getSign());
      element.applyMulSign(this.getMulSign());
      return element;
    }
  }

  summarize() {
    this.normSign();
    var result = this.new("Sum", this.getSign(), this.getMulSign());
    var evals = this.getEvaluables();
    var nEvals = this.getNonEvaluables().map( x => x.summarize());

    // combine evals
    if (evals.length > 0) {
      var value = this.new("Sum");
      value.setElements(evals);
      result.push(value.evaluate());
    }

    // combine nEvals
    if (nEvals.length > 0) {
      var summarized;
      var summands;
      do {
        summarized = false;
        summands = [];
        for (var i = 0; i < nEvals.length; i++) {
          if (!summarized) {
            for (var k = 0; k < nEvals.length; k++) {
              var node1 = nEvals[i],
                  node2 = nEvals[k];
              var c1 = node1.getCoefficient(),
                  c2 = node2.getCoefficient();

              if (
                i != k && node1.getType() == "product"
                && (
                  node2.getType() == "product"
                  || node2.getType() == "symbol"
                )
              ) {
                if (node1.isMultipleOf(node2)) {
                  var nEvals1 = node1.getNonEvaluables();
                  var coeff = this.new("Sum");
                  var comb = this.new("Product");
                  coeff.push(c1);
                  coeff.push(c2);
                  coeff = coeff.evaluate();
                  comb.setElements(
                    [coeff].concat(nEvals1)
                  );
                  comb.squashSigns();

                  for (var j = 0; j < nEvals.length; j++) {
                    if (j != i && j != k) {
                      summands.push(nEvals[j]);
                    }
                    if (j == i && !coeff.getValue().equals(0)) {
                      summands.push(comb);
                    }
                  }

                  nEvals = summands;
                  summarized = true;
                  break;
                }
              } else if (
                i != k
                && node1.getType() == "symbol"
                && node2.getType() == "symbol"
              ) {
                if (node1.getName() == node2.getName()) {
                  console.log(node1.getName(), node2.getName());
                  for (var j = 0; j < nEvals.length; j++) {
                    if (j != i && j != k) {
                      summands.push(nEvals[j]);
                    }
                    if (j == i) {
                      if (node1.getSignString() == node2.getSignString()) {
                        var c1 = node1.getCoefficient(),
                            c2 = node2.getCoefficient();
                        var coeff = this.new("Sum");
                        coeff.push(c1);
                        coeff.push(c2);
                        var comb = this.new("Product");
                        comb.push(coeff.evaluate());
                        comb.push(this.new("Symbol", node1.getName()));
                        comb.squashSigns()
                        summands.push(comb);
                      }
                    }
                  }

                  nEvals = summands;
                  summarized = true;
                  break;
                }
              }
            }
          } else {
            break;
          }
        }
      } while (summarized);
      result.setElements(
        result.getElements().concat(nEvals)
      )
    }
    return result;
  }

  getSerializeSeperator(element, first) {
    var seperator = element.getSignString();
    if (first) {
      if (seperator == "+") {
        return "";
      }
      return seperator + " ";
    }
    return " " + seperator + " ";
  }
}

module.exports = Sum;
