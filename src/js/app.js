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

      newCardFormSubmitElement.addEventListener("click", () => {
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

  // Drag & Drop - пожилой
  // let draggedElement;
  // const CardContainersAndCardsElements =
  //   document.querySelectorAll(".cardContainer");
  // CardContainersAndCardsElements.forEach((container) => {
  //   container.addEventListener("mousedown", (e) => {
  //     e.preventDefault();
  //     draggedElement = e.target;
  //     draggedElement.classList.add("dragged");
  //     document.documentElement.addEventListener("mouseup", () =>
  //       onMouseUp(container)
  //     );
  //     document.documentElement.addEventListener("mouseover", onMouseOver);
  //   });
  // });

  // const onMouseUp = (container) => (e) => {
  //   draggedElement.classList.remove("dragged");
  //   draggedElement = undefined;

  //   document.documentElement.removeEventListener("mouseup", onMouseUp);
  //   document.documentElement.removeEventListener("mouseover", onMouseOver);
  //   const draggedElementUp = e.target;
  //   container.insertBefore(draggedElement, draggedElementUp);
  // };

  // const onMouseOver = (e) => {
  //   draggedElement.style.top = e.clientY + "px";
  //   draggedElement.style.left = e.clientX + "px";
  // };

  // Drag & Drop - современный
  let draggedElement;
  const cardContainers = document.querySelectorAll(".cardContainer");
  cardContainers.forEach((container) => {
    container.addEventListener("dragstart", (e) => {
      draggedElement = e.target;
      e.target.classList.add("dragged");
    });

    container.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragged");
    });

    container.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      container.insertBefore(draggedElement, e.target);
    });
  });
});
