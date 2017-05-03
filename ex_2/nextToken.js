module.exports = function() {
    pToken++;
    pChar = 0;
    if(input[pToken] == "EOF") {
        return true;
    }
    while(input[pToken] == "EOLN") {
        pToken++;
        lineNum++;
    }
    return false;
}