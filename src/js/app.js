import Board from "./Board";
import Sortable from "sortablejs";

document.addEventListener("DOMContentLoaded", () => {
  const addCardButtons = document.querySelectorAll(".addCardBtn");
  const toDoCardsElement = document.getElementById("toDoCards");
  const progressCardsElement = document.getElementById("progressCards");
  const doneCardsElement = document.getElementById("doneCards");

  addCardButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const newCardFormElement = document.querySelector(".newCardContainer");
      const newCardFormSubmitElement =
        newCardFormElement.querySelector(".newCardFormSubmit");
      const newCardFormInputElement =
        newCardFormElement.querySelector(".newCardFormInput");

      newCardFormElement.classList.add("show");

      newCardFormSubmitElement.addEventListener("click", (e) => {
        const newCardFormInputElementValue =
          newCardFormInputElement.value.trim();
        if (newCardFormInputElementValue) {
          console.log(board.columns[index]);
          board.columns[index].addCard(newCardFormInputElementValue, board);
          newCardFormElement.classList.remove("show");
          newCardFormInputElement.value = "";
        }
      });
    });
  });

  const board = new Board();
  board.loadFromLocalStorage(board);

  // Drag & Drop
  new Sortable(toDoCardsElement, {
    group: "shared",
    animation: 150,
  });

  new Sortable(progressCardsElement, {
    group: "shared",
    animation: 150,
  });
  new Sortable(doneCardsElement, {
    group: "shared",
    animation: 150,
  });
});
