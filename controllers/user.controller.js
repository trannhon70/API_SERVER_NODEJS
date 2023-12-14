const validateRequest = require("../middleware/validate-request");
const userService = require("../services/user.service");
const Joi = require("joi");
const UserModal = require("../models/user.model")
const refreshToken = require("../models/refreshToken.model")

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function setTokenCookie(res, token) {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}

function authenticate(req, res, next) {
  const { username, password } = req.body;
  const ipAddress = req.ip;
  userService
    .authenticate({ username, password, ipAddress })
    .then(({ refreshToken, status, message, ...user }) => {
      setTokenCookie(res, refreshToken);
      const data = {
        status,
        data: status === 1 ? user : message,
      };

      res.json(data);
    })
    .catch((err) => console.log(err))
    .catch(next);
}

const register = async (req, res , next) => {
  try {
    const check = await UserModal.findOne({username: req.body.username})
    if(!check){
      const result = await UserModal.create({...req.body})
      return res.status(200).json({
        status: 1,
        message: "create success!",
        result
      })
    }
    return res.status(400).json({
      status: 0,
      message: "username check already exist!"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const getByIdUser = async (req, res , next) => {
  try {
    const id = req.user.id
    if(id){
      const result = await UserModal.findById(id)
      return res.status(200).json({
        status: 1,
        message: "get by id success!",
        result
      })
    }
    return res.status(404).json(
      {
        status: 0,
        message: "Id is not found!"
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const updateUser = async (req, res , next) => {
  try {
    const id = req.params.id
    if(id){
      const result = await UserModal.findByIdAndUpdate(id,{...req.body})
      return res.status(200).json({
        status: 1,
        message: "get by id success!",
        result
      })
    }
    return res.status(404).json(
      {
        status: 0,
        message: "Id is not found!"
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const deleteUser = async (req, res , next) => {
  try {
    const id = req.params.id
    if(id){
      const result = UserModal.findByIdAndDelete(id)
      return res.status(200).json({
        status: 1,
        message: "delete id success!",
        result
      })
    }
    return res.status(404).json(
      {
        status: 0,
        message: "Id is not found!"
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const getpagingUser = async (req, res , next) => {
  try {
    const pageSize = Number(req.query?.pageSize) || 10;
    const pageIndex = Number(req.query?.pageIndex) || 1;
    const search = req.query?.search || "";
    const searchObj = {}
    if(req.query?.search){
      searchObj.username = { $regex: ".*" + search + ".*" };
    }

    const data = await UserModal.find(searchObj).skip(pageSize * pageIndex - pageSize)
    .limit(parseInt(pageSize)).sort({createdAt: "desc"})
    if(data.length == 0){
      pageIndex = 1
      data = await UserModal.find(searchObj).skip(pageSize * pageIndex - pageSize)
      .limit(parseInt(pageSize)).sort({createdAt: "desc"})
    }
    const count = await UserModal.find(searchObj).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({
      pageIndex,
      pageSize,
      totalPages,
      data,
      count,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const logout = async (req, res , next) => {
  try {
    const {userId} = req.body
    if(userId){
       await refreshToken.findOneAndDelete({user: userId})
      return res.status(200).json({status: 1})
    }
   
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

const createUser = async (req, res , next) => {
  try {
   console.log(req.files, 'file');
   console.log(req.body, 'body');
   
  } catch (error) {
    console.log(error);
    return res.status(500).json()
  }
}

module.exports = {
  authenticateSchema,
  authenticate,
  register,
  getByIdUser,
  updateUser,
  deleteUser,
  getpagingUser,
  logout,
  createUser
};
