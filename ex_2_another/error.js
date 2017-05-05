/**
 * 处理错误的模块
 */
const fs = require('fs');
const {SYMBOL_UNDEFINED, SYMBOL_REDEFINED, SYMBOL_NONE, SYMBOL_NO_MATCH, ERR_EXECUTE} = require('./constant');
module.exports = function(lineNum, errType, symbol) {
    switch (errType) {
        case SYMBOL_UNDEFINED:
            err2file(`***LINE:${lineNum}  ${token[pToken]}符号无定义\n`);
            break;
        case SYMBOL_REDEFINED:
            err2file(`***LINE:${lineNum}  ${token[pToken]}符号重定义\n`);
            break;
        case ERR_EXECUTE:
            err2file(`***LINE:${lineNum}  ${token[pToken]}处不能匹配执行语句\n`);
            break;
        case SYMBOL_NONE:
            err2file(`***LINE:${lineNum}  ${token[pToken]}处缺少${symbol}\n`);
            break;
        case SYMBOL_NO_MATCH:
            err2file(`***LINE:${lineNum}  ${token[pToken]} no match ${symbol}\n`);
            break;
        default:
            err2file(`未知错误`);
    }
    return true;
}

function err2file(data) {
    try {
        fs.writeFileSync('./test.err', data, {
            encoding: 'utf8',
            flag: 'a'
        })
    } catch(e) {
        console.log(e);
    } 
}