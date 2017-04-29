/**
 * @des 工具集
 */
function identifierMap(identifier) {
    switch(identifier) {
        case 'begin':
            return 1;
        case 'end':
            return 2;
        case 'integer':
            return 3;
        case 'if':
            return 4;
        case 'then':
            return 5;
        case 'else':
            return 6;
        case 'function':
            return 7;
        case 'read':
            return 8;
        case 'write':
            return 9;
        default:
            return 10;
    }
}

function characterMap(character) {
    switch(character) {
        case '=':
            return 12;
        case '<>':
            return 13;
        case '<=':
            return 14;
        case '<':
            return 15;
        case '>=':
            return 16;
        case '>':
            return 17;
        case '-':
            return 18;
        case '*':
            return 19;
        case ':=':
            return 20;
        case '(':
            return 21;
        case ')':
            return 22;
        case ';':
            return 23;
        default:
            return 'Error'
    }
}

function formatOutput(token) {
    const length = 16;
    const len = token.value.length;
    let str = '';
    for(let i = 0; i < length - len; i++) {
        str += ' ';
    }
    str += token.value;
    str += ' ' + token.type + '\n';
    return str;
}

module.exports = {
    identifierMap: identifierMap,
    characterMap: characterMap,
    formatOutput: formatOutput
}