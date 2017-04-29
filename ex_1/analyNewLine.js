module.exports = function(state) {
    state.tokens.push({
        type: 24,
        value: 'EOLN'
    })
    state.data = state.data.slice(1);
    state.lineNum++;
}