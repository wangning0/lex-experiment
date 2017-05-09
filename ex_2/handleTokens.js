const nextToken = require('./nextToken');
const error = require('./error');
const clone = require('./clone');
const {SIGN_UNDEFINED_ERR, SIGN_REDEFINED_ERR, SIGN_EXECUTE_ERR, NO_SIGN_ERR, NO_PARA_ERR, SIGN_RESERVE_ERR} = require('./constant');
// 程序的入口 A->B
function A() {
    B();
}

// 分程序 B->begin C;M end
function B() {
    if(input[pToken] == 'begin') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "begin");
        if(input[pToken] != 'integer') {
            nextToken();
        }
    }
    C();
    if(input[pToken] == ';') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ';');
        if(input[pToken] != 'integer' && input[pToken] != 'read' && input[pToken] != 'write' && kind[pToken] != 10) {
            nextToken();
        }
    }
    M();
    if(input[pToken] == 'end') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'end');
    }
}

// C：说明语句表		C->DC'
// C'->;DC'|ε
function C() {
    D();
    C_();
}

// D：说明语句 D->E|J
function D() {
    if(input[pToken + 1] == 'function') {
        J();
    } else {
        E();
    }
}

function C_() {
    if(input[pToken] == ';' && input[getNextToken()] == 'integer') {
        nextToken();
        D();
        C_();
    } else {
        if(input[pToken] == 'integer') {
            error(NO_SIGN_ERR, ";");
			D();
			C_();
        }
    }
}

// E: 变量说明 E-> integer F
function E() {
    if(input[pToken] == 'integer') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'integer');
        nextToken();
    }
    currentVar.vname = input[pToken];
    currentVar.vproc = currentPro.pname;
    if(input[pToken] ==input[ currentPro.parameter]) {
        currentVar.vkind = true;
        currentPro.parameterIsDefined = true;
    } else {
        currentVar.vkind = false;
    }
    currentVar.vtype = 'integer'; 
	currentVar.vlev = currentPro.plev;
	currentVar.vadr = varCount;
    if (isVarExisted(input[pToken], currentPro.pname, currentVar.vkind)) { //如果存在变量
		error(SIGN_REDEFINED_ERR, null);
	} else {
        if (currentPro.varNum == 0)//如果当前过程中变量数为0，则当前变量是当前过程的第一个变量
		{
			currentPro.fadr = currentVar.vadr;
		}
		currentPro.ladr = currentVar.vadr;//过程中最后一个变量在变量表中的位置
		currentPro.varNum++;//过程中变量数++
        //vars[varCount] 
		vars[varCount] = clone(currentVar);//当前变量存入var数组
		varCount++;//变量数++
    }
    F();
}

// F:变量				F->G
function F() {
    G();
}

// M：执行语句表		M->NM'
// M'->;NM'|ε
function M() {
    N();
    M_();
}

// N：执行语句			N->O|P|Q|W
function N() {
    if(input[pToken] == 'read') {
        O();
    } else if(input[pToken] == 'write') {
        P()
    } else if(input[pToken] == 'if') {
        W();
    } else if(kind[pToken] == 10) {
        Q();
    } else {
        error(SIGN_EXECUTE_ERR, null);
        nextToken();
    }
} 

// M_
function M_() {
    if(input[pToken] == ';') {
        nextToken();
        N();
        M_();
    } else {
        if(input[pToken] != 'end' && input[pToken] != 'EOF') {
            error(NO_SIGN_ERR, ';');
            N();
            M_();
        }
    }
}

// 读语句 O->read(F)
function O() {
    if(input[pToken] == 'read') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'read');
        if(input[pToken] != '(') {
            nextToken();
        }
    }

    if(input[pToken] == '(') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "(");
        if(kind[pToken] != 10) {
            nextToken();
        }
    }

    if(!isVarExisted(input[pToken], currentPro.pname, false) && !isVarExisted(input[pToken], currentPro.pname, true)) {
        error(SIGN_UNDEFINED_ERR,null);
    }
    F();
    if(input[pToken] == ')') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ")");
		if (input[pToken] != ';' && input[pToken] != 'end') {
			nextToken();
		}
    }
}

