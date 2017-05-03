module.exports = function(data) {
    inputCount = 0;
    pToken = 0;
    pChar = 0;
    lineNum = 1;
    currentPro.name = "";
    currentPro.plev = 0;
    currentPro.varNum = 0;
    currentPro.parameter = -1;
    varCount = 0;
    proCount = 0;
    const file2lineReg = /[-\*;a-zA-Z<=>:\(\)0-9]+( )(\d+)/g;
    const lineDataArr = data.match(file2lineReg);
    lineDataArr.map((item, i) => {
        const spearteArr = item.split(' ');
        kind[i] = Number(spearteArr[1]);
        input[i] = spearteArr[0];
    })
    inputCount = lineDataArr.length;
}