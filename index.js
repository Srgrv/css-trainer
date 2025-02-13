"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const properties = [
        {
            description: "Определяет цвет фона элемента.",
            answer: "background-color",
        },
        {
            description: "Определяет отступы внутри элемента.",
            answer: "padding",
        },
        {
            description: "Определяет размер шрифта текста.",
            answer: "font-size",
        },
        {
            description: "Определяет ширину границы вокруг элемента.",
            answer: "border-width",
        },
        {
            description: "Определяет стиль линии границы вокруг элемента.",
            answer: "border-style",
        },
        {
            description: "Определяет внешний вид курсора при наведении на элемент.",
            answer: "cursor",
        },
        {
            description: "Определяет расстояние между строками текста.",
            answer: "line-height",
        },
        {
            description: "Определяет тип и начертание шрифта для текста.",
            answer: "font-family",
        },
        {
            description: "Определяет высоту строки таблицы.",
            answer: "height",
        },
        {
            description: "Определяет способ выравнивания содержимого по горизонтали.",
            answer: "text-align",
        },
    ];
    let answeredQuestions;
    const storedData = localStorage.getItem("answeredQuestions");
    if (typeof storedData === "string") {
        try {
            answeredQuestions = JSON.parse(storedData);
        }
        catch (error) {
            console.log("Error parsing data from local storage: ", error);
            answeredQuestions = [];
        }
    }
    else {
        answeredQuestions = [];
    }
    let currentQuestionIndex = 0;
    let timeLeft = 100;
    let timerInterval;
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Время вышло! Вы провалили тренажер.");
                resetProgress();
                return;
            }
            const timer = document.getElementById("timer");
            if (timer instanceof HTMLElement) {
                timer.innerText = `00:${String(timeLeft).padStart(2, "0")}`;
                timeLeft--;
            }
        }, 1000);
    }
    function showNextQuestion() {
        if (currentQuestionIndex >= properties.length) {
            alert("Вы справились с тренажером!");
            resetProgress();
            return;
        }
        const questionContainer = document.getElementById("question-container");
        const property = properties[currentQuestionIndex];
        if (questionContainer !== null && property !== undefined) {
            const description = questionContainer.querySelector(".description");
            if (description) {
                description.innerHTML = property.description;
            }
        }
        const answerInput = document.getElementById("answer-input");
        if (answerInput) {
            answerInput.value = "";
            answerInput.classList.remove("error");
        }
    }
    function checkAnswer(event) {
        event.preventDefault();
        const input = document.getElementById("answer-input");
        const answer = input === null || input === void 0 ? void 0 : input.value.trim().toLowerCase();
        const correctAnswer = properties[currentQuestionIndex].answer;
        if (answer === correctAnswer) {
            answeredQuestions.push(currentQuestionIndex);
            localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
            currentQuestionIndex++;
            //   shuffleArray(properties);
            showNextQuestion();
        }
        else {
            input === null || input === void 0 ? void 0 : input.classList.add("error");
        }
    }
    function resetProgress() {
        localStorage.removeItem("answeredQuestions");
        answeredQuestions = [];
        currentQuestionIndex = 0;
        timeLeft = 30;
        clearInterval(timerInterval);
        startTimer();
        shuffleArray(properties);
        showNextQuestion();
    }
    const submitButton = document.getElementById("submit-button");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", checkAnswer);
    const resetButton = document.getElementById("reset-button");
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", resetProgress);
    shuffleArray(properties);
    showNextQuestion();
    startTimer();
});
