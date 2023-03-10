const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String
        },
        role: {
            type: String
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
      delete ret.password;
    },
  });

module.exports = mongoose.model("User", userSchema)