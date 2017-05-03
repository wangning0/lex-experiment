#!/usr/bin/env node
// const file = process.argv[2];
// const execSync = require('child_process').execSync;
// execSync('rm -rf ./test.dyd ./test.err');

const fs = require('fs');
const lexerState = require('./lexerState');
const tokensToFile = require('./tokensToFile');
const data = fs.createReadStream('./test.pas', 'utf8');
const state = {
    lineNum: 1,
    tokens: []
};
data.on('data', (data) => {
    state.data = data;
    lexerState(state);
});

data.on('end', () => {
    state.tokens.push({
        type: 25,
        value: 'EOF' 
    })
    console.log(state.tokens);
    tokensToFile(state.tokens);
})