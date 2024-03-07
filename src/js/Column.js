import Card from "./Card";

class Column {
  constructor(name, cardsContainerId) {
    this.name = name;
    this.cardsContainer = document.getElementById(cardsContainerId);
    this.cards = [];
  }

  addCard(text, board) {
    const card = new Card(text);
    this.cards.push(card);
    this.renderCards(board);
  }

  removeCard(index, board) {
    this.renderCards(board);
  }

  renderCards(board) {
    while (this.cardsContainer.firstChild) {
      this.cardsContainer.removeChild(this.cardsContainer.firstChild);
    }
    this.cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.textContent = card.text;
      const removeButton = document.createElement("span");
      removeButton.textContent = "X";
      removeButton.classList.add("closeBtn");
      removeButton.addEventListener("click", (e) => this.removeCard(e, board));
      cardElement.appendChild(removeButton);
      this.cardsContainer.appendChild(cardElement);
    });
    board.saveToLocalStorage();
  }
}

export default Column;
