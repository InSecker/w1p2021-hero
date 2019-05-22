class ChapterService {
  constructor() {
    this.chapter = [];
    this.i = 0;
  }
  addChapter(chapter) {
    this.chapter.push(chapter);
  }
  nextChapter() {
    this.i++;
  }
  previousChapter() {
    this.i--;
  }
  render() {
    return this.chapter[this.i];
  }
  length() {
    return this.chapter.length;
  }
}

module.exports = new ChapterService();
