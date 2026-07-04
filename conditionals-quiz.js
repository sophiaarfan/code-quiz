// Conditionals — questionGen only

function rand(n) { return Math.floor(Math.random() * n); }
function randInt(lo, hi) { return lo + rand(hi - lo + 1); }

function questionGen() {
    let op = rand(4);
    let code = "";
    let answer = "";

    if (op === 0) {
        // simple if / else
        let x = randInt(0, 20);
        let threshold = randInt(5, 15);
        code += `x = ${x}\n`;
        code += `if x > ${threshold}:\n`;
        code += `    print("big")\n`;
        code += `else:\n`;
        code += `    print("small")`;
        answer = x > threshold ? 'big' : 'small';
    } else if (op === 1) {
        // if / elif / else
        let n = randInt(-5, 15);
        code += `n = ${n}\n`;
        code += `if n > 10:\n`;
        code += `    print("high")\n`;
        code += `elif n > 0:\n`;
        code += `    print("positive")\n`;
        code += `else:\n`;
        code += `    print("non-positive")`;
        if (n > 10) answer = 'high';
        else if (n > 0) answer = 'positive';
        else answer = 'non-positive';
    } else if (op === 2) {
        // nested if
        let a = randInt(0, 10);
        let b = randInt(0, 10);
        code += `a = ${a}\n`;
        code += `b = ${b}\n`;
        code += `if a > b:\n`;
        code += `    if a > 5:\n`;
        code += `        print("a is big")\n`;
        code += `    else:\n`;
        code += `        print("a wins small")\n`;
        code += `else:\n`;
        code += `    print("b wins")`;
        if (a > b) {
            answer = a > 5 ? 'a is big' : 'a wins small';
        } else {
            answer = 'b wins';
        }
    } else {
        // boolean logic
        let x = randInt(0, 10);
        let y = randInt(0, 10);
        let useAnd = rand(2) === 0;
        code += `x = ${x}\n`;
        code += `y = ${y}\n`;
        if (useAnd) {
            code += `if x > 3 and y > 3:\n`;
            code += `    print("both")\n`;
            code += `else:\n`;
            code += `    print("nope")`;
            answer = (x > 3 && y > 3) ? 'both' : 'nope';
        } else {
            code += `if x > 7 or y > 7:\n`;
            code += `    print("at least one")\n`;
            code += `else:\n`;
            code += `    print("neither")`;
            answer = (x > 7 || y > 7) ? 'at least one' : 'neither';
        }
    }

    return { code, answer };
}
