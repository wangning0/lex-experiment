/**
 * 入口文件
 */
const fs = require('fs');
const {MAX_COUNT, SIGN_UNDEFINED_ERR, SIGN_REDEFINED_ERR, SIGN_EXECUTE_ERR, NO_SIGN_ERR, NO_PARA_ERR, SIGN_RESERVE_ERR} = require('./constant');
const handleSourceData = require('./handleSourceData');
const handleTokens = require('./handleTokens');
const error = require('./error');
const final = require('./final');

// 初始化所需要的数据
global.input = [], // 字符
global.pToken = 0,
global.inputCount = 0,
global.pChar = 0,
global.kind = [], // 类型
global.lineNum = 1,
global.varCount = 0, // 变量的数量
global.proCout = 0, // 过程的数量
global.currentPro = { // 存放当前过程的信息
    pname: '',  // 
    plev: '',  // 
    varNum: 0,
    fadr: 0,
    ladr: 0,
    parameter: 0,
    parameterIsDefined: false,
    ptype: ''
},
global.currentVar = { // 存放当前变量的信息
    vname: '',
    vproc: '',
    vkind: false,
    vlev: 0,
    vadr: 0,
    vtype: ''
    // types vtype;
},
global.vars = [],
global.pros = []

const data = fs.createReadStream('./test.dyd', {
    encoding: 'utf8',
    flags: 'r'
});

data.on('data', (data) => {
    handleSourceData(data);
    handleTokens();
    final();
})

data.on('end', () => {
    console.log('end');
}) 