// 写语句			P->write(F)
function P() {
    if(input[pToken] == 'write') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'write');
        if(input[pToken] != '(') {
            nextToken();
        }
    }

    if(input[pToken] == '(') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "(");
        if(kind[pToken] != 10) {
            nextToken();
        }
    }

    if(!isVarExisted(input[pToken], currentPro.pname, false) && !isVarExisted(input[pToken], currentPro.pname, true)) {
        error(SIGN_UNDEFINED_ERR, null);
    }
    F();
    if(input[pToken] == ')') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ")");
		if (input[pToken] != ';' && input[pToken] != 'end') {
			nextToken();
		}
    }
}

// 赋值语句			Q->F:=R
function Q() {
    if (!isVarExisted(input[pToken], currentPro.pname, false) && !isVarExisted(input[pToken], currentPro.pname, true) && !isProExisted(input[pToken])){
		error(SIGN_UNDEFINED_ERR, null);
	}
	F();
	if (input[pToken] == ':='){
		nextToken();
	}
	else{
		error(NO_SIGN_ERR, ":=");
		if ((kind[pToken] != 10) && (kind[pToken] != 11)){
			nextToken();
		}
	}
	R();
}

// R：算术表达式		R->SR'
function R() {
    S();
    R_();
}

function R_() {
    if(input[pToken] == '-') {
        nextToken();
        S();
        R_();
    } else {
        if(kind[pToken] == 10 || kind[pToken] == 11) {
            S();
            R_();
        }
    }
}

// S S：项				S->TS'
// S'->*TS'|ε
function S() {
    T();
    S_();
}

function S_() {
    if(input[pToken] == '*') {
        nextToken();
        T();
        S_();
    } else {
        if ((kind[pToken] == 10) || (kind[pToken] == 11)){
			T();
			S_();
		}
    }
}

// T：因子				T->F|U|Z
function T() {
    if (input[pToken][pChar] >= '0' && input[pToken][pChar] <= '9'){
		U();
	} else if (input[getNextToken()] == '('){///////////////////////pToken+1
		Z();
	} else {
		if (!isVarExisted(input[pToken], currentPro.pname, false) && !isVarExisted(input[pToken], currentPro.pname, true)){
			error(SIGN_UNDEFINED_ERR,null);
		}
		F();
	}
}

//U：常数				U->V
function U() {
    if (kind[pToken] == 11) {
		nextToken();
	}
}
// 条件语句			W->if X then N else N
function W() {
    if(input[pToken] == 'if') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'if');
        if ((kind[pToken] != 10) && (kind[pToken] != 11)){
			nextToken();
		}
    }
    X();
    if(input[pToken] == 'then') {
        nextToken();
    } else {
         error(NO_SIGN_ERR, 'then');
         if((input[pToken] != 'integer') && (input[pToken] != 'read') && (input[pToken] != 'write') && (kind[pToken] != 10)) {
             nextToken();
         }
    }
    N();
    if(input[pToken] == 'else') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'else');
         if((input[pToken] != 'integer') && (input[pToken] != 'read') && (input[pToken] != 'write') && (kind[pToken] != 10)) {
             nextToken();
         }
    }
    N();
}

