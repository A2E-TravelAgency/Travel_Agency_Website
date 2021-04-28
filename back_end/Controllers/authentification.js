import Utilisateur from "../Models/Utilisateurs.js"

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

export function forgotpassword(req, res, next)  {
    res.send("Forgot Password Route");
}

export function resetpassword(req, res, next)  {
    res.send("Reset Password Route");
}

const  sendToken = (user, statusCode, res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
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
