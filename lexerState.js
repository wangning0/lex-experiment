/**
 * begin
    integer k;
    integer function F(n);
        begin
        integer n;
        if n<=0 then F:=1
        else F:=n*F(n-1)
        end;
    read(m);
    k:=F(m);
    write(k)
    end
 */
const analyNum = require('./analyNum');
const analyCharacter = require('./analyCharacter');
const analySpace = require('./analySpace');
const analyNewLine = require('./analyNewLine');
const analyIdentifier = require('./analyIdentifier');
const analyError = require('./analyError');
module.exports = function(state) {
    const unAlphabetReg = /[^a-zA-Z]/; // 非字母的正则匹配
    const numberReg = /\d+/; // 数字的正则匹配
    const characterReg = /[:\-*;\(\)=<>]/ // 支持的非字母的符号的匹配
    while(state.data.length > 0) {
        const match = state.data[0].match(unAlphabetReg);
        // 如果匹配了非字母的字符，可能其中含有的字符有：
        //  数字
        //  空格
        //  运算符 = <> <= < >= > - * := ( ) ;
        //  换行符
        // mock "123"
        if(match) {
            const matchData = match[0];
            const matchIndex = match.index;
            if(numberReg.test(matchData)) {
                // 数字
                analyNum(state);
            }else if(characterReg.test(matchData)) {
                // 非字母的符号的匹配
                analyCharacter(state);
            }else if(matchData == ' ') {
                // 空格
                analySpace(state);
            }else if(matchData == '\n') {
                // 换行符
                analyNewLine(state);
            } else {
                analyError(state);
            }
        } else {
            // 处理字符
            analyIdentifier(state);
        }
    }
}