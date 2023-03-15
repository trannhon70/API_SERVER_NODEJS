const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique: true,
            required: true,
        },
        brand:{
            type : mongoose.Types.ObjectId
        },
        price: {
            type: Number,
            required: true
        },
        content: {
            type: String,
        },
        image:{
            type: String,
            
        }
        
    },
    {
        timestamps: true
    }
)


productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
      
    },
  });

module.exports = mongoose.model("Product", productSchema)