const express = require('express');
const router = express.Router();
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const publicRouter = require('./publicRouter');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication')
const { authorizationAdmin } = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');


router.get('/', (req, res) => {
    res.send('HOME')
})

router.post('/login', UserController.login)
router.use('/publics', publicRouter )

router.use(authentication)

router.post('/register', authorizationAdmin, UserController.addUser)


router.use('/products', productRouter)
router.use('/categories', categoryRouter)

router.use(errorHandler)

module.exports = router