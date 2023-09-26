const Article = require('../models/article');

exports.getAddArticle = (req, res, next) => {
  res.render('edit-article', {
    pageTitle: 'Add Article',
    path: '/admin/add-article',
    editing: false,
  });
};
exports.postAddArticle = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const date = req.body.date;
  req.user
    .createArticle({
      title: title,
      description: description,
      author: author,
      date: date,
    })
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getEditArticle = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const artId = req.params.articleId;
  Article.findByPk(artId)
    .then((article) => {
      if (!article) {
        return res.redirect('/');
      }
      res.render('edit-article', {
        pageTitle: 'Edit Article',
        path: '/admin/edit-article',
        editing: editMode,
        article: article,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditArticle = (req, res, next) => {
  const artId = req.body.articleId;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;
  const updatedAuthor = req.body.author;
  const updatedDate = req.body.date;
  Article.findByPk(artId)
    .then((article) => {
      article.title = updatedTitle;
      article.description = updatedDesc;
      article.author = updatedAuthor;
      article.date = updatedDate;
      return article.save();
    })
    .then((result) => {
      res.redirect('/');
      console.log('UPDATED ARTICLE');
    })
    .catch((err) => console.log(err));
};

exports.getArticles = (req, res, next) => {
  req.user
    .getArticles()
    .then((articles) => {
      res.render('article', {
        pageTitle: 'article',
        articles: articles,
        path: '/articles',
      });
    })
    .catch((err) => console.log(err));
};

exports.getArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findByPk(articleId)
    .then((article) => {
      res.render('article-detail', {
        article: article,
        pageTitle: article.title,
        path: '/articles',
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteArticle = (req, res, next) => {
  const artId = req.body.articleId;
  Article.findByPk(artId)
    .then((article) => {
      return article.destroy();
    })
    .then((result) => {
      console.log(result);
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
