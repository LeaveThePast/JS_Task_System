import Column from "./Column";
import Card from "./Card";

class Board {
  constructor() {
    this.columns = [
      new Column("To Do", "toDoCards"),
      new Column("In Progress", "progressCards"),
      new Column("Done", "doneCards"),
    ];
  }

  saveToLocalStorage() {
    const boardState = JSON.stringify(
      this.columns.map((column) => ({
        name: column.name,
        cards: column.cards.map((card) => ({ text: card.text })),
      }))
    );
    localStorage.setItem("board", boardState);
  }

  loadFromLocalStorage(board) {
    const boardState = localStorage.getItem("board");
    if (boardState) {
      const parsedState = JSON.parse(boardState);
      this.columns.forEach((column, index) => {
        if (parsedState[index] && parsedState[index].cards) {
          column.cards = parsedState[index].cards.map(
            (card) => new Card(card.text)
          );
        }
      });
      this.renderBoard(board);
    }
  }

  renderBoard(board) {
    this.columns.forEach((column) => column.renderCards(board));
  }
}

export default Board;
