const util = require("util")

const {Lexer} = require('./lexer')
const {Parser} = require('./parser')


const lexer = new Lexer();
const input = '10 * (10 + 3 * 3 -2)';
const tokens = lexer.tokenizer(input)

const parser = new Parser(tokens);

const ast = parser.parse();
console.log(util.inspect(ast, {showHidden: false, depth: null, colors: true})); // usuwa problem z  rightSide: [Object]