// J: 函数说明 J->integer function G(K);L
function J() {
    const proBackup = clone(currentPro);
    if(input[pToken] == 'integer') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "integer");
        if(input[pToken] != 'function') {
            nextToken();
        }
    }

    if(input[pToken] == 'function') {
        nextToken();
    } else {
         error(NO_SIGN_ERR, "function");
        if(kind[pToken] != 10) {
            nextToken();
        }
    }
    currentPro.pname = input[pToken];
    currentPro.ptype = 'integer';
	currentPro.plev++;
	currentPro.varNum = 0;
	currentPro.parameterIsDefined = false;
    if(isProExisted(input[pToken])) {
        error(SIGN_REDEFINED_ERR, null);
    }
    G();
    if(input[pToken] == '(') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "(");
        if(kind[pToken] != 10) {
            nextToken();
        }
    }
    currentPro.parameter = pToken;
    K();
    if(input[pToken] == ')') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ")");
        if(input[pToken] != ';') {
            nextToken();
        }
    }

    if(input[pToken] == ';') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ";");
        if(input[pToken] != 'begin') {
            nextToken();
        }
    }
    L();

    currentPro = clone(proBackup);//匹配完G过程后恢复原过程
}

//K：参数				K->F
function K() {
    F();
}
// G：标识符			G->HG'
// G'->HG'|IG'|ε
function G() {
    if(kind[pToken] == 10) {
        nextToken();
    }
}

function L() {
    if(input[pToken] == 'begin') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "begin");
        if(input[pToken] != 'integer') {
            nextToken();
        }
    }
    C();
    if (!currentPro.parameterIsDefined)
	{
		error(NO_PARA_ERR, input[currentPro.parameter]);
	}
	pros[proCount] = clone(currentPro);//在这里而不是在J()函数最后把currentPro加入pro数组是因为M中可能会使用当前过程(递归)
	proCount++;
    if(input[pToken] == ';') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, ';');
        if(input[pToken] != 'integer' && input[pToken] != 'read' && input[pToken] != 'write' && kind[pToken] != 10) {
            nextToken();
        }
    }
    M();
    if(input[pToken] == 'end') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, 'end');
        if(input[pToken] != ';' && input[pToken] != 'end') {
            nextToken();
        }
    }
}
 
// X：条件表达式		X->RYR
function X() {
    R();
	Y();
	R();
}

// Y：关系运算符		Y-><|<=|>|>=|=|<>
function Y() {
    if(input[pToken] == '<' || input[pToken] == '<=' || input[pToken] == '>' || input[pToken] == '>=' || input[pToken] == '=' || input[pToken] == '<>') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "关系运算符");
        if ((kind[pToken] != 10) && (kind[pToken] != 11)) {
			nextToken();
		}
    }
}

// Z：函数调用			Z->G(R)
function Z() {
    if(!isProExisted(input[pToken])) {
        error(SIGN_UNDEFINED_ERR, null);
    }
    G();
    if(input[pToken] == '(') {
        nextToken();
    } else {
        error(NO_SIGN_ERR, "(");
        if ((kind[pToken] != 10) && (kind[pToken] != 11))
		{
			nextToken();
		}
    }
    R();
    if (input[pToken] == ')') {
		nextToken();
	}
	else {
		error(NO_SIGN_ERR, ")");
        if(kind[pToken] != '-' && kind[pToken] != '*' && kind[pToken] != ';' && kind[pToken] != 'end') {
            nextToken();
        }
	}
}


function isVarExisted(vname, vproc, vkind) {
    for (let i = 0; i < varCount; i++) {
        if((vname == vars[i].vname) && (vproc == vars[i].vproc) && (vars[i].vkind == vkind)) {
            return true;
        }
	}
	for (let i = 0; i < proCount; i++) {
        if(vname == pros[i].pname) {
            return true;
        }
	}
	return false;
}

function getNextToken() {
    let pNextToken = pToken + 1;
    while(input[pNextToken] == 'EOLN') {
        pNextToken++;
    }
    return pNextToken;
}

function isProExisted(vname) {
    for(let i = 0; i < varCount; i++) {
        if(vname == vars[i].vname) {
            return true;
        }
    }

    for(let j = 0; j < proCount; j++) {
        if(vname == pros[j].pname) {
            return true;
        }
    }

    return false;
}
module.exports = A;