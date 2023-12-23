const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId:{
            type : mongoose.Types.ObjectId,  ref: 'User'
        },
        productId:{
            type : mongoose.Types.ObjectId,  ref: 'Product'
        },
        brandId: {
            type : mongoose.Types.ObjectId,  ref: 'Brand'
        },
        quantity: {
            type: Number,
            default: 0
        },
        status:{
            type: String,
            enum: ['pending', 'shipped', 'delivered']
            // 'đang chờ xử lý', 'đã vận chuyển', 'đã giao']
        }
    },
    {
        timestamps: true
    }
)


orderSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
      
    },
  });

module.exports = mongoose.model("Order", orderSchema)