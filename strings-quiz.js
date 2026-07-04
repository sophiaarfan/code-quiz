// String Operations — questionGen only

function rand(n) { return Math.floor(Math.random() * n); }

const WORDS = ['hello', 'world', 'python', 'code', 'quiz', 'data', 'loop', 'list'];

function questionGen() {
    let op = rand(5);
    let code = "";
    let answer = "";

    if (op === 0) {
        // slicing
        let w = WORDS[rand(WORDS.length)];
        let start = rand(w.length - 1);
        let end = start + 1 + rand(w.length - start - 1);
        code += `s = "${w}"\n`;
        code += `s[${start}:${end}]`;
        answer = w.slice(start, end);
    } else if (op === 1) {
        // concatenation + len
        let a = WORDS[rand(WORDS.length)];
        let b = WORDS[rand(WORDS.length)];
        code += `a = "${a}"\n`;
        code += `b = "${b}"\n`;
        code += `len(a + b)`;
        answer = (a + b).length;
    } else if (op === 2) {
        // .upper() / .lower() on a slice
        let w = WORDS[rand(WORDS.length)];
        let start = rand(w.length - 2);
        let end = start + 2 + rand(2);
        if (end > w.length) end = w.length;
        let method = rand(2) === 0 ? 'upper' : 'lower';
        code += `s = "${w}"\n`;
        code += `s[${start}:${end}].${method}()`;
        answer = method === 'upper'
            ? w.slice(start, end).toUpperCase()
            : w.slice(start, end).toLowerCase();
        answer = `'${answer}'`;
    } else if (op === 3) {
        // .replace()
        let w = WORDS[rand(WORDS.length)];
        let idx = rand(w.length);
        let oldChar = w[idx];
        let newChar = 'x';
        code += `s = "${w}"\n`;
        code += `s.replace("${oldChar}", "${newChar}")`;
        answer = `'${w.split(oldChar).join(newChar)}'`;
    } else {
        // negative indexing
        let w = WORDS[rand(WORDS.length)];
        let idx = -(1 + rand(w.length - 1));
        code += `s = "${w}"\n`;
        code += `s[${idx}]`;
        answer = `'${w[w.length + idx]}'`;
    }

    return { code, answer };
}
