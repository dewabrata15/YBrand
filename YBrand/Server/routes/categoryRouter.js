const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', CategoryController.listCategory)
router.post('/', CategoryController.createCategory)
router.get('/:id', CategoryController.getCategoryById)
router.put('/:id', CategoryController.updateCategoryById)



module.exports = router