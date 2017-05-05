const fs = require('fs');
const {formatOutputPro, formatOutputVar} = require('./formatOutput');

module.exports = function() {
    for(let i = 0; i < varCount; i++) {
        const vtype = (varArray[i].vtype == 'integer') ? 'integer' : "";
        const data = formatOutputVar(varArray[i].vname, varArray[i].vproc, varArray[i].vkind, vtype, varArray[i].vlev, varArray[i].vadr)
        fs.writeFileSync('test.var', data, {
            encoding: 'utf8'
        });
    }

    for(let i = 0; i < proCount; i++) {
        const ptype = (proArray[i].ptype == 'integer') ? 'integer' : "";
        const data = formatOutputPro(proArray[i].pname, ptype, proArray[i].plev, proArray[i].fadr, proArray[i].ladr)
        fs.writeFileSync('test.pro', data, {
            encoding: 'utf8'
        });
    }

    fs.createReadStream('./test.dyd').pipe(fs.createWriteStream('./test.dys'));
}