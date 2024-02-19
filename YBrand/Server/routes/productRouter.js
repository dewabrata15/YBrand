const express = require('express');
const ProductsController = require('../controllers/ProductController');
const router = express.Router();
const { authorizationUpdateStaff } = require('../middlewares/authorization')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', ProductsController.productList)
router.post('/', ProductsController.createProduct)
router.get('/:id', ProductsController.getProductById)
router.put('/:id', authorizationUpdateStaff, ProductsController.updateProductById)
router.delete('/:id', authorizationUpdateStaff, ProductsController.deleteProductById)
router.patch('/:id/image-url', upload.single('imgUrl'), ProductsController.uploadProductImage)



module.exports = router