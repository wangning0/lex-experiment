const advance = require('./nextToken');
const error = require('./error');
const clone = require('./clone');
const {SYMBOL_UNDEFINED, SYMBOL_REDEFINED, SYMBOL_NONE, SYMBOL_NO_MATCH, ERR_EXECUTE} = require('./constant');

function A() {
    B();
}

function B() {
    if(token[pToken] == 'begin') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "begin");
    }
    C();
    if(token[pToken] == ';') {
        advance();
    } else {
        if(token[pToken] == 'integer') {
            error(lineNum, SYMBOL_NONE, ";");
        }
    }
    D();
    if(token[pToken] == 'end') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "end");
    }
}


function C() {
    E();
    C_();
}


function C_() {
    if (token[pToken] == ';') {
        advance();
        E();
        C_();
    } else {
        // TODO empty
        if (token[pToken] == 'integer') {
            error(lineNum, SYMBOL_NONE, ";");
            E();
            C_();
        }
    }
}


function E() {
    // 用pToken+1
    if (token[pToken + 1] == 'function') {
        G();
    } else if (token[pToken] == 'integer') {
        F();
    }
    // 否则是空产生式
}

function F() {
    if (token[pToken] == 'integer') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "integer");
        advance();
    }
    // H()放到最后为了匹配更多的错
    H();
}

function H() {
    /* 处理变量 第一个if判断是否是变量声明语句或函数声明语句*/
    if (token[pToken - 1] == 'integer' || token[pToken - 2] == 'integer') {
        currentVar.vname = token[pToken]
        currentVar.vproc = currentPro.pname
        // TODO 形参与变量
        if (currentVar.vproc != "") {
            currentVar.vkind = 1; // 形参
            currentPro.paraIsDefined = true;
        } else {
            currentVar.vkind = 0;
        }
        currentVar.vtype = 'integer';
        currentVar.vlev = currentPro.plev;
        currentVar.vadr = varCount;
        if (isVarExisted(token[pToken], currentPro.pname, currentVar.vkind)) {
            console.log(33);
            error(lineNum, SYMBOL_REDEFINED, token[pToken]);// 变量重复定义
        } else {
            if (currentPro.varCount == 0) {
                currentPro.fadr = currentVar.vadr; // 过程的第一个变量
            }
            currentPro.ladr = currentVar.vadr; // 过程的最后一个变量
            currentPro.varCount++;
            varArray[varCount] = clone(currentVar);
            varCount++;
        }
    }
    // 转到标识符
    I();
}

function I() {
    // 标识符
    if (category[pToken] == 10) {
        advance();
    }
}

function G() {
    //    proTable proBackup = currentPro;
    if (token[pToken] == 'integer') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "integer");
    }
    if (token[pToken] == 'function') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "function");
    }
    I();
    /* 处理过程 回退一格*/
    currentPro.pname = token[pToken - 1]
    currentPro.ptype = 'integer';
    currentPro.plev++;
    currentPro.varCount = 0;
    currentPro.paraIsDefined = false;
    
    if (isProExisted(token[pToken - 1])) {
        error(lineNum, SYMBOL_REDEFINED, token[pToken - 1]);
    }
    
    if (token[pToken] == '(') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "(");
    }
    
    currentPro.para = pToken;
    currentPro.paraIsDefined = true;
    L();
    
    if (token[pToken] == ')') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ")");
    }
    if (token[pToken] == ';') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ";");
    }
    
    M();
}

function L() {
    H();
}

function M() {
    if (token[pToken] == 'begin') {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "begin");
    }
    C();
    
    proArray[proCount] = clone(currentPro); // 加入procedure表
    proCount++;
    D();
    if (token[pToken] == "end") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "end");
    }
}

function D() {
    N();
    D_();
}

function D_() {
    if (token[pToken] == ";") {
        advance();
        N();
        D_();
    } else {
        if(token[pToken] != "end"){
            error(lineNum, SYMBOL_NONE, ";");
            N();
            D_();
        }
    }
    // 空的处理
}

