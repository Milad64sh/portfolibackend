const path = require('path');
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// GET req
router.get('/add-article', articleController.getAddArticle);
router.get('/edit-article/:articleId', articleController.getEditArticle);

// POST req
router.post('/add-article', articleController.postAddArticle);
router.post('/edit-article', articleController.postEditArticle);
router.post('/delete-article', articleController.postDeleteArticle);

module.exports = router;
