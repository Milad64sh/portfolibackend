const Article = require('../models/article');

exports.getAddArticle = (req, res, next) => {
  res.render('add-article', {
    pageTitle: 'Add Article',
    path: '/admin/add-article',
  });
};

exports.postAddArticle = (req, res, next) => {
  const article = new Article(req.body.title, req.body.content);
  article.save();
  res.redirect('/');
};

exports.getArticles = (req, res, next) => {
  Article.fetchAll((articles) => {
    res.render('article', {
      pageTitle: 'article',
      articles: articles,
      path: '/',
      hasArticles: articles.length > 0,
    });
  });
};
