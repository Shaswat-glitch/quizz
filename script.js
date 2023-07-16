const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'If you type the following code in the console window, what result will you get 3 > 2 > 1 === false ?',
    answers: [
      { text: 'true', correct: true },
      { text: 'false', correct: false }
    ]
  },
  {
    question: 'JavaScript is a ___ -side programming language',
    answers: [
      { text: 'client', correct: false },
      { text: 'server', correct: false },
      { text: 'both', correct: true },
      { text: 'none', correct: false }
    ]
  },
  {
    question: 'Which of the following will write the message “Hello DataFlair!” in an alert box?',
    answers: [
      { text: 'alertBox(“Hello DataFlair!”);', correct: false },
      { text: 'alert(Hello DataFlair!);', correct: false },
      { text: 'msgAlert(“Hello DataFlair!”);', correct: false },
      { text: 'alert(“Hello DataFlair!”);', correct: true}
    ]
  },
  {
    question: 'Which JavaScript label catches all the values, except for the ones specified?',
    answers: [
      { text: 'catch', correct: false },
      { text: 'default', correct: true }
    ]
  }
]