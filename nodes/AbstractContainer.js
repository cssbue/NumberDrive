import AbstractNode, {registerNode} from "./AbstractNode.js";

class AbstractContainer extends AbstractNode {
    constructor(elements, sign, mulSign) {
        super(sign, mulSign);
        this.setElements(elements);
        this.type = "AbstractContainer";
        this.connectionStrength = 0;
    }

    getSymbolNames() {
        var symNames = [];

        for (var e of this.getElements()) {
            var subSymNames = e.getSymbolNames();
            for (var symbol of subSymNames) {
                if (!symNames.includes(symbol)) {
                    symNames.push(symbol)
                }
            }
        }

        return symNames;
    }

    setStack(stack) {
        this.stack = stack;
        for (var element of this.getElements()) {
            element.setStack(stack);
        }
    }

    isEvaluable() {
        for (var element of this.getElements()) {
            if (!element.isEvaluable()) {
                return false;
            }
        }
        return true;
    }

    getEvaluables() {
        var result = [];
        for (var element of this.getElements()) {
            if (element.isEvaluable()) {
                result.push(element);
            }
        }
        return result;
    }

    getNonEvaluables() {
        var result = [];
        for (var element of this.getElements()) {
            if (!element.isEvaluable()) {
                result.push(element);
            }
        }
        return result;
    }

    getElements() {
        return this.elements;
    }

    setElements(e) {
        this.elements = e ? e : [];
    }

    getElement(i) {
        return this.elements[i];
    }

    setElement(i, value) {
        this.elements[i] = value;
    }

    push(e) {
        this.getElements().push(e);
    }

    getLength() {
        return this.getElements().length;
    }

    equals(node) {
        if (node.constructor === this.constructor) {
            if (this.getLength() == node.getLength()) {
                if (
                    this.getSign().equals(node.getSign())
                    && this.getMulSign().equals(node.getMulSign())
                ) {
                    var compared = new Array(this.getLength()).fill(false);
                    for (var i = 0; i < this.getLength(); i++) {
                        var isEqual = false;
                        for (var k = 0; k < node.getLength(); k++) {
                            if (this.getElement(i).equals(node.getElement(k)) && !compared[k]) {
                                compared[k] = true;
                                isEqual = true;
                                break;
                            }
                        }
                        if (!isEqual) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    }

    stringify() {
        var lines = [];
        lines.push(this.stringifyHead());
        for (var element of this.getElements()) {
            var elementLines;
            if (element instanceof AbstractNode) {
                elementLines = element.stringify().map(x => "  " + x);
            } else {
                elementLines = ["  " + element];
            }
            lines = lines.concat(elementLines);
        }
        return lines;
    }

    getConnectionStrength() {
        return this.connectionStrength;
    }
}

registerNode(AbstractContainer);

export default AbstractContainer;
