const Tokens = {
  AddToken: "ADD-Token",
  SubToken: "SUB-Token",
  DivToken: "DIV-Token",
  MultToken: "MUL-Token",
  Number: "Number",
  BracketOpen: "Bracket-Open",
  BracketClosed: "Bracket-Closed",
  EOF: "EOF",
};

class Lexer {
  str = "";
  cursor = 0;

  currentPosition() {
    return this.str[this.cursor];
  }

  tokenizer(input = "") {
    this.str = input;
    this.cursor = 0;
    const tokenStorage = [];

    while (this.cursor < this.str.length) {
      if (this.currentPosition() === " " || this.currentPosition() === "\t") {
        this.cursor++;
        continue;
      }

      switch (this.currentPosition()) {
        case "+":
          tokenStorage.push({ type: Tokens.AddToken, value: "+" });
          break;

        case "-":
          tokenStorage.push({ type: Tokens.SubToken, value: "-" });
          break;

        case "/":
          tokenStorage.push({ type: Tokens.DivToken, value: "/" });
          break;

        case "*":
          tokenStorage.push({ type: Tokens.MultToken, value: "*" });
          break;

        case "(":
          tokenStorage.push({ type: Tokens.BracketOpen, value: "(" });
          break;

        case ")":
          tokenStorage.push({ type: Tokens.BracketClosed, value: ")" });
          break;

        default:
          if (isNumeric(this.currentPosition())) {
            let strNumber = "";

            while (
              this.cursor < this.str.length &&
              isNumeric(this.currentPosition())
            ) {
              strNumber += this.currentPosition();
              this.cursor++;
            }

            tokenStorage.push({
              type: Tokens.Number,
              value: parseInt(strNumber),
            });

            this.cursor--;
          } else {
            throw new Error(
              `Oops, Expected a valid number token at ${this.cursor}!`
            );
          }

          break;
      }
      this.cursor++;
    }

    tokenStorage.push({ type: Tokens.EOF, value: "EOF" });
    return tokenStorage;
  }
}

function isNumeric(char = "") {
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

module.exports = {
  Lexer,
  Tokens,
};
