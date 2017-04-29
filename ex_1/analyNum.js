module.exports = function(state) {
    const numberReg = /\d+/;
    const match = state.data.match(numberReg);
    const matchData = match[0];
    state.tokens.push({
        type: 11,
        value: matchData
    })
    state.data = state.data.slice(match.index + matchData.length);
}