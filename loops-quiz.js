// Loop Tracing — questionGen only

function rand(n) { return Math.floor(Math.random() * n); }
function randInt(lo, hi) { return lo + rand(hi - lo + 1); }

function questionGen() {
    let op = rand(6);
    let code = "";
    let answer = "";
    let hint = "";

    if (op === 0) {
        // for range — final accumulator value
        let start = randInt(0, 3);
        let end = randInt(start + 2, start + 6);
        let step = 1;
        code += `total = 0\n`;
        code += `for i in range(${start}, ${end}):\n`;
        code += `    total += i\n`;
        code += `total`;
        let sum = 0;
        for (let i = start; i < end; i += step) sum += i;
        answer = sum;
    } else if (op === 1) {
        // for range — print each iteration
        let end = randInt(3, 6);
        let mult = randInt(1, 4);
        code += `for i in range(${end}):\n`;
        code += `    print(i * ${mult})`;
        let lines = [];
        for (let i = 0; i < end; i++) lines.push(i * mult);
        answer = lines.join(', ');
        hint = "separate each printed line with a comma, e.g. 0, 2, 4";
    } else if (op === 2) {
        // while loop — final value
        let x = randInt(1, 4);
        let limit = randInt(x + 5, x + 12);
        let add = randInt(2, 4);
        code += `x = ${x}\n`;
        code += `while x < ${limit}:\n`;
        code += `    x += ${add}\n`;
        code += `x`;
        let val = x;
        let safety = 0;
        while (val < limit && safety < 100) { val += add; safety++; }
        answer = val;
    } else if (op === 3) {
        // for loop over list — sum or last element
        let len = randInt(3, 5);
        let lst = [];
        for (let i = 0; i < len; i++) lst.push(randInt(1, 9));
        let useSum = rand(2) === 0;
        code += `lst = [${lst.join(', ')}]\n`;
        if (useSum) {
            code += `total = 0\n`;
            code += `for n in lst:\n`;
            code += `    total += n\n`;
            code += `total`;
            answer = lst.reduce((a, b) => a + b, 0);
        } else {
            code += `last = 0\n`;
            code += `for n in lst:\n`;
            code += `    last = n\n`;
            code += `last`;
            answer = lst[lst.length - 1];
        }
    } else if (op === 4) {
        // for with break
        let end = randInt(5, 9);
        let breakAt = randInt(2, end - 1);
        code += `result = 0\n`;
        code += `for i in range(${end}):\n`;
        code += `    if i == ${breakAt}:\n`;
        code += `        break\n`;
        code += `    result += i\n`;
        code += `result`;
        let res = 0;
        for (let i = 0; i < end; i++) {
            if (i === breakAt) break;
            res += i;
        }
        answer = res;
    } else {
        // for with continue — print only non-skipped
        let end = randInt(4, 7);
        let skip = randInt(1, end - 2);
        code += `for i in range(${end}):\n`;
        code += `    if i == ${skip}:\n`;
        code += `        continue\n`;
        code += `    print(i)`;
        let lines = [];
        for (let i = 0; i < end; i++) {
            if (i === skip) continue;
            lines.push(i);
        }
        answer = lines.join(', ');
        hint = "separate each printed line with a comma, e.g. 0, 1, 3";
    }

    return { code, answer, hint };
}
