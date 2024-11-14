const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');

exports.createOrder = async (req, res, nect) => {

    try {
        //Calculate the total amount
        let cartItems = req.body;
        let amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        let status = "pending";

        const order = new OrderModel({
            cartItems,
            amount,
            status,
        })

        //Update the product stock quantity
        cartItems.forEach(async (item) => {

            const product = await ProductModel.findById(item.product._id);
            product.stock = product.stock - item.qty;
            await product.save();
        });

        await order.save();
        res.json({
            success: true,
            message: 'Order created successfully',
            order
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: 'Order creation failed: ' + error.message
        })
    }


}


