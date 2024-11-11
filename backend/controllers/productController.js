const ProductModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    const products = await ProductModel.find({});
    res.json({
        succss: true,
        products
    });

}

exports.getSingleProduct = (req, res, next) => {
    res.json({
        succss: true,
        message: 'Get Single Product successfully',
        product:
            { id: 1, name: 'Product 1', price: 10 }
    });

}