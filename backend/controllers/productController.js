const ProductModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
    let query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'  // case-insensitive search
        }
    } : {}

    const products = await ProductModel.find(query);
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