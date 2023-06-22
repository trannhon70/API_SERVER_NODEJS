const roleModel = require("../models/role.model");


const createRole = async(req, res, next) => {
    try {
      const result = await roleModel.create({...req.body})
      res.status(200).json({ status :1, data : result });
    } catch (error) {
      console.log(error);
      return res.status(500).json();
    }
  };



module.exports = {
    createRole
}