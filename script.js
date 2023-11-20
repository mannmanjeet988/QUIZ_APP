// Initialize the current question index, score, high scores from local storage, quiz data, user name and selected option
let currentQuestion = 0;
let score = 0;
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let quizData = [];
let userName = "";
let selectedOption = "";

// Function to load quiz data from quizData.json file
const loadQuizData = async () => {
  const res = await fetch("quizData.json");
  quizData = await res.json();
  loadQuestion();
};

// Function to load the current question and options
const loadQuestion = () => {
  const questionObj = quizData[currentQuestion];
  document.getElementById("question").innerText = questionObj.question;
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`btn${i}`);
    btn.innerText = questionObj.options[i];
    btn.className = "option-btn";
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.style.cursor = "default";
  }
  document.getElementById("message").innerText = "";
  document.getElementById("next-btn").style.display = "none";
};

// Function to start the quiz, get the username and display the quiz container
const startQuiz = () => {
  userName = prompt("Enter your username");
  document.getElementById("start-page").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuizData();
};

// Function to end the quiz, hide quiz container, display score, and store high scores in local storage
const endQuiz = () => {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("final-score").innerText = score;
  const highScore = Math.max(...highScores.map((item) => item.score), score);
  document.getElementById("final-high-score").innerText = highScore;
  highScores.push({
    username: userName,
    score: score,
    date: new Date().toISOString(),
  });
  highScores.sort((a, b) => new Date(b.date) - new Date(a.date));
  localStorage.setItem("highScores", JSON.stringify(highScores));
};

// Function to show high scores page with all the scores from local storage
const showHighscores = () => {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("highscore-page").style.display = "block";
  document.getElementById("highscores").innerHTML = highScores
    .map(
      (item) =>
        `<p>${item.username}: ${item.score} 
          (on ${new Date(item.date).toLocaleDateString()} 
          at ${new Date(item.date).toLocaleTimeString()})</p>`
    )
    .join('');

  if (highScores.length == 0) {
    document.getElementById("highscores").innerHTML =
      "<h3>No Scores Yet!</h3><h4>Play the game to see your scores here.</h4>";
  }
};

// Event listeners for Start Quiz button and View Highscores button
document.getElementById("start-btn").addEventListener("click", startQuiz);
document
  .getElementById("highscore-btn")
  .addEventListener("click", showHighscores);

// Event listener for Next Question button
document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    const progress = (currentQuestion / quizData.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    document.getElementById("progress-bar-text").innerText = `${Math.round(
      progress
    )}%`;
  } else {
    endQuiz();
  }
});

// Event listeners for the option buttons, updating score and showing whether the answer is correct or not
for (let i = 0; i < 4; i++) {
  document.getElementById(`btn${i}`).addEventListener("click", (event) => {
    selectedOption = event.target;
    if (
      quizData[currentQuestion].options[i] === quizData[currentQuestion].answer
    ) {
      score++;
      document.getElementById("score").innerText = score;
      selectedOption.className = "option-btn correct";
      document.getElementById("message").innerText = "Correct Answer!";
    } else {
      selectedOption.className = "option-btn wrong";
      document.getElementById("message").innerText = "Wrong Answer!";
    }
    for (let j = 0; j < 4; j++) {
      document.getElementById(`btn${j}`).disabled = true;
      document.getElementById(`btn${j}`).style.cursor = "not-allowed";
      document.getElementById(`btn${j}`).style.opacity = 0.5;
    }
    selectedOption.style.opacity = 1;
    document.getElementById("next-btn").style.display = "block";
  });
}

const goBackBtn = document.getElementById("goBackBtn").addEventListener("click",()=>{
  console.log("go back")
  window.location.reload()
  document.getElementById("start-page").style.display = "block";
  document.getElementById("highscore-page").style.display = "none";
})

const goBackBtn2 = document.getElementById("goBackBtn2").addEventListener("click",()=>{
  console.log("go back")
  window.location.reload()
  document.getElementById("start-page").style.display = "block";
  document.getElementById("score-container").style.display = "none";
})


// {
//   {
//     "question": "Who invented the telephone?",
//     "options": [
//       "Thomas Edison",
//       "Alexander Graham Bell",
//       "Albert Einstein",
//       "Nikola Tesla"
//     ],
//     "answer": "Alexander Graham Bell"
//   },
//   {
//     "question": "What year was the first iPhone released?",
//     "options": ["2005", "2007", "2008", "2010"],
//     "answer": "2007"
//   },
//   {
//     "question": "What is the capital of Spain?",
//     "options": ["Barcelona", "Madrid", "Valencia", "Seville"],
//     "answer": "Madrid"
//   },
//   {
//     "question": "Which planet is known as the Red Planet?",
//     "options": ["Mars", "Mercury", "Venus", "Jupiter"],
//     "answer": "Mars"
//   },
//   {
//     "question": "What is the tallest mountain in the world?",
//     "options": ["K2", "Mount Everest", "Kilimanjaro", "Mount Fuji"],
//     "answer": "Mount Everest"
//   },
//   {
//     "question": "What is the largest ocean on Earth?",
//     "options": [
//       "Atlantic Ocean",
//       "Indian Ocean",
//       "Arctic Ocean",
//       "Pacific Ocean"
//     ],
//     "answer": "Pacific Ocean"
//   },
//   {
//     "question": "What is the largest mammal in the world?",
//     "options": ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
//     "answer": "Blue Whale"
//   },
//   {
//     "question": "Which country is home to the kangaroo?",
//     "options": ["New Zealand", "South Africa", "Australia", "Canada"],
//     "answer": "Australia"
//   },
//   {
//     "question": "Which chemical element has the symbol 'O'?",
//     "options": ["Oxygen", "Osmium", "Oganesson", "Oxalate"],
//     "answer": "Oxygen"
//   },
//   {
//     "question": "What is the capital of Australia?",
//     "options": ["Sydney", "Melbourne", "Perth", "Canberra"],
//     "answer": "Canberra"
//   },
//   {
//     "question": "Who wrote the novel 'Moby-Dick'?",
//     "options": [
//       "Herman Melville",
//       "Mark Twain",
//       "Ernest Hemingway",
//       "Charles Dickens"
//     ],
//     "answer": "Herman Melville"
//   },
// }

