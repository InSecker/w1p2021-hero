class InventoryService {
  constructor() {
    this.items = [];
    localStorage.items = JSON.stringify([]);
  }
  addItem(item) {
    this.items.push(item);
    localStorage.items = JSON.stringify(this.items);
  }
  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
    localStorage.items = JSON.stringify(this.items);
  }
  content() {
    return JSON.parse(localStorage.items);
  }
}

module.exports = new InventoryService();
