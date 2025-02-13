interface IProperty {
  description: string;
  answer: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const properties: IProperty[] = [
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

  let answeredQuestions: number[];
  const storedData: string | null = localStorage.getItem("answeredQuestions");

  if (typeof storedData === "string") {
    try {
      answeredQuestions = JSON.parse(storedData);
    } catch (error) {
      console.log("Error parsing data from local storage: ", error);
      answeredQuestions = [];
    }
  } else {
    answeredQuestions = [];
  }

  let currentQuestionIndex: number = 0;
  let timeLeft: number = 100;
  let timerInterval: number;

  function shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer(): void {
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Время вышло! Вы провалили тренажер.");
        resetProgress();
        return;
      }

      const timer: HTMLElement | null = document.getElementById("timer");

      if (timer instanceof HTMLElement) {
        timer.innerText = `00:${String(timeLeft).padStart(2, "0")}`;
        timeLeft--;
      }
    }, 1000);
  }

  function showNextQuestion(): void {
    if (currentQuestionIndex >= properties.length) {
      alert("Вы справились с тренажером!");
      resetProgress();
      return;
    }

    const questionContainer: HTMLElement | null =
      document.getElementById("question-container");

    const property: IProperty = properties[currentQuestionIndex];

    if (questionContainer !== null && property !== undefined) {
      const description: Element | null =
        questionContainer.querySelector(".description");

      if (description) {
        description.innerHTML = property.description;
      }
    }

    const answerInput = document.getElementById(
      "answer-input"
    ) as HTMLInputElement | null;

    if (answerInput) {
      answerInput.value = "";
      answerInput.classList.remove("error");
    }
  }

  function checkAnswer(event: Event): void {
    event.preventDefault();
    const input = document.getElementById(
      "answer-input"
    ) as HTMLInputElement | null;
    const answer = input?.value.trim().toLowerCase();
    const correctAnswer = properties[currentQuestionIndex].answer;

    if (answer === correctAnswer) {
      answeredQuestions.push(currentQuestionIndex);
      localStorage.setItem(
        "answeredQuestions",
        JSON.stringify(answeredQuestions)
      );
      currentQuestionIndex++;
      //   shuffleArray(properties);
      showNextQuestion();
    } else {
      input?.classList.add("error");
    }
  }

  function resetProgress(): void {
    localStorage.removeItem("answeredQuestions");
    answeredQuestions = [];
    currentQuestionIndex = 0;
    timeLeft = 100;

    clearInterval(timerInterval);
    startTimer();
    shuffleArray(properties);
    showNextQuestion();
  }

  const submitButton = document.getElementById(
    "submit-button"
  ) as HTMLElement | null;

  submitButton?.addEventListener("click", checkAnswer);

  const resetButton = document.getElementById(
    "reset-button"
  ) as HTMLElement | null;

  resetButton?.addEventListener("click", resetProgress);

  shuffleArray(properties);
  showNextQuestion();
  startTimer();
});
