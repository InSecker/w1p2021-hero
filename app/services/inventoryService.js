class InventoryService {
  constructor() {
    this.items = [];
  }
  addItem(item) {
    this.items.push(item);
  }
  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
  content() {
    return this.items;
  }
}

module.exports = new InventoryService();
