const { fileLoader } = require('ejs');
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
  constructor(t) {
    this.title = t;
  }
  save() {
    getArticlesFromFile((articles) => {
      articles.push(this);
      fs.writeFile(p, JSON.stringify(articles), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getArticlesFromFile(cb);
  }
};
