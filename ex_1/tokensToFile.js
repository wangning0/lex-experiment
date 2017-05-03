const fs = require('fs');
const utils = require('./utils');

module.exports = function(tokens) {
    tokens.map(i => {
        if(i.type == 'Error') {
            fs.writeFile('test.err', i.value, {
                encoding: 'utf8',
                flag: 'a'
            }, (err) => {
                fs.writeFile('error.log', i.value, {
                    encoding: 'utf8',
                    flag: 'a'
                }, () => {})
            })
        } else {
            fs.writeFileSync('test.dyd', utils.formatOutput(i), {
                encoding: 'utf8',
                flag: 'a'
            })
        }
    })    
}