import User from "../models/User.js"

export async function register (req,res,next){ 
    const{username,email,password}=req.body;
    try{
        const user = await User.create({
            username,email,password
        });
        res.status(201).json({
            success:true,
            user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error: error.message,
        });
    }
};
export async function login (req,res,next) { 
    const{email,password}=req.body;

    if(!email||!password){
        res.status(400).json({success: false, error:"Please provide email and password"})
    }
    try{
        const user= await User.findOne({email}).select("+password");
        if (!user){
            res.status(404).json({success:false, error: "invalid credentials"})
        }
        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            res.status(404).json({success:false, error: "invalid credentials"})
        }
        res.status(201).json({
            success:true,
            token: "tazegdgsd54zae6"
        });
    }
    catch(error){
        res.status(500).json({success:false, error: error.message})  
      }
}
export function forgotpassword (req,res,next) { 
    res.send("Forgot Password Route");
}
export function resetpassword (req,res,next){ 
    res.send("Reset Password Route");
}