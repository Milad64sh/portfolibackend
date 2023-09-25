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
  const article = new Article(null, title, description, author, date);
  article
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
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

exports.postEditArticle = (req, res, next) => {
  const artId = req.body.articleId;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.description;
  const updatedAuthor = req.body.author;
  const updatedDate = req.body.date;
  const updatedArticle = new Article(
    artId,
    updatedTitle,
    updatedDesc,
    updatedAuthor,
    updatedDate
  );
  updatedArticle.save();
  res.redirect('/');
};

exports.getArticles = (req, res, next) => {
  Article.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('article', {
        pageTitle: 'article',
        articles: rows,
        path: '/articles',
      });
    })
    .catch((err) => {
      console.log(err);
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

exports.postDeleteArticle = (req, res, next) => {
  const artId = req.body.articleId;
  Article.deleteById(artId);
  res.redirect('/');
};
