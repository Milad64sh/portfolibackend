const Article = require('../models/article');

exports.getAddArticle = (req, res, next) => {
  res.render('edit-article', {
    pageTitle: 'Add Article',
    path: '/admin/add-article',
    editing: false,
  });
};
exports.getEditArticle = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const artId = req.params.articleId;
  Article.findById(artId, (article) => {
    if (!article) {
      return res.redirect('/');
    }
    res.render('edit-article', {
      pageTitle: 'Edit Article',
      path: '/admin/edit-article',
      editing: editMode,
      article: article,
    });
  });
};

exports.postAddArticle = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  const date = req.body.date;
  const article = new Article(title, description, author, date);
  article.save();
  res.redirect('/');
};

exports.getArticles = (req, res, next) => {
  Article.fetchAll((articles) => {
    res.render('article', {
      pageTitle: 'article',
      articles: articles,
      path: '/articles',
    });
  });
};

exports.getArticle = (req, res, next) => {
  const articleId = req.params.articleId;
  Article.findById(articleId, (article) => {
    res.render('article-detail', {
      article: article,
      pageTitle: article.title,
      path: '/articles',
    });
  });
};
