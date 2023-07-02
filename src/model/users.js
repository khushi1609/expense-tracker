const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    firstname:{
        required : [true,'First Name Required'],
        type : String,
    },
    lastname:{
        required : [true,'Last Name Required'],
        type : String,
    },
    email:{
        required : [true,'Email id Required'],
        type : String,
    },
    password:{
        required : [true,'Password Required'],
        type : String,
    },
    isAdmin:{
        type : Boolean,
        default : false,
    }
},{
    timestamps : true,
});

//hash password
userSchema.pre("save", async  function(next){
    if (!this.isModified("password")) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
});

const User = mongoose.model("User",userSchema);
module.exports = User;