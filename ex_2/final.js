const fs = require('fs');
const {formatOutputPro, formatOutputVar} = require('./formatOutput');

module.exports = function() {
    for(let i = 0; i < varCount; i++) {
        const vkind = vars[i].vkind ? 1 : 0;
        const vtype = (vars[i].vtype == 'integer') ? 'integer' : "";
        console.log(vars[i]);
        const data = formatOutputVar(vars[i].vname, vars[i].vproc, vkind, vtype, vars[i].vlev, vars[i].vadr)
        fs.writeFileSync('test.var', data, {
            encoding: 'utf8'
        });
    }

    for(let i = 0; i < proCount; i++) {
        const ptype = (pros[i].vtype == 'integer') ? 'integer' : "";
        const data = formatOutputPro(pros[i].pname, ptype, pros[i].plev, pros[i].fadr, pros[i].ladr)
        fs.writeFileSync('test.pro', data, {
            encoding: 'utf8'
        });
    }

    fs.createReadStream('./test.dyd').pipe(fs.createWriteStream('./test.dys'));
}