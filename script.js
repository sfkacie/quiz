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
    question: 'What is the capital city of California?',
    answers: [
        { text: 'Sacramento', correct: true },
        { text: 'San Francisco', wrong: false },
        { text: 'Los Angeles', wrong: false },
        { text: 'San Diego', wrong: false }
    ]
  },
  {
    question: 'Which brand of car made in Korea?',
    answers: [
        { text: 'Honda', wrong: false },
        { text: 'Hyundai', correct: true },
        { text: 'Audi', wrong: false },
        { text: 'Mazda', wrong: false }
    ]
  },
  {
    question: 'Find the pixar movie.',
    answers: [
        { text: 'Lion King', wrong: false },
        { text: 'Zootopia', wrong: false },
        { text: 'Wreck-It-Ralph', wrong: false },
        { text: 'Toy Story', correct: true }
    ]
  },
  {
    question: 'Who is NOT a Generation instructor?',
    answers: [
        { text: 'Zoe', wrong: false },
        { text: 'Priya', wrong: false },
        { text: 'Renu', wrong: false },
        { text: 'Hermione', correct: true }
    ]
  },
  {
  question: 'Who won the NBA Finals 2022?',
    answers: [
        { text: 'Boston Celtics', wrong: false },
        { text: 'Golden State Warriors56', correct: true },
        { text: 'Chicago Bulls', wrong: false },
        { text: 'Utah Jazz', wrong: false }
    ]
   },
   {
    question: 'What is 7 * 8?',
    answers: [
        { text: '15', wrong: false },
        { text: '56', correct: true },
        { text: '78', wrong: false },
        { text: '87', wrong: false }
    ]
   }
]
 
