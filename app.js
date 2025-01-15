const words = [
    { word: "cat", answer: "猫" },
    { word: "dog", answer: "犬" },
    { word: "apple", answer: "りんご" }
];

let currentIndex = 0;
const wordCard = document.getElementById('word-card');
const wordElement = document.getElementById('word');
const showAnswerButton = document.getElementById('show-answer');
const nextWordButton = document.getElementById('next-word');
const addWordButton = document.getElementById('add-word');
const wordList = document.getElementById('word-list');

function displayWord() {
    const currentWord = words[currentIndex];
    wordElement.textContent = currentWord.word;
    wordCard.dataset.answer = currentWord.answer;
}

function updateWordList() {
    wordList.innerHTML = '';
    words.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.word} - ${item.answer}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', () => {
            words.splice(index, 1);
            updateWordList();
            if (currentIndex >= words.length) {
                currentIndex = 0;
            }
            displayWord();
        });
        li.appendChild(deleteButton);
        wordList.appendChild(li);
    });
}

showAnswerButton.addEventListener('click', () => {
    wordElement.textContent = words[currentIndex].answer;
});

nextWordButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % words.length;
    displayWord();
});

addWordButton.addEventListener('click', () => {
    const newWord = document.getElementById('new-word').value;
    const newAnswer = document.getElementById('new-answer').value;

    if (newWord && newAnswer) {
        words.push({ word: newWord, answer: newAnswer });
        document.getElementById('new-word').value = '';
        document.getElementById('new-answer').value = '';
        alert('単語が追加されました！');
        updateWordList();
    } else {
        alert('単語と答えを入力してください。');
    }
});

displayWord();
updateWordList();
