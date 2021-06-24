import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: [true, "Please provide a username"]
    },
    email: {
        type: String, required: [true, "Please provide an email"], unique: true, 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //regex
            ,"Please provide a valid email"
        ]
    },
    role: {
        type: String, default: "user", enum: ["user", "admin"]
    },
    password: {
        type: String, required: [true, "Please provide a password"], minlenght: 6, select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next){//run the middleware function before the password gets saved
    if (!this.isModified("password")){//if the password isn't modified it won't re hashit, it will just save the current password
        next();
    }
    const salt = await bcrypt.genSalt(10);//A cryptographic salt is made up of random bits added to each password instance before its hashing. Salts create unique passwords even in the instance of two users choosing the same passwords. The higher the number the more secure
    this.password = await bcrypt.hash(this.password,salt);//save the new password in the password field that was paste in and save the document ... setting that password equals the hashed version of the password and save it
    next();
});

UserSchema.methods.matchPasswords =  function(password){ //method name for userschema is matchPasswords.. the fuction will receive the password for the user and compare it to the one in the database
    return bcrypt.compare(password, this.password);
};


UserSchema.methods.getSignedToken = function(){ //generate the web token  Il permet l'échange sécurisé de jetons entre plusieurs parties. Cette sécurité de l’échange se traduit par la vérification de l’intégrité des données à l’aide d’une signature numérique.
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE,});
};

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hash the token and save the hashed version in resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");//sha156 is the hashing algo

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
};

 const Utilisateur = mongoose.model("Utilisateur",UserSchema);
 export default Utilisateur;