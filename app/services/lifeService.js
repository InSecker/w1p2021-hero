class LifeService {
  constructor() {
    this.life = 100;
  }
  loose() {
    this.life -= 50;
  }
  value() {
    return this.life;
  }
}

module.exports = new LifeService();
