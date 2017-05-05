function formatOutputVar(vname, vproc, vkind, vtype, vlev, vadr) {
    const _vname = _16length(vname);
    const _vproc = _16length(vproc);
    return `${_vname} ${_vproc} ${vkind} ${vtype} ${vlev} ${vadr}`;
}

function formatOutputPro(pname, ptype, plev, fadr, fadr) {
    const _pname = _16length(pname);
    return `${_pname} ${ptype} ${plev} ${fadr} ${fadr}`
}

function _16length(data) {
    const length = 16;
    const len = data.length;
    let str = '';
    for(let i = 0; i < length - len; i++) {
        str += ' ';
    }
    str += data;
    return str;
}

module.exports = {
    formatOutputVar: formatOutputVar,
    formatOutputPro: formatOutputPro
};