const router = require('express').Router();
const {
    create,
    productById,
    read,
    deleteProduct,
    updateProduct,
    list,
    listRelated,
    listCategories,
    listBySearch,
    listSearch,
    photo
} = require('../controllers/product');
const { requireLogin, isAuthUser, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireLogin, isAuthUser, isAdmin, create);
router.delete('/product/:productId/:userId', requireLogin, isAuthUser, isAdmin, deleteProduct);
router.put('/product/:productId/:userId', requireLogin, isAuthUser, isAdmin, updateProduct);
router.get('/product/photo/:productId', photo);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;