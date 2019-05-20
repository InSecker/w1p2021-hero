class OrderService {
  constructor() {
    this.order = 1;
  }
  
  increment() {
    this.order++;
  }

  decrement() {
    this.order--;
  }

  value() {
    return this.order;
  }
}

module.exports = new OrderService();
