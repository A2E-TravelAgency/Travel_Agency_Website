import jwt from 'jsonwebtoken';
import Utilisateur from "../Models/Utilisateurs.js"

export async function protect (req, res, next){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token 
        = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return next(res.status(401).json({success: false, error: "Not authorized to access this route"}));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify decrypts the token with our secret key

        const user  = await Utilisateur.findById(decoded.id);
        if(!user){
            return next(res.status(404).json({success: false, error: "No user found with this id"}));
        }
        if(user.role !="user"){
            return next(res.status(404).json({success: false, error: "No user found with this role"}));
        }
        req.user = user;//set that user on the request object to use it in other routes
        next(); //continue on the next piece in the route
    } catch (error) {
        return next(res.status(401).json({success: false, error: "Not authorized to access this route"}));

    }
}