const express = require('express');
const PubController = require('../controllers/PublicController');

const router = express.Router();

router.get('/products', PubController.pubProductList)
router.get('/products/:id', PubController.pubProductById)


module.exports = router

