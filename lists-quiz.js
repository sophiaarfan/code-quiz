// List Operations — questionGen only

function rand(n) { return Math.floor(Math.random() * n); }

function randList(len) {
    let arr = [];
    for (let i = 0; i < len; i++) arr.push(rand(10));
    return arr;
}

function pyList(arr) {
    return '[' + arr.join(', ') + ']';
}

function questionGen() {
    let op = rand(5);
    let code = "";
    let answer = "";
    let hint = "";

    let lst = randList(4 + rand(3)); // length 4–6

    if (op === 0) {
        // index access
        let idx = rand(lst.length);
        code += `lst = ${pyList(lst)}\n`;
        code += `lst[${idx}]`;
        answer = lst[idx];
    } else if (op === 1) {
        // slicing — answer is a list
        let start = rand(lst.length - 1);
        let end = start + 1 + rand(lst.length - start - 1);
        code += `lst = ${pyList(lst)}\n`;
        code += `lst[${start}:${end}]`;
        answer = pyList(lst.slice(start, end));
        hint = "use Python list format, e.g. [1, 2, 3]";
    } else if (op === 2) {
        // append then access
        let val = rand(10);
        code += `lst = ${pyList(lst)}\n`;
        code += `lst.append(${val})\n`;
        code += `lst[-1]`;
        answer = val;
    } else if (op === 3) {
        // pop then len
        code += `lst = ${pyList(lst)}\n`;
        code += `lst.pop()\n`;
        code += `len(lst)`;
        answer = lst.length - 1;
    } else {
        // mutation then full list
        let idx = rand(lst.length);
        let newVal = rand(10);
        let mutated = [...lst];
        mutated[idx] = newVal;
        code += `lst = ${pyList(lst)}\n`;
        code += `lst[${idx}] = ${newVal}\n`;
        code += `lst`;
        answer = pyList(mutated);
        hint = "use Python list format, e.g. [1, 2, 3]";
    }

    return { code, answer, hint };
}
