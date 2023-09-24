const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'article.json'
);

const getArticlesFromFile = (cb) => {
  const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'article.json'
  );
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Article {
  constructor(id, title, description, author, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.date = date;
  }
  save() {
    getArticlesFromFile((articles) => {
      if (this.id) {
        const existingArticleIndex = articles.findIndex(
          (article) => article.id === this.id
        );
        const updatedArticles = [...articles];
        updatedArticles[existingArticleIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedArticles), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        articles.push(this);
        fs.writeFile(p, JSON.stringify(articles), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getArticlesFromFile(cb);
  }
  static findById(id, cb) {
    getArticlesFromFile((articles) => {
      const article = articles.find((article) => article.id === id);
      cb(article);
    });
  }
};
