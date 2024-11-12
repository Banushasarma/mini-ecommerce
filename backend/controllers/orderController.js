const OrderModel = require('../models/orderModel');

exports.createOrder = async (req, res, nect) => {

    try {
        //Calculate the total amount
        let cartItems = req.body.cartItems;
        let amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
        let status = "pending";

        const order = new OrderModel({
            cartItems,
            amount,
            status,
        })
        await order.save();
        res.json({
            success: true,
            message: 'Order created successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: 'Order creation failed: ' + error.message
        })
    }


}


