const { User } = require("../models/index");
const JWTSecretKey = process.env.JWT_SECRETS;
const { hashPassword } = require("../helper/auth.helper");
var jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const body = req.body;

    const isExist = await User.checkEmail(body.email);
    if (!isExist.status) return res.status(404).send({ status: false, message: isExist.message });
    if (isExist.isExist) return res.status(404).send({ status: false, message: "This email is already exist. Please try another one." });
   
    body["password"] = hashPassword(body.password);

    const insertUserData = await User.insertUserData(body);
    if (!insertUserData) return res.status(404).send({ success: false, message: "Something wrong...!", data: {} });
  
    var profileId = insertUserData.data.insertId;

    const getProfileDetails = await User.getProfileData(profileId);
    if (!getProfileDetails.status) return res.status(400).send({ status: false, data: getProfileDetails.message });

    var result = getProfileDetails.data;
    var token = jwt.sign(JSON.stringify(result), JWTSecretKey);

    res.status(200).send({ success: true, message: "success", data: "Bearer " + token });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ success: false, message: "Something wrong...!", data: {} });
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;

    const isExistData = await User.checkEmail(body.email);
    if (!isExistData.isExist) return res.status(400).send({ status: false, message: "This email is not exist. Please enter valid email." });
    body["password"] = hashPassword(body.password);
    const checkLogin = await User.loginData(body);

    if (checkLogin.status == false) return res.status(400).send({ status: false, message: checkLogin.message, data: {} });
    var result = checkLogin.data;
    var token = jwt.sign(JSON.stringify(result), JWTSecretKey);

    res.status(200).send({ success: true, message: "success", data: "Bearer " + token });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ success: false, message: "Something wrong...!", data: {} });
  }
};

module.exports = {
  signup,
  login
};
