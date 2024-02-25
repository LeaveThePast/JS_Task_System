import Board from "./Board";

document.addEventListener("DOMContentLoaded", () => {
  const addCardButtons = document.querySelectorAll(".addCardBtn");

  addCardButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const newCardFormElement = document.querySelector(".newCardContainer");
      const newCardFormSubmitElement =
        newCardFormElement.querySelector(".newCardFormSubmit");
      const newCardFormInputElement =
        newCardFormElement.querySelector(".newCardFormInput");

      newCardFormElement.classList.add("show");

      newCardFormSubmitElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const newCardFormInputElementValue =
          newCardFormInputElement.value.trim();
        if (newCardFormInputElementValue) {
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
  let draggedElement;
  const cardContainers = document.querySelectorAll(".cardContainer");
  cardContainers.forEach((container) => {
    container.addEventListener("dragstart", (e) => {
      draggedElement = e.target.closest(".card");
      draggedElement.classList.add("dragged");
    });

    container.addEventListener("dragend", (e) => {
      draggedElement.classList.remove("dragged");
    });

    container.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      container.insertBefore(draggedElement, e.target.closest(".card"));
    });
  });
});
