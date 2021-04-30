import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true," Please provide a username"]
    },
    email:{
        type: String,
        required:[true," Please provide an email"],
        unique : true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/        ,
            "Please provide a valid email"]
    },
    password:{
        type:String,
        requierd :[ true,"Please prrovide a password"],
        minlength:6,
        select:false
    },
    resetpasswordexpire : String,
    resetpasswordexpire : Date
    
});
UserSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
       next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash (this.password,salt)
    next();
});

UserSchema.methods.matchPassword= async function (password){
    return await bcrypt.compare(password, this.password);
}

const user=mongoose.model("User",UserSchema);
export default user;
