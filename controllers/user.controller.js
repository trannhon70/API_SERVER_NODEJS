const validateRequest = require("../middleware/validate-request")
const userService = require("../services/user.service")
const Joi = require("joi");

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

module.exports = {
    authenticateSchema,
    authenticate
}