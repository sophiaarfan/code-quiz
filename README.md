# pyquiz

An interactive Python practice tool built for first and second year CS students. Pick a module, answer 10 randomly generated questions, and see how well you actually understand what your code is doing.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-%23780000?style=for-the-badge&logo=google-chrome&logoColor=white)](https://sophiaarfan.github.io/code-quiz/)

## Modules
- **Variable Tracking** — follow assignments and operations, predict the final value
- **String Operations** — slicing, concatenation, built-in methods
- **List Operations** — indexing, slicing, append, pop, mutation
- **Conditionals** — if / elif / else chains, boolean logic
- **Loop Tracing** — for and while loops, break, continue
- *Function Tracing, Scope, Error ID — coming soon*

## Features
- **Randomly generated questions** so you can't just memorize answers
- **Live HUD** tracks your score and progress through each quiz
- **Instant feedback** tells you exactly what the correct answer was
- **Format hints** on questions that need a specific answer format

## How to use
**Option A:**
Access via the live link: https://sophiaarfan.github.io/code-quiz/

**Option B:**
1. Open `index.html` in a browser
2. Pick a module from the home page
3. Answer each question and submit, or just hit Enter
4. Check your score at the end and retry if you want to beat it

## Project Structure
- `index.html` — landing page and module selection
- `quiz-engine.js` — shared quiz logic (scoring, HUD, progress, completion)
- `quiz.js`, `strings-quiz.js`, `lists-quiz.js`, `conditionals-quiz.js`, `loops-quiz.js` — question generators for each module
- `*-quiz.html` — quiz page for each module
- `css/style.css` — stylesheet