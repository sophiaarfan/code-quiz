let currentQuestion = 0;
let scoreCount = 0;
let questionCount = 10;
let currentAns;

const quizDiv = document.getElementById(`quiz`);
const resultDiv = document.getElementById(`result`);
const scoreDiv = document.getElementById(`score`);
const nextQ = document.getElementById(`nextQ`);
const introDiv = document.getElementById(`introduction`);

function questionGen() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 9) + 1;
    let operation = Math.floor(Math.random() * 4);

    let code = "";
    let answer = 0;

    if (operation == 0) {
        let ogY = y;
        let newY = Math.floor(Math.random() * 5);
        code += `y = ${y}\n`;
        code += `x = ${x} + y * 2\n`;
        code += `y = ${newY}\n`;
        code += `x`;
        answer = x + ogY * 2;
    } else if (operation == 1) {
        code += `a = ${a}\n`;
        code += `b = ${b}\n`;
        code += `b = a // b + b / a\n`;
        code += `b`;
        answer = Math.floor(a / b) + b / a;
        answer = Math.round(answer * 100)/100;
    }else if (operation == 2) {
        code += `def f(x, y):\n    return x + y\n`
        code += `def g(y, x):\n    return x + y\n`
        code += `x = ${x}\n`;
        code += `y = ${y}\n`;
        code += `g(y, y)`;
        answer = y+y;
    } else {
        code += `x = ${x}\n`;
        code += `y = ${y}\n`;
        code += `x = x + y\n`;
        code += `y = y + 1\n`;
        code += `x`;
        answer = x + y;
    }
    return {code: code, answer: answer};
}

function startQuiz() {
    introDiv.style.display = "none";
    quizDiv.style.display = "block";
    scoreCount = 0;
    currentQuestion = 0;
    scoreDiv.innerHTML = `Current Score: 0 / ${questionCount}`;
    showQuestion();
}

function showQuestion() {
    nextQ.style.display = "none";
    resultDiv.innerHTML = "";
    let question = questionGen();
    currentAns = question.answer; 
    quizDiv.innerHTML = `
        <h1>Question ${currentQuestion+1}</h1>
        <pre>${question.code}</pre>
        <input type="text" id="inputedAnswer" placeholder="Type the output">
        <button onclick="checkAns()"> Submit</button>
    `;
}

function checkAns() {
    const userInput = document.getElementById('inputedAnswer').value.trim();
    let correct = false;

    if(!isNaN(currentAns)) {
        correct = parseFloat(userInput) === parseFloat(currentAns);
    } else {
        correct = userInput === currentAns.toString();
    }

    if(correct) {
        resultDiv.innerHTML = "Correct!!";
        scoreCount++;
    } else {
        resultDiv.innerHTML = `Incorrect. The correct answer is: ${currentAns}`;
    }

    scoreDiv.innerHTML = `Current Score: ${scoreCount} / ${questionCount}`;
    nextQ.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if(currentQuestion < questionCount) {
        showQuestion();
    } else {
        quizDiv.innerHTML = "<h2>Quiz Completed!</h2>";
        resultDiv.innerHTML = `Your final score is ${scoreCount} / ${questionCount}`;
        nextQ.style.display = "none";
    }
}