function N() {
    if (token[pToken] == "read") {
        O();
    } else if (token[pToken] ==  "write") {
        P();
    } else if (token[pToken] == "if") {
        R();
    } else if (category[pToken] == 10) {
        // 标识符
        Q();
    } else {
        if(token[pToken] == "EOF") {
            return;
        }
        error(lineNum, ERR_EXECUTE, token[pToken]);
        advance();
    }
}

function O() {
    if (token[pToken] == "read") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "read");
    }
    if (token[pToken] == "(") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "(");
    }
    if ((!isVarExisted(token[pToken], currentPro.pname, 0)) && (!isVarExisted(token[pToken], currentPro.pname, 1))) {
        error(lineNum, SYMBOL_UNDEFINED, token[pToken]);
    }
    H();
    if (token[pToken] == ")") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ")");
    }
}

function P() {
    if (token[pToken] == "write") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "write");
    }
    if (token[pToken] == "(") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "(");
    }
    if ((!isVarExisted(token[pToken], currentPro.pname, 0)) && (!isVarExisted(token[pToken], currentPro.pname, 1))) {
        error(lineNum, SYMBOL_UNDEFINED, token[pToken]);
    }
    H();
    if (token[pToken] == ")") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ")");
    }
}

function Q() {
    if ((!isVarExisted(token[pToken], currentPro.pname, 0)) && (!isVarExisted(token[pToken], currentPro.pname, 1)) && (!isProExisted(token[pToken]))) {
        error(lineNum, SYMBOL_UNDEFINED, token[pToken]);
    }
    H();
    if (token[pToken] == ":=") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ":=");
    }
    S();
}

function S() {
    T();
    S_();
}

function S_() {
    if (token[pToken] == "-") {
        advance();
        T();
        S_();
    } else {
        if ((category[pToken] == 10) || (category[pToken] == 11)) {
            T();
            S_();
        }
    }
    //  empty
}

function T() {
    U();
    T_();
}


function T_() {
    if (token[pToken] == "*") {
        advance();
        U();
        T_();
    } else {
        if ((category[pToken] == 10) || (category[pToken] == 11)) {
            U();
            T_();
        }
    }
}

function U() {
    if (category[pToken] == 10) {
        if (token[pToken + 1] == "(") {
            W(); // 函数调用
        } else{
            if ((!isVarExisted(token[pToken], currentPro.pname, 0)) && (!isVarExisted(token[pToken], currentPro.pname, 1))) {
                error(lineNum, SYMBOL_UNDEFINED, token[pToken]);
            }
            I(); // 标识符
        }
    } else if (category[pToken] == 11) {
        V(); // 常数
    }
}

function V() {
    // 简化了常数和无符号整数
    advance();
}

function R() {
    if (token[pToken] == "if") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "if");
    }
    Y();
    if (token[pToken] == "then") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "then");
    }
    N();
    if (token[pToken] == "else") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "else");
    }
    N();
}

function Y() {
    S();
    Z();
    S();
}

function Z() {
    if (category[pToken] >= 12 && category[pToken] <= 17) {
        // 关系运算符
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "relational operator");
    }
}

function W() {
    if (!isProExisted(token[pToken])) {
        error(lineNum, SYMBOL_UNDEFINED, token[pToken]);
    }
    I();
    if (token[pToken] == "(") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, "(");
    }
    S();
    if (token[pToken] == ")") {
        advance();
    } else {
        error(lineNum, SYMBOL_NONE, ")");
    }
}

function isVarExisted(vname, vproc, vkind) {
    console.log('==================begin============================================')
    for (let i = 0; i < varCount; ++i) {
        if (vname === varArray[i].vname && vkind === varArray[i].vkind) {
            return true;
        }
    }
    console.log(11);
    for (let j = 0; j < proCount; ++j) {
        if (vname === proArray[j].pname) {
            return true;
        }
    }
    console.log(22);

    console.log('====================end=========================================')
    return false;
}

function isProExisted(vname) {
    for (let i = 0; i < varCount; ++i) {
        if (vname == varArray[i].vname) {
            return true;
        }
    }
    for (let j = 0; j < proCount; ++j) {
        if (vname == proArray[j].pname) {
            return true;
        }
    }
    return false;
}

module.exports = A;