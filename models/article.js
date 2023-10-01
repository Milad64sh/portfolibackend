const getDb = require('../util/database').getDb;

class Article {
  constructor(title, author, date) {
    this.title = title;
    this.author = author;
    this.date = date;
  }
  save() {
    const db = getDb();
    db.collection('articles')
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}

module.exports = Article;
