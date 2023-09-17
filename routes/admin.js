const path = require('path');
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// GET req
router.get('/add-article', articleController.getAddArticle);

// POST req
router.post('/add-article', articleController.postAddArticle);

module.exports = router;
