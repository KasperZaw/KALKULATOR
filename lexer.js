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

  *tokenizer(input = "") {
    let cursor = 0;

    while (cursor < input.length) {
      const char = input[cursor];
  
      if (char === " " || char === "\t") {
        cursor++;
        continue;
      }
  
      switch (char) {
        case "+":
          yield ({ type: Tokens.AddToken, value: "+" });
          break;
  
        case "-":
          yield ({ type: Tokens.SubToken, value: "-" });
          break;
  
        case "/":
          yield ({ type: Tokens.DivToken, value: "/" });
          break;
  
        case "*":
          yield ({ type: Tokens.MultToken, value: "*" });
          break;
  
        case "(":
          yield ({ type: Tokens.BracketOpen, value: "(" });
          break;
  
        case ")":
          yield ({ type: Tokens.BracketClosed, value: ")" });
          break;
  
        default:
          if (isNumeric(char)) {
            let strNumber = char;
  
            while (
              cursor < input.length - 1 &&
              isNumeric(input[cursor + 1])
            ) {
              cursor++;
              strNumber += input[cursor];
            }
  
            yield ({
              type: Tokens.Number,
              value: parseInt(strNumber),
            });
          } else {
            throw new Error(
              `Oops, Expected a valid number token at ${cursor}!`
            );
          }
  
          break;
      }
  
      cursor++;
    }
  
    yield ({ type: Tokens.EOF, value: "EOF" });
  
  }
}

function isNumeric(char = "") {
  return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

module.exports = {
  Lexer,
  Tokens,
};
