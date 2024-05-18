let vocabularies = [
    { vocabulary: 'Apple', chinese: '蘋果' },
    { vocabulary: 'Banana', chinese: '香蕉' },
    { vocabulary: 'Cat', chinese: '貓' },
];

let currentWordIndex = 0;
let score = 0;
let timeLeft = 60;
let isPaused = false;

function filterChapters(book) {
    const chapterSelect = document.getElementById('chapterSelect');
    chapterSelect.innerHTML = '<option value="">請先選擇書籍</option>';

    if (book === '') {
        chapterSelect.disabled = true;
    } else {
        chapterSelect.disabled = false;
    }
}

function togglePause() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById('pauseButton');
    pauseButton.textContent = isPaused ? '繼續' : '暫停';
}

function nextWord() {
    if (isPaused) return;

    currentWordIndex++;
    if (currentWordIndex >= vocabularies.length) {
        currentWordIndex = 0;
    }

    const currentWord = vocabularies[currentWordIndex];
    const questionList = document.getElementById('questionList');
    const options = document.getElementById('options');
    const feedback = document.getElementById('feedback');

    questionList.innerHTML = `<li>題號：${currentWordIndex + 1} / ${vocabularies.length}</li>`;
    questionList.innerHTML += `<li>單字：${currentWord.vocabulary}</li>`;
    questionList.innerHTML += `<li>中文：${currentWord.chinese}</li>`;

    options.innerHTML = '';
    feedback.textContent = '';

    const shuffledOptions = shuffleOptions([...vocabularies]);
    for (let option of shuffledOptions) {
        options.innerHTML += `<div class="option" onclick="checkAnswer('${option.chinese}')">${option.chinese}</div>`;
    }
}

function checkAnswer(answer) {
    const currentWord = vocabularies[currentWordIndex];
    const feedback = document.getElementById('feedback');

    if (answer === currentWord.chinese) {
        feedback.textContent = 'Correct!';
        feedback.classList.add('correct-feedback');
        score++;
        document.getElementById('score').textContent = score;
    } else {
        feedback.textContent = 'Incorrect!';
        feedback.classList.remove('correct-feedback');
    }
}

function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
}

function updateTimer() {
    const timeLeftElement = document.getElementById('timeLeft');
    if (timeLeft > 0 && !isPaused) {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
    } else if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById('submitButton').disabled = true;
    }
}

let timerInterval = setInterval(updateTimer, 1000);
