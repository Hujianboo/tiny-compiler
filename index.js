class Token {
  constructor(type, value) {
    // opr,number
    this.type = type
    this.value = value
  }
}
function tokenScanner(input){
  let current = 0;
  let tokens = [];
  let numberRegex = /[0-9]/
  let oprRegex = /[-+*\/]/
  let parenRegex = /[()]/
  let whiteRegex = /\s/

  while(current < input.length){
    let currentChar = input[current]
    // 空白跳过
    if(whiteRegex.test(currentChar)){
      current++;
      continue;
    }
    // 运算符
    if(oprRegex.test(currentChar)){
      let currentToken = new Token('opr',currentChar)
      tokens.push(currentToken);
      current++;
      continue;
    }
    // 数字
    if(numberRegex.test(currentChar)){
      let value = ''
      // 连续获取数字
      while(numberRegex.test(currentChar)){
        value += currentChar
        current++;
        currentChar = input[current];
      }
      let currentToken = new Token('number',value)
      tokens.push(new Token('number',value))
    }
    // 括号
    if(parenRegex.test(currentChar)){
      let currentToken = new Token('paren',currentChar)
      tokens.push(currentToken);
      current++;
      continue;
    }
  }
  return tokens
}
let str = '4 + 1 + 2 - 3 - 9 + 1'

class Interpreter {
  constructor(tokens){
    this.tokens = tokens
    this.result = 0;
    this.cur = 0;
    this.current_token = null;
  }
  error(errorMessage){
    throw errorMessage
  }
  getNextToken(){
    return this.tokens[this.cur++];
  }
  eat(token_type){

  }
  expr(){
    this.result = Number(this.tokens[0].value);
    let cur = 1;
    while(cur < this.tokens.length){
      if(this.tokens[cur].type === 'opr' && this.tokens[cur].value === '+'){
        cur++;
        this.result += Number(this.tokens[cur].value);
        cur++;
      }else if(this.tokens[cur].type === 'opr' && this.tokens[cur].value === '-'){
        cur++;
        this.result -= Number(this.tokens[cur].value);
        cur++
      } else{
        throw('不合法的加减四则运算输入')
      }
    }
    return this.result
  }
}
let inter = new Interpreter(tokenScanner(str))
console.log(inter.expr())