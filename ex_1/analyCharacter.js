const utils = require('./utils');

module.exports = function(state) {
    const characterReg = /<[=>]?|>(=)?|=|-|\*|:=|\(|\)|;/;
    const match = state.data.match(characterReg);
    const matchData = match[0];
    state.tokens.push({
        type: utils.characterMap(matchData),
        value: matchData
    })
    state.data = state.data.slice(match.index + matchData.length);
}