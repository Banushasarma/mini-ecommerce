const ProductModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    const products = await ProductModel.find({});
    res.json({
        succss: true,
        products
    });

}

exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        res.json({
            succss: true,
            message: 'Get Single Product successfully',
            product
        });
    } catch (error) {
        res.status(404).json({
            succss: false,
            message: 'Unable to find Single Product',
        });
    }


}