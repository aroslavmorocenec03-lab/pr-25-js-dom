"use strict";

// Посилання на елементи сторінки отримано саме через getElementById().
const firstInput = document.getElementById("value1");
const secondInput = document.getElementById("value2");
const resultElement = document.getElementById("result");
const historyElement = document.getElementById("history");
const messageElement = document.getElementById("message");
const emptyHistoryElement = document.getElementById("empty-history");
const historyCountElement = document.getElementById("history-count");

// Звичайний script робить цю функцію доступною для onclick="calculate()".
function calculate() {
  const firstText = firstInput.value.trim();
  const secondText = secondInput.value.trim();

  // value текстового поля — рядок; Number() забезпечує числове додавання.
  const firstNumber = Number(firstText);
  const secondNumber = Number(secondText);
  const firstInvalid = firstText === "" || !Number.isFinite(firstNumber);
  const secondInvalid = secondText === "" || !Number.isFinite(secondNumber);

  firstInput.setAttribute("aria-invalid", String(firstInvalid));
  secondInput.setAttribute("aria-invalid", String(secondInvalid));
  if (firstInvalid || secondInvalid) {
    showError("Введіть коректне число в кожне поле. Для дробів використовуйте крапку.");
    (firstInvalid ? firstInput : secondInput).focus();
    return;
  }

  const sum = firstNumber + secondNumber;
  if (!Number.isFinite(sum)) {
    showError("Сума завелика для обчислення. Введіть менші числа.");
    return;
  }

  messageElement.hidden = true;
  messageElement.textContent = "";
  resultElement.textContent = String(sum);

  // Для кожного обчислення створюється НОВИЙ li. Старі записи залишаються.
  const historyItem = document.createElement("li");
  historyItem.textContent = firstNumber + " + " + secondNumber + " = " + sum;
  historyElement.appendChild(historyItem);

  emptyHistoryElement.hidden = true;
  historyCountElement.textContent = String(historyElement.children.length);
}

function showError(message) {
  resultElement.textContent = "—";
  messageElement.textContent = message;
  messageElement.hidden = false;
}

for (const input of [firstInput, secondInput]) {
  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", "false");
    messageElement.hidden = true;
  });
  // Додатковий зручний спосіб запуску; основний виклик — onclick кнопки.
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") calculate();
  });
}
