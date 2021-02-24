

//Getting elements from the DOM
const questionElement = document.querySelector(".question")
let answersAll = document.querySelector(".answer-container")
const startButton = document.querySelector(".start")
const nextButton = document.querySelector(".next")
const restartButton = document.querySelector(".restart")
const startingMessage = document.querySelector(".start-page")

let currentQuestionIndex;

startButton.addEventListener("click", startQuiz)
nextButton.addEventListener("click", () => {
		currentQuestionIndex++;
		setNextQuestion();
	})
restartButton.addEventListener("click", restartQuiz)


//Functions
function startQuiz() {
	startingMessage.classList.add('hide');
	startButton.classList.add('hide');
	questionElement.classList.remove('hide');
	answersAll.classList.remove('hide');
	nextButton.classList.remove('hide');
	currentQuestionIndex = 0;
	setNextQuestion();
}

function setNextQuestion() {
  resetState()
  showNextQuestion([currentQuestionIndex])
}

function showNextQuestion(question) {
	questionElement.innerText = quizQuestions[question].question;
	quizQuestions[question].answers.forEach(answer => {
		const newAnswerButtons = document.createElement('div');
		newAnswerButtons.innerText = answer.text;
		if (answer.correct) {
			newAnswerButtons.dataset.correct = answer.correct;
		}
		newAnswerButtons.addEventListener("click", selectAnswer);
		answersAll.appendChild(newAnswerButtons)
	})
}

function resetState() {
	nextButton.classList.add('hide');
	while (answersAll.firstChild) {
		answersAll.removeChild(answersAll.firstChild)
	}
}

function selectAnswer(e) {
	const chosenAnswer = e.target;
	const correct = chosenAnswer.dataset.correct;
	Array.from(answersAll.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if (currentQuestionIndex < 3) {
		nextButton.classList.remove('hide')
	} else {
		restartButton.classList.remove('hide')
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if(correct) {
		element.classList.add('correct')
	} else{
		element.classList.add('incorrect')
	}
}

function clearStatusClass(element){
	element.classList.remove('correct');
	element.classList.remove('incorrect')
}

function restartQuiz() {
	restartButton.classList.add('hide');
	startButton.classList.remove('hide');
	startingMessage.classList.remove('hide');
	questionElement.classList.add('hide');
	answersAll.classList.add('hide');
	nextButton.classList.add('hide')
}


//Quiz questions and answers
const quizQuestions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false },
      { text: '21', correct: false },
      { text: '23', correct: false },
    ]
  },
  {
    question: 'Who is the best dog?',
    answers: [
      { text: 'Casper', correct: true },
      { text: 'Dogoo', correct: false },
      { text: 'Snoot', correct: false },
      { text: 'Boop', correct: false }
    ]
  },
  {
    question: 'Dogs are good at doing what?',
    answers: [
      { text: 'reading', correct: false },
      { text: 'Being the best snuggle-buddies', correct: true },
      { text: 'Being mad', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]
