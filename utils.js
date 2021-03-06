import Decimal from 'decimal.js';

export default {
    binco: function (n, k) {
        let result = new Decimal(1);
        if (n < k) {
            throw "invalid input: n < k!";
        }
        while (k > 0) {
            result = result.mul(n / k);
            n--;
            k--;
        }
        return result.round();
    },

    indexCheck: function (tensor, coords) {
        let realCoords = [];

        if (coords.getDimensions().length !== 1)
            throw "invalid index dimensions";

        if (coords.getDimensions()[0] !== tensor.getDimensions().length)
            throw "invalid index length";

        for (let i = 0; i < coords.getElements().length; i++) {
            let coord = coords.getElements()[i];

            if (coord.getType() != "number")
                throw "invalid index value type";

            if (coord.getSign().equals(-1))
                throw "index value < 0";

            if (!coord.getValue().isInt())
                throw "index value is not an integer";

            if (coord.getValue().gt(tensor.getDimensions()[i]) || !coord.getValue().gte(1))
                throw "index out of bounds";

            realCoords.push(coord.getValue().toNumber() - 1);
        }

        return realCoords;
    }
}
