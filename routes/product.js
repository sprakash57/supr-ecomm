const router = require('express').Router();
const multer = require('multer');
const authService = require('../authService');
const ProductController = require('../controllers/product');

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

router.get('/', authService, ProductController.getAllProducts);
router.post('/', authService, upload.single('image'), ProductController.createProduct);
router.get('/:id', authService, ProductController.getProduct);
router.patch('/:id', authService, ProductController.updateProduct);
router.delete('/:id', authService, ProductController.deleteProduct);

module.exports = router;