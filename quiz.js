// Variable Tracking — questionGen only, engine is in quiz-engine.js

function questionGen() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 9) + 1;
    let operation = Math.floor(Math.random() * 4);

    let code = "";
    let answer = 0;

    if (operation === 0) {
        let ogY = y;
        let newY = Math.floor(Math.random() * 5);
        code += `y = ${y}\n`;
        code += `x = ${x} + y * 2\n`;
        code += `y = ${newY}\n`;
        code += `x`;
        answer = x + ogY * 2;
    } else if (operation === 1) {
        code += `a = ${a}\n`;
        code += `b = ${b}\n`;
        code += `b = a // b + b / a\n`;
        code += `b`;
        answer = Math.floor(a / b) + b / a;
        answer = Math.round(answer * 100) / 100;
    } else if (operation === 2) {
        code += `def f(x, y):\n    return x + y\n`;
        code += `def g(y, x):\n    return x + y\n`;
        code += `x = ${x}\n`;
        code += `y = ${y}\n`;
        code += `g(y, y)`;
        answer = y + y;
    } else {
        code += `x = ${x}\n`;
        code += `y = ${y}\n`;
        code += `x = x + y\n`;
        code += `y = y + 1\n`;
        code += `x`;
        answer = x + y;
    }

    return { code, answer };
}
