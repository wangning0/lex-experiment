const utils = require('./utils');

module.exports = function(state) {
    const identifierReg = /[a-zA-Z]+/;
    const match = state.data.match(identifierReg);
    const matchData = match[0];
    const matchDataType = utils.identifierMap(matchData);
    state.tokens.push({
        type: matchDataType,
        value: matchData
    })
    state.data = state.data.slice(match.index + matchData.length);
}