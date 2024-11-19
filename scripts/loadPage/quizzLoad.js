import { loadHeader } from "./loadheader.js";
import { loadFooter } from "./loadfooter.js";
import { quizes, addAnswer, removeAnswer } from "../../data/qustions.js";
import { loadProductsFetch } from "../../data/products.js";

let managerIndex = 0;
let qustionNumber = document.querySelector(".qustion-number");
let quizzQustion = document.querySelector(".quizz-qustion");
let quizAnswer = document.querySelector(".quizz-answers");
let previousBtn = document.querySelector(".previous-btn");

function answerHml(quiz) {
  let quizHtml = ``;
  quiz.answers.forEach((answer) => {
    if (quiz.qustionId != 5) {
      quizHtml += `
        <div class="quizAnswerContainer" answerId="${answer.answerId}">
          <p>${answer.name}</p>
          <img src="${answer.image}" alt="" />
        </div>
        `;
    } else {
      quizHtml += `
        <div class="quizAnswerContainer" answerId="${answer.answerId}">
          <p>${answer.name}</p>
          <div style="background-color: ${answer.name.toLowerCase()}" class="answerOfColors"></div>
        </div>
        `;
    }
  });
  quizAnswer.innerHTML = quizHtml;
}

function nextQustion() {
  for (let i = 0; i < quizes.length; i++) {
    let quiz = quizes[i];
    if (Number(quiz.qustionId) == Number(qustionNumber.innerHTML) + 1) {
      qustionNumber.innerHTML = quiz.qustionId;
      quizzQustion.innerHTML = quiz.qustion;
      answerHml(quiz);
      attachAnswerClickEvent();
      break;
    }
  }
}
function previousQustion() {
  quizes.forEach((quiz, index) => {
    if (Number(quiz.qustionId) == Number(qustionNumber.innerHTML) - 1) {
      qustionNumber.innerHTML = quiz.qustionId;
      quizzQustion.innerHTML = quiz.qustion;
      answerHml(quiz);
      attachAnswerClickEvent();
    }
  });
}

function managment() {
  document.querySelectorAll(".quiz-manager").forEach((manager) => {
    manager.addEventListener("click", (event) => {
      if (event.target.innerHTML == "Skip") {
        addAnswer("noAnswer");
        nextQustion();
      } else if (event.target.innerText == "Previous") {
        answerId = previousBtn.getAttribute("unanswerId");
        removeAnswer(answerId);
        previousQustion();
      }
    });
  });
  attachAnswerClickEvent();
}
function attachAnswerClickEvent() {
  document.querySelectorAll(".quizAnswerContainer").forEach((clickOnAnswer) => {
    clickOnAnswer.addEventListener("click", () => {
      let answerId = clickOnAnswer.getAttribute("answerid");
      previousBtn.setAttribute("unanswerId", answerId);
      addAnswer(answerId);
      nextQustion();
    });
  });
}

async function loadQuiz() {
  await loadProductsFetch();
  managment();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadQuiz();
});
