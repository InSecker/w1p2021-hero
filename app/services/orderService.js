class OrderService {
  constructor() {
    this.order = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  value() {
    if (this.order.length <= 8) {
      return Math.min(...this.order);
    }
  }
  splice() {
    this.order.splice(this.order.indexOf(Math.min(...this.order)), 1);
  }
  push(value) {
    this.order.push(value);
  }
  length() {
    return this.order.length;
  }
}

module.exports = new OrderService();
