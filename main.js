const util = require("util")
const { Lexer } = require('./lexer');
const { Parser } = require('./parser');

const input = "2 + 3 * (4 - 1)";

const lexer = new Lexer();
const tokenStorage = Array.from(lexer.tokenizer(input));
const parser = new Parser(tokenStorage);


const parsedResult = parser.parse();

console.log(util.inspect(parsedResult, {showHidden: false, depth: null, colors: true}));
