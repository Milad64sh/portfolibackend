const Article = require('../models/article');

exports.getAddArticle = (req, res, next) => {
  res.render('add-article', {
    pageTitle: 'Add Article',
    path: '/admin/add-article',
  });
};

exports.postAddArticle = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;

  const article = new Article(title, author, description);
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
