module.exports = function() {
    pToken++;
    if(token[pToken] == "EOF") {
        return true;
    }
    while(token[pToken] == "EOLN") {
        pToken++;
        lineNum++;
    }
    return false;
}