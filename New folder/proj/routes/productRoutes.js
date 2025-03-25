const express = require('express');
const { addProduct, getProducts, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/admin/product', addProduct);
router.get('/admin/products', getProducts);
router.delete('/admin/product/:id', deleteProduct);
router.get('/shop', getProducts);

module.exports = router;
