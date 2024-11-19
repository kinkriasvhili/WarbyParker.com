import { loadHeader } from "./loadheader.js";
import { exams } from "../../data/exams.js";
import { loadProductsFetch } from "../../data/products.js";
let infoValues = [];

let examIndex = 0;
let qustionNumber = document.querySelector(".qustion-number"); // Kept as per original
let quizzQustion = document.querySelector(".quizz-qustion"); // Kept as per original
let quizAnswer = document.querySelector(".quizz-answers"); // Kept as per original
let previousBtn = document.querySelector(".previous-btn");

loadExam(exams[0]);
function loadExam(exam) {
  quizzQustion.innerHTML = exam.title; // Kept as per original
  renderAnswers(exam);
}
function renderAnswers(exam) {
  let answersHtml = ``;
  exam.answers.forEach((answer) => {
    if (exam.title !== "Select a day and time") {
      answersHtml += `
        <div class="quizAnswerContainer">
          <p>${answer.title}</p>
          ${answer.image ? `<img src="${answer.image}" alt="" />` : ""}
          ${
            answer.priceInCents
              ? `<p>Price: $${(answer.priceInCents / 100).toFixed(2)}</p>`
              : ""
          }
        </div>
      `;
    } else {
      answersHtml += `
        <div class="quizAnswerContainer">
          <p>${answer}</p>
        </div>
      `;
    }
  });

  quizAnswer.innerHTML = answersHtml;
}
function loadInputs() {
  let answersHtml = `
  <div class="inputs-container">
    <input type="text" placeholder="Write Down Your Name" id="name">
    <input type="text" placeholder="Write Down Your Address" id="address">
    <input type="email" placeholder="Write Down Your Email" id="email">
    <input type="number" placeholder="Write Down Your Mobile Phone" id="phone">
    <button class="quizAnswerContainer inputsNext" disabled>Next</button>
  </div>
`;

  quizAnswer.innerHTML = answersHtml;

  // JavaScript logic to disable/enable the button
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const nextButton = document.querySelector(".quizAnswerContainer");
  const addInfosButton = document.querySelector(".inputsNext");
  // Function to check if all inputs are filled

  function checkInputs() {
    if (
      nameInput.value &&
      addressInput.value &&
      emailInput.value &&
      phoneInput.value
    ) {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
      // Disable the button
    }
  }
  if (addInfosButton) {
    addInfosButton.addEventListener("click", () => {
      console.log("me");

      infoValues.push({
        name: nameInput.value,
        address: addressInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
      });
      saveInfo(infoValues);
    });
  }
  // Attach event listeners to all inputs to check on input change

  [nameInput, addressInput, emailInput, phoneInput].forEach((input) => {
    input.addEventListener("input", checkInputs);
  });
}
function saveInfo(info) {
  localStorage.setItem("info", JSON.stringify(info));
}
function loadCalendar() {
  let answersHtml = `
  <div class="calendar-container">
    <div class="calendar">
      <div class="month">
        <button class="prev">&lt;</button>
        <div class="month-name"></div>
        <button class="next">&gt;</button>
      </div>
      <div class="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div class="days"></div>
    </div>
    <button class="quizAnswerContainer quizAnswerContainerCalendar" disabled>Next</button>
  </div>
  `;

  quizAnswer.innerHTML = answersHtml;
  const quizAnswerContainerCalendar = document.querySelector(
    ".quizAnswerContainerCalendar"
  );
  if (quizAnswerContainerCalendar) {
    quizAnswerContainerCalendar.addEventListener("click", () => {
      dateOfClientExam();
    });
  }
  const monthNameElement = document.querySelector(".month-name");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const daysContainer = document.querySelector(".days");
  const nextButtonElement = document.querySelector(
    ".quizAnswerContainerCalendar"
  );

  let selectedDate = null;
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Disable the Next button initially
  nextButtonElement.disabled = true;

  function renderCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
    let days = "";

    monthNameElement.textContent = new Date(year, month).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );

    daysContainer.innerHTML = "";

    // Days from the previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
      days += `<div class="disabled">${lastDateOfPrevMonth - i + 1}</div>`;
    }

    // Current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      days += `<div>${i}</div>`;
    }

    daysContainer.innerHTML = days;

    // Attach event listeners for date selection
    document.querySelectorAll(".days div").forEach((day) => {
      if (!day.classList.contains("disabled")) {
        day.addEventListener("click", () => {
          document
            .querySelectorAll(".days div")
            .forEach((d) => d.classList.remove("selected"));
          day.classList.add("selected");
          selectedDate = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day.textContent).padStart(2, "0")}`;
          checkIfDateSelected();
        });
      }
    });
  }

  function checkIfDateSelected() {
    if (selectedDate) {
      nextButtonElement.disabled = false;
      infoValues.push(selectedDate);
      saveInfo(infoValues);
    } else {
      nextButtonElement.disabled = true;
    }
  }

  prevButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
}
function dateOfClientExam() {
  document.querySelector(".quizz-quantity-container").innerHTML = "";

  document.querySelector(".previous-btn").classList.add("priviousButtonNone");
  document.querySelector(".previous-btn").style = "";
  console.log(infoValues);
  quizzQustion.innerHTML = "";
  quizAnswer.innerHTML = "";

  // Create HTML structure with the data
  const htmlContent = `
  <div class="info-card">
    <h2>Date of your Exam</h2>
    <p><strong>Name:</strong> ${infoValues[0].name}</p>
    <p><strong>Address:</strong> ${infoValues[0].address}</p>
    <p><strong>Email:</strong> ${infoValues[0].email}</p>
    <p><strong>Phone:</strong> ${infoValues[0].phone}</p>
    <p><strong>Date:</strong> ${infoValues[1]}</p>
  </div>
`;

  // Insert the HTML into the page
  quizAnswer.innerHTML = htmlContent;
}
function nextQuestion() {
  if (examIndex < exams.length - 1) {
    examIndex++;
    qustionNumber.innerHTML = examIndex + 1;
    if (exams[examIndex].title == "input") {
      loadInputs();
    } else if (exams[examIndex].title == "Select a day and time") {
      loadCalendar();
    } else {
      loadExam(exams[examIndex]);
    }
  }
}

function previousQuestion() {
  if (examIndex > 0) {
    examIndex--;
    qustionNumber.innerHTML -= 1;
    if (exams[examIndex].title == "input") {
      loadInputs();
    } else {
      loadExam(exams[examIndex]);
    }
  }
}

function management() {
  document.querySelectorAll(".quiz-manager").forEach((manager) => {
    manager.addEventListener("click", (event) => {
      if (event.target.innerText == "Previous") {
        previousQuestion();
      }
    });
  });
}

quizAnswer.addEventListener("click", (event) => {
  if (event.target.closest(".quizAnswerContainer")) {
    nextQuestion();
  }
});

async function loadQuiz() {
  await loadProductsFetch();
  management();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadQuiz();
});
