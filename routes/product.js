const router = require('express').Router();
const multer = require('multer');
const { create, productById, read, deleteProduct, updateProduct } = require('../controllers/product');
const { requireLogin, isAuthUser, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.get('/:productId', read);
router.post('/create/:userId', requireLogin, isAuthUser, isAdmin, upload.single('image'), create);
router.delete('/:productId/:userId', requireLogin, isAuthUser, isAdmin, deleteProduct);
router.put('/:productId/:userId', requireLogin, isAuthUser, isAdmin, updateProduct)

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;