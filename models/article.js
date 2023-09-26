const db = require('../util/database');

module.exports = class Article {
  constructor(id, title, description, author, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.date = date;
  }
  save() {
    return db.execute(
      'INSERT INTO articles (title, description, author, date) VALUES (?, ?, ?, ?)',
      [this.title, this.description, this.author, this.date]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM articles');
  }
  static findById(id) {}
};
