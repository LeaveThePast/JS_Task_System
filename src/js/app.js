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
});
