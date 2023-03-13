const brandModel = require("../models/brand.model");


const createBrand  =async (req, res, next) => {
    try {
        const name = req.body.name
        const check = await brandModel.findOne({name: name.trim()})
        if(!check || check === null){
            const result = await brandModel.create({...req.body})
            return res.status(200).json({
                result,
                status: 1,
                message: "create brand name success!"
            })
        }
        return res.status(400).json({
            status: 0,
            message: "brand name check already exits!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json()
    }
}
module.exports = {
    createBrand
}