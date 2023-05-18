const { Tokens } = require('./lexer');

class Parser {
    tokenScanner;
    tokenStorage = [];
    cursor = 0;

    currentTokenPosition() {
        return this.tokenStorage[this.cursor];
    }

    peaking(n = 1) {
        return this.tokenStorage[this.cursor + n];
    }

    tokenEater(expectedToken) {
        if (expectedToken === this.currentTokenPosition().type) {
            this.cursor++;
        } else {
            throw new Error(`Oops, Expected token to be ${this.currentTokenPosition().type}`);
        }
    }

    constructor(tokenStorage) {
        this.tokenStorage = tokenStorage;
    }

    parse() {
        return this.parseExpresion();
    }

    parseExpresion() {
        let leftSide = this.parseTerm();
        while (this.currentTokenPosition().type == Tokens.AddToken || this.currentTokenPosition().type == Tokens.SubToken) {
            const operator = this.currentTokenPosition().value;
            const tokenTypes = (this.currentTokenPosition().type == Tokens.AddToken)? Tokens.AddToken : Tokens.SubToken;
            this.tokenEater(tokenTypes)
            let rs = this.parseTerm();
            leftSide = {type: "BinaryOperator", operator, leftSide, rightSide: rs}
        }
        return leftSide;
    }

    parseTerm() {
        let leftSide = this.parseFactor();
        while (this.currentTokenPosition().type == Tokens.DivToken || this.currentTokenPosition().type == Tokens.MultToken) {
            const operator = this.currentTokenPosition().value;
            const tokenTypes = (this.currentTokenPosition().type == Tokens.MultToken)? Tokens.MultToken : Tokens.DivToken;
            this.tokenEater(tokenTypes)
            let rs = this.parseFactor();
            leftSide = {type: "BinaryOperator", operator, leftSide, rightSide: rs}
        }
        return leftSide;
    }

    parseFactor() {
        if (this.currentTokenPosition().type === Tokens.Number) {
          let number = { type: 'Numeric', value: this.currentTokenPosition().value };
          this.tokenEater(Tokens.Number);
          return number;
        }
        if (this.currentTokenPosition().type === Tokens.BracketOpen) {
          this.tokenEater(Tokens.BracketOpen);
          let expression = this.parseExpresion();
          this.tokenEater(Tokens.BracketClosed);
          return expression;
        }
        throw new Error('Oops, Expected a Parenthesis token or an integer in input');
      }
}

module.exports = {
    Parser
};
