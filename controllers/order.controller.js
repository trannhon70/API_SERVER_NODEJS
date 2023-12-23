const orderModel = require("../models/order.model");

const createOrder = async (req, res, next) => {
    try {
     
        const result = await orderModel.create({ ...req.body });
        return res.status(200).json({
          result,
          status: 1,
          message: "create order success!",
        });
    
    } catch (error) {
      console.log(error);
      return res.status(404).json();
    }
  };

  module.exports = {
    createOrder,
   
  };
  