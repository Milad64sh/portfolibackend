const path = require('path');
const express = require('express');
const articleControllers = require('../controllers/article');

const router = express.Router();

router.get('/', articleControllers.getArticles);
router.get('/articles/:articleId', articleControllers.getArticle);

module.exports = router;
