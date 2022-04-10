const questions = [
  {
    question: "What kind of volunteer work are you passionate about?",
    optionA: "Helping in care homes",
    optionB: "Ocean cleanups",
    optionC: "Fighting climate change",
    optionD: "Woman’s rights",
    correctOption: "optionD",
  },

  {
    question: "What kind of hours are you willing to work?",
    optionA: "Less than an hour",
    optionB: "1-3 hours",
    optionC: "5-8 hours",
    optionD: "For as long as it takes",
    correctOption: "optionB",
  },

  {
    question: "What days are you able to work? (Optional not sure)",
    optionA: "Weekdays only",
    optionB: "Weekends only",
    optionC: "Everyday",
    optionD: "About once or twice every month",
    correctOption: "optionD",
  },

  {
    question: "What age group do you want to help?",
    optionA: "24 and under",
    optionB: "25-64",
    optionC: "65-69",
    optionD: "Any",
    correctOption: "optionC",
  },

  {
    question: "What sections of SF do you want volunteer?",
    optionA: "Cental/downtown",
    optionB: "Richmond",
    optionC: "Sunset Upper Market",
    optionD: "Bernal Heights/Bayview",
    correctOption: "optionD",
  },

  {
    question: "What size of groups do you like to work with?",
    optionA: "By yourself",
    optionB: "Less than 10",
    optionC: "10-30",
    optionD: "Any Amount/The more the merrier",
    correctOption: "optionA",
  },

  {
    question: "_____ is the hottest Continent on Earth ?",
    optionA: "Oceania",
    optionB: "Antarctica",
    optionC: "Africa",
    optionD: "North America",
    correctOption: "optionC",
  },

  {
    question: "Which country is the largest in the world ?",
    optionA: "Russia",
    optionB: "Canada",
    optionC: "Africa",
    optionD: "Egypt",
    correctOption: "optionA",
  },

  {
    question: "Which of these numbers is an odd number ?",
    optionA: "Ten",
    optionB: "Twelve",
    optionC: "Eight",
    optionD: "Eleven",
    correctOption: "optionD",
  },

  {
    question: `"You Can't see me" is a popular saying by`,
    optionA: "Eminem",
    optionB: "Bill Gates",
    optionC: "Chris Brown",
    optionD: "John Cena",
    correctOption: "optionD",
  },
];

let shuffledQuestions = []; //empty array to hold shuffled selected questions

function handleQuestions() {
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];

    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

var surfiderFoundation = [
  "optionB",
  "optionD",
  "optionB",
  "optionD",
  "optionB",
  "optionC",
  "You have matched with Surfider Foundation! <br> Please go to the link for more information:",
  "https://sf.surfrider.org/beach-cleanups/"
];

var sfVillage = [
  "optionA",
  "optionB",
  "optionB",
  "optionA",
  "optionC",
  "optionA",
  "You have matched with SF Village! <br> Please go to the link for more information: ",
  "https://www.sfvillage.org/volunteer/"
];

var citizensClimateLobby = [
  "optionC",
  "optionB",
  "optionB",
  "optionD",
  "optionC",
  "optionA",
  "You have matched with Citizens Climate Lobby! <br> Please go to the link for more information:",
  "https://citizensclimatelobby.org/"
];

var sfagainstrape = [
  "optionD",
  "optionC",
  "optionC",
  "optionD",
  "optionA",
  "option B",
  "You have matched with Sf Woman Againist Rape! <br> Please go to the link for more information:",
  "https://sfwar.org/get-involved/volunteer/" 
];

var opportunities = [
  surfiderFoundation,
  sfVillage,
  citizensClimateLobby,
  sfagainstrape,
];

let questionNumber = 1;
let userPreferences = [];
let wrongAttempt = 0;
let indexNumber = 0;

// function for displaying next question in the array to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = questions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true) {
      // document.getElementById(correctOption).style.backgroundColor = "green"
      userPreferences.push(option.value);
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  //delays next question displaying for a second
  setTimeout(() => {
    if (indexNumber <= 5) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color

  if (true) {
    var opindex = 0;
    var highscore = 0;
    var highscorelink = ""; 
    var highscorename = "";
    while (opindex < 4) {
      var opportunity = opportunities[opindex];
      var index = 0;
      var score = 0;
      while (index < 6) {
        if (opportunity[index] == userPreferences[index]) {
          score++;
        }
        index++;
      }
      if (score > highscore) {
        highscore = score;
        highscorename = opportunity[6];
        highscorelink = opportunity[7];
    
      }
      opindex++;
    }
    remark = highscorename;
    remarkColor = "red";
  } else if (userPreferences >= 4 && userPreferences < 7) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (userPreferences >= 6) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }
  const playerGrade = (userPreferences / 6) * 100;

  //data to display to score board
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("links").href = highscorelink;

  // document.getElementById('remarks').style.color = remarkColor
  // document.getElementById('grade-percentage').innerHTML = playerGrade
  // document.getElementById('wrong-answers').innerHTML = wrongAttempt
  // document.getElementById('right-answers').innerHTML = userPreferences
  document.getElementById("score-modal").style.display = "flex";
}

//closes score modal and resets game
function closeScoreModal() {
  questionNumber = 1;
  userPreferences = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
