const path = require('path');
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// GET req
router.get('/add-article', articleController.getAddArticle);

// POST req
router.post('/add-article', articleController.postAddArticle);
router.get('/edit-article/:articleId', articleController.getEditArticle);

router.post('/edit-article', articleController.postEditArticle);

module.exports = router;
