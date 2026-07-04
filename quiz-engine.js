// shared engine — included before each module's questionGen

let currentQuestion = 0;
let scoreCount = 0;
let questionCount = 10;
let currentAns;
let formatHint = "";

const quizDiv       = document.getElementById('quiz');
const resultDiv     = document.getElementById('result');
const scoreDiv      = document.getElementById('score');
const nextQ         = document.getElementById('nextQ');
const introDiv      = document.getElementById('introduction');
const progressFill  = document.getElementById('progressFill');
const progressWrap  = document.getElementById('progressWrap');
const quizHud       = document.getElementById('quizHud');
const hudQuestion   = document.getElementById('hudQuestion');
const hudScore      = document.getElementById('hudScore');

function updateProgress() {
    progressFill.style.width = (currentQuestion / questionCount * 100) + '%';
    hudQuestion.textContent = (currentQuestion + 1) + ' / ' + questionCount;
    hudScore.textContent = scoreCount;
}

function startQuiz() {
    introDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    progressWrap.style.display = 'block';
    quizHud.style.display = 'flex';
    scoreCount = 0;
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    nextQ.style.display = 'none';
    resultDiv.innerHTML = '';
    resultDiv.className = 'result';
    scoreDiv.innerHTML = '';
    updateProgress();

    let question = questionGen();
    currentAns = question.answer;
    formatHint = question.hint || "";

    let hintHTML = formatHint
        ? `<div class="format-hint">Format: ${formatHint}</div>`
        : '';

    quizDiv.innerHTML = `
        <div class="code-block-tab"><span class="dot"></span> main.py</div>
        <pre>${question.code}</pre>
        ${hintHTML}
        <div class="answer-row">
            <input type="text" id="inputedAnswer" placeholder="What does this output?">
            <button onclick="checkAns()">Submit</button>
        </div>
    `;

    document.getElementById('inputedAnswer').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') checkAns();
    });
}

function normalise(val) {
    // strips whitespace and normalises list formatting for comparison
    return val.toString().replace(/\s+/g, '').toLowerCase();
}

function checkAns() {
    const userInput = document.getElementById('inputedAnswer').value.trim();
    let correct = false;

    let expected = currentAns.toString();

    // numeric check
    if (!isNaN(currentAns) && !isNaN(parseFloat(userInput))) {
        correct = parseFloat(userInput) === parseFloat(currentAns);
    } else {
        correct = normalise(userInput) === normalise(expected);
    }

    if (correct) {
        resultDiv.innerHTML = '✓ Correct!';
        resultDiv.className = 'result correct';
        scoreCount++;
        hudScore.textContent = scoreCount;
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else {
        resultDiv.innerHTML = '✗ Not quite. The answer is <strong>' + currentAns + '</strong>';
        resultDiv.className = 'result incorrect';
    }

    nextQ.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questionCount) {
        showQuestion();
    } else {
        progressFill.style.width = '100%';
        quizHud.style.display = 'none';
        resultDiv.className = 'result';
        resultDiv.innerHTML = '';
        scoreDiv.innerHTML = '';
        nextQ.style.display = 'none';

        let msg = scoreCount === questionCount
            ? "Perfect score! 🎉"
            : scoreCount >= 7
            ? "Nice work!"
            : "Keep practising!";

        quizDiv.innerHTML = `
            <div class="completion-wrap">
                <img src="robot.png" class="completion-mascot" alt="mascot">
                <div class="big-score">${scoreCount}/${questionCount}</div>
                <p class="completion-msg">${msg}</p>
                <button class="btn-retry" onclick="location.reload()">Try again</button>
                <a href="index.html" class="btn-primary" style="display:inline-block;">All modules</a>
            </div>
        `;

        if (scoreCount === questionCount) {
            confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
        }
    }
}
