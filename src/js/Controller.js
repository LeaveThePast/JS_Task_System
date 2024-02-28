import Card from "./Card";
// Класс для управления всей логикой. Слушает интерфейс и реагирует на него
class Controller {
  constructor(container) {
    this.container = container;
    // Card
    this.draggingElement = null;
    // Card.proection
    this.draggingProection = null;
  }

  setDraggingElement(node) {
    this.draggingElement = new Card(node);
  }

  replaceDragging() {
    this.draggingProection.replaceWith(this.draggingElement.element);
    this.draggingElement.element.style = this.draggingElement.styles;
  }

  clear() {
    this.draggingElement = null;
    this.draggingProection = null;
  }

  onMouseDown = (e) => {
    const target = e.target;

    if (target.classList.contains("card")) {
      this.shiftX = e.offsetX;
      this.shiftY = e.offsetY;
      this.setDraggingElement(target);
      this.draggingElement.style = `
		 		left: ${e.pageX - this.shiftX}px;
		 		top: ${e.pageY - this.shiftY}px;
			`;
      this.proectionAct(e);
    }
  };

  onMouseUp = () => {
    if (this.draggingElement) {
      this.replaceDragging();
      this.clear();
    }
  };

  // Рассчёт позиции вставки проекции и вставка или удаление
  proectionAct(e) {
    const target = e.target;
    const element = this.draggingElement;
    const proection = this.draggingProection;
    if (
      target.classList.contains("draggable") &&
      !target.classList.contains("proection")
    ) {
      const { y, height } = target.getBoundingClientRect();
      const appendPosition =
        y + height / 2 > e.clientY ? "beforebegin" : "afterend";

      if (!proection) {
        this.draggingProection = element.proection;
      } else {
        proection.remove();
        target.insertAdjacentElement(appendPosition, proection);
      }
    }
  }

  //Стрелочные функции в качестве метода, чтобы не терять контект при передаче метода в addEventListener. Иначе нужно биндить контекст к объекту класса.
  onMouseMove = (e) => {
    if (this.draggingElement) {
      const { pageX, pageY } = e;
      const element = this.draggingElement;
      const { width, height } = this.draggingElement.styles;
      element.styles = `
				position: absolute;
		 		left: ${pageX - this.shiftX}px;
		 		top: ${pageY - this.shiftY}px;
		 		pointer-events: none;
				width: ${width};
				height: ${height};
			`;
      this.proectionAct(e);
    }
  };
}

export default Controller;
