module.exports = function(state) {
    const spaceReg = /( )+/;
    const match = state.data.match(spaceReg);
    const matchData = match[0];
    state.data = state.data.slice(match.index + matchData.length);
}