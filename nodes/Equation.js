import AbstractContainer from "./AbstractContainer.js";
import {registerNode} from "./AbstractNode.js";

class Equation extends AbstractContainer {
    constructor() { // equation is signless
        super([], 1, 1);
        this.type = "equation";
    }

    evaluate() {
        return this;
    }

    serialize() {
        var str = "";
        str += this.getElement(0).serialize();
        str += " = ";
        str += this.getElement(1).serialize();
        return str;
    }

    breakDown() {
        var result = this.new("Equation"),
            expr = this.new("Sum"),
            elem1 = this.getElement(0).clone(),
            elem2 = this.getElement(1).clone();

        elem2.applySign(-1);
        expr.push(elem1);
        expr.push(elem2);

        result.push(expr.breakDown());
        result.push(this.new("Number", 0));

        return result;
    }

    summarize() {
        var result = this.new("Equation"),
            elem1 = this.getElement(0).clone().summarize(),
            elem2 = this.getElement(1).clone().summarize();

        result.push(elem1);
        result.push(elem2);

        return result;
    }

    norm() {
        var sEqn = this.breakDown().summarize().breakDown().summarize(); // a bit scatchy...

        if (sEqn.getElement(0) instanceof AbstractContainer) {

            if (sEqn.getElement(0).getElement(0).getType() == "number") {
                var number = sEqn.getElement(0).getElement(0);
                var elems = sEqn.getElement(0).getElements();
                number.applySign(-1);
                sEqn.setElement(1, number);
                sEqn.getElement(0).setElements(elems.slice(1, elems.length));
            }
        }

        return sEqn;
    }
}

registerNode("Equation", Equation);
export default Equation;
