const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/users.js");
const generateToken = require("../../middlewares/generateToken");


const registerUser = expressAsyncHandler(async (req, res) =>{
    const {email, firstname, lastname, password} = req?.body;

    const userExist= await User.findOne({email});
    if(userExist) throw new Error('User already Exists');
    try {

        const user= await User.create({email, firstname, lastname, password});
        res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
});

//Fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) =>{
    try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.json(error);
        }
});

//login user
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
    const {email, password} = req?.body;
    //Find user in Db
    const userFound = await User.findOne({email});
    //check if user password match
    if(userFound && (await userFound?.isPasswordMatch(password)))
    {
      res.json({
          _id: userFound?._id,
          firstname: userFound?.firstname,
          lastname: userFound?.lastname,
          email: userFound?.email,
          isAdmin: userFound?.isAdmin,
          token: generateToken(userFound?._id),       
      });  
    }
    else{
      res.status(401);
      throw new Error('Invalid Login Credentials');
    }

});

  

module.exports = {registerUser, fetchUsersCtrl, loginUserCtrl};