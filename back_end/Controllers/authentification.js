import Utilisateur from "../Models/Utilisateurs.js"
import sendMail from "../Utils/sendMail.js"
import {sendEmail} from "../Utils/sendMail.js"
import crypto from 'crypto';


import jwt from 'jsonwebtoken';



export async function register(req, res, next)  {

const {username, email, password} = req.body;
    try {
            const user = await Utilisateur.create({username, email, password,});

           // res.status(201).json({success: true, token: "hydg654hhgy",});//201 created
           sendToken(user, 201, res);
    } catch (error) {
        res.status(500).json({success: false, error: error.message,});//500 internela server error
    }

}

export async function login(req, res, next)  {
    const{email,password} = req.body;//get things from the body

    if(!email || !password){//do we have the email and password?
        res.status(400).json({ success: false, error: "Please provide email and password"});//400 bad request, server doesn't understand it
    }
    try {
        const user = await Utilisateur.findOne({email}).select("+password");//find one user by its email adress because it is unique...it will return the user with email, password, username
        if(!user){//if we don't have the user
            res.status(404).json({success: false, error: "Invalid credentials"});//404 USER NOT FOUND
        }
        //now if we found the email in the database, we're oing to check if it's password matches with the one inserted
        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            res.status(404).json({success: false, error :"Invalid credentials"});
        }
        //res.status(200).json({success: true, token: "hydg654hhgy",});//200 OK requete reussi
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
  
    }
    
}

export async function forgotpassword(req, res, next)  {
    
    try {
        const {email} =req.body;
        const user = await Utilisateur.findOne({email}); 

        if(!user){//if we don't have the user
            return next(res.status(404).json({success: false, error: "This email does not exit"}));//404 USER NOT FOUND
        }
        //const access_token = createAccessToken({id: user._id});
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const url = `http://localhost:3000/passwordreset/${resetToken}`;
        //sendMail(email, url, "Reset your password");
        await sendEmail(email,url,"Reset your password").then(result=> console.log('Email sent ...', result)).catch(error => console.log(error.message)); 

        res.json({msg: "Re-send the password, please check your email"});


        /*const resetToken = user.getResetPasswordToken();//adding a new field to the user and returning the reset token

        await user.save(); //save the newely created field resetPasswordToken field to the database

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`;
        const message =`<h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href =${resetURL} clicktracking=off>${resetURL}</a>}`;
        
        try {
            
        } catch (error) {
            
        }*/

    } catch (error) {
        
        return res.status(500).json({msg: error.message});
    }
};

export async function resetpassword(req, res, next)  {
    const resetPasswordTOKEN = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await Utilisateur.findOne({
      resetPasswordToken: resetPasswordTOKEN,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(res.status(400).json({msg: "invalid token"}));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedToken(),
    });
  } catch (err) {
    next(err);
  }
};

const  sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken();
    const role = user.role;
    const username = user.username;
    const id = user._id;
    res.status(statusCode).json({ success: true, token, role, id, username });
};
/*exports.login = (req, res, next) => {
    res.send("Login Route");
};

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route");
    };

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};*/
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15m'})
};