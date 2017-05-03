/**
 * 处理错误的模块
 */
const fs = require('fs');
const {SIGN_UNDEFINED_ERR, SIGN_REDEFINED_ERR, SIGN_EXECUTE_ERR, NO_SIGN_ERR, NO_PARA_ERR, SIGN_RESERVE_ERR} = require('./constant');
module.exports = function(errNum, symbol) {
    switch (errNum) {
        case SIGN_UNDEFINED_ERR:
            err2file(`***LINE:${lineNum}  ${input[pToken]}符号无定义\n`);
            break;
        case SIGN_REDEFINED_ERR:
            err2file(`***LINE:${lineNum}  ${input[pToken]}符号重定义\n`);
            break;
        case SIGN_EXECUTE_ERR:
            err2file(`***LINE:${lineNum}  ${input[pToken]}处不能匹配执行语句\n`);
            break;
        case NO_SIGN_ERR:
            err2file(`***LINE:${lineNum}   ${input[pToken]}处缺少${symbol}\n`);
            break;
        case SIGN_RESERVE_ERR:
            err2file(`以保留字开头`);
            break;
        case NO_PARA_ERR:
            err2file(`***LINE:${lineNum}  缺少形参${symbol}的声明\n`)
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