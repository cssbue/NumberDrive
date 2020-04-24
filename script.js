const Stack        = require("./scope/Stack");
const Scope        = require("./scope/Scope");
const ENV          = require("./envLoader");
const TreeBuilderC = require("./TreeBuilder.js");
const TreeBuilder  = new TreeBuilderC();
const Parser       = require('@behrenle/number-drive-parser');
const FailedParsingException = require("./exceptions/FailedParsingException");
const Exception = require("./exceptions/Exception");

function transformGerman2English(str) {
  return str
    //.replace(/(?<=\d)\,(?=\d)/g, ".")
    .replace(/,/g, ".")
    .replace(/;/g, ",");
}

function transformEnglish2German(str) {
  return str
    .replace(/,/g, ";")
    .replace(/\./g, ",");
    //.replace(/(?<=\d)\.(?=\d)/g, ",");
}

class Script {
  constructor(lang) {
    // setup script environment
    this.ENV = new Stack();
    for (var scope of ENV.scopes) {
      this.ENV.push(scope);
    }

    // language
    this.lang = lang ? lang : "en";

    // setup user scope
    this.ENV.push(new Scope());

    // setup internal script structre
    this.inputs  = [];
    this.outputs = [];
  }

  getSetting(...args) {
    return this.getENV().getSetting(...args);
  }

  setSetting(...args) {
    this.getENV().setSetting(...args);
  }

  getENV() {
    return this.ENV;
  }

  clearUserScope() {
    this.ENV.pop();
    this.ENV.push(new Scope());
  }

  clearHistory() {
    this.inputs = [];
    this.outputs = [];
  }

  clearAll() {
    this.clearUserScope();
    this.clearHistory();
  }

  setLanguage(lang) {
    this.lang = lang == "de" ? "de" : "en";
  }

  getLength() {
    return this.inputs.length;
  }

  getItems() {
    var items = [];
    for (var i = 0; i < this.inputs.length; i++) {
      items.push(this.getItem(i));
    }
    return items;
  }

  getItem(index) {
    if (!this.inputs[index]) {
      throw "index out of bounds";
    }
    return {
      index: index,
      input: this.getInput(index),
      output: this.getOutput(index)
    };
  }

  getInput(index) {
    return this.lang == "de"
      ? transformEnglish2German(this.inputs[index])
      : this.inputs[index];
  }

  getOutput(index) {
    return this.lang == "de"
      ? transformEnglish2German(this.outputs[index])
      : this.outputs[index];
  }

  push(node) {
    var inputStr, outputStr;

    node.setStack(this.getENV());
    try {
      var result = node.evaluate();
      outputStr = result.serialize();
    } catch (e) {
      if (e instanceof Exception) {
        outputStr = e.stringify();
      } else {
        outputStr = e;
      }
    }

    this.outputs.push(outputStr);
  }

  pushString(rawStr) {
    try {
      var str = this.lang == "en" ? rawStr : transformGerman2English(rawStr);
      var parseTreeNode = Parser.parse(str),
          astNode       = TreeBuilder.build(parseTreeNode);

      this.inputs.push(str);
      this.push(astNode);
    } catch (e) {
      this.inputs.push(str);
      this.outputs.push(new FailedParsingException(e).stringify());
    }
  }

  output() {
    for (var i = 0; i < this.getLength(); i++) {
      console.log(
        "#" + i + ": " +
        this.getInput(i) + "\n> " + this.getOutput(i) + "\n"
      );
    }
  }
}

module.exports = Script;
