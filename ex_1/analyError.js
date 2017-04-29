module.exports = function(state) {
    state.tokens.push({
        type: 'Error',
        value: '***' + state.lineNum + '  不支持该字符'
    })
    state.data = state.data.slice(1);
}