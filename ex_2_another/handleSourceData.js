module.exports = function(data) {
    tokenCount = 0;
    pToken = 0;
    pChar = 0;
    lineNum = 1;
    currentPro.pname = "";
    currentPro.plev = 0;
    currentPro.varCount = 0;
    currentPro.para = -1;
    varCount = 0;
    proCount = 0;
    const file2lineReg = /[-\*;a-zA-Z<=>:\(\)0-9]+( )(\d+)/g;
    const lineDataArr = data.match(file2lineReg);
    lineDataArr.map((item, i) => {
        const spearteArr = item.split(' ');
        category[i] = Number(spearteArr[1]);
        token[i] = spearteArr[0];
    })
    tokenCount = lineDataArr.length;
}