class PriorityQueue {
  constructor(maxSize = null) {
    this.items = [];
    this.maxSize = maxSize;
  }

  enqueue(element, priority) {
    const qElement = new QElement(element, priority);
    let contain = false;

    for (let i = 0; i < this.items.length && i < this.maxSize; i++) {
      if (this.items[i].priority > qElement.priority) {
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    if (this.items.length > this.maxSize) {
      this.items = this.items.slice(0, this.maxSize);
      return;
    }

    if (!contain) {
      this.items.push(qElement);
    }
  }

  // Removes element[0] from this.items and returns it.
  dequeue() {
    if (this.isEmpty())
      return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty())
      return "No elements in Queue";
    return this.items[0];
  }

  rear() {
    if (this.isEmpty())
      return "No elements in Queue";
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printPQueue() {
    let arr = [];
    for (let i = 0; i < this.items.length; i++)
      arr.push(this.items[i]);
    return arr;
  }
}

class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

export default PriorityQueue;
