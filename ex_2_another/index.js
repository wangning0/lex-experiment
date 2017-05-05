/**
 * 入口文件
 */
const fs = require('fs');
const handleSourceData = require('./handleSourceData');
const handleTokens = require('./handleTokens');
const error = require('./error');
const final = require('./final');

// 初始化所需要的数据
global.token = []; // 字符
global.category = [];
global.pToken = 0;
global.tokenCount = 0;
global.lineNum = 1;
global.varCount = 0; // 变量的数量
global.proCount = 0; // 过程的数量
global.currentPro = { // 存放当前过程的信息
    pname: '',  // 
    plev: '',  // 
    varCount: 0,
    fadr: 0,
    ladr: 0,
    para: 0,
    paraIsDefined: '',
    ptype: ''
},
global.currentVar = { // 存放当前变量的信息
    vname: '',
    vproc: '',
    vkind: '',
    vlev: 0,
    vadr: 0,
    vtype: ''
    // types vtype;
},
global.varArray = [],
global.proArray = []

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




