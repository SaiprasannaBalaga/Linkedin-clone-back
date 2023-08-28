const User = require("../model/userModel");
const { genSalt, hash, compare } = require("bcrypt");
const CryptoJS = require("crypto-js");

const register = async (req) => {
    const userData = await User.find({ email: req.body.email});
    if (userData.length){
        throw new Error("Email already registered");
    }
    const { password } = req.body;
    const salt = await genSalt();
    const hashedPass = await hash(password, salt);
    const data = await User.create({
        ...req.body,
        password: hashedPass,
    });
    return data;
};

const login = async (req) => {
    const { email, password } = req.body;
    const userData = await User.find({ email });
    if(!userData.length) throw new Error("Email not found");
    const { password: hashedPass, _id,access } = userData[0];
    const checkPass = await compare(password, hashedPass);
    if(!checkPass) throw new Error("Wrong Credentials");
    const token = CryptoJS.AES.encrypt(
        JSON.stringify({
            email,
            userId: _id,
            access
        }),
        process.env.CRYPTO_SECRET
    ).toString();
    return{
        userId: _id,
        email,
        token
    };
};

const loggedInUser = async(req)=>{
    return User.findById(req.userId);
};


module.exports = {
    register,
    login,
  loggedInUser
}
