const productModel = require("../models/product.model");
const createProduct = async (req, res, next) => {
  try {
    const name = req.body.name;
    const check = await productModel.findOne({ name });
    if (!check) {
      const result = await productModel.create({ ...req.body });
      return res.status(200).json({
        result,
        status: 1,
        message: "create product success!",
      });
    }
    return res.status(400).json({
      status: 0,
      message: "Check name already exists!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json();
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const result = await productModel.findByIdAndUpdate(id, { ...req.body });
      return res.status(200).json({
        result,
        status: 1,
        message: "Update product success!",
      });
    }
    return res.status(400).json({
      status: 0,
      message: "Id not found!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json();
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const result = await productModel.findByIdAndDelete(id);
      return res.status(200).json({
        result,
        status: 1,
        message: "Delete product success!",
      });
    }
    return res.status(400).json({
      status: 0,
      message: "Id not found!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json();
  }
};

const getpagingProduct = async (req, res, next) => {
  try {
    const pageIndex = req.query.pageIndex || 1;
    const pageSize = req.query.pageSize || 10;
    const search = req.query.search || "";
    let searchObj = {};
    if (search) {
      searchObj.name = { $regex: ".*" + search + ".*" };
    }

    const data = await productModel
      .find(searchObj)
      .skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize))
      .sort({ createdAt: "desc" });
    if (data.length == 0) {
      pageIndex = 1;
      data = await productModel
        .find(searchObj)
        .skip(pageSize * pageIndex - pageSize)
        .limit(parseInt(pageSize))
        .sort({ createdAt: "desc" });
    }
    const count = await productModel.find(searchObj).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({
      data,
      pageIndex,
      pageSize,
      totalPages,
      count,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json();
  }
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getpagingProduct,
};
