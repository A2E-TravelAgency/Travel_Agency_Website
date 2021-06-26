import Utilisateur from "../Models/Utilisateurs.js"


export async function getPrivateData (req, res, next) {
    console.log(req.user);
    res.status(200).json({
        success : true,
        data: req.user,
    });
};
export async function getPrivateAdminData (req, res, next) {
    const users = req.user;
    res.status(200).json({
        success : true,
        data: users,
    });
};
export async function changePassword (req, res, next) {
    console.log(req.body.email);
    const email = req.body.email;
     try {
         const user = await Utilisateur.findOne({email});
         user.password = req.body.password;
         await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
      token: user.getSignedToken(),
    });
     } catch (error) {
        next(error);
         return res.status(500).json({msg: error.message});
     }
    
};

export async function changeEmailUsername (req, res, next) {
    console.log(req.body.email);
    const email = req.body.email;
    const newUsername = req.body.newusername;
    const newEmail = req.body.newemail;
     try {
         const user = await Utilisateur.findOne({email});
         user.email = newEmail;
         user.username = newUsername;
         await user.save();

    res.status(201).json({
      success: true,
      data: "Credentials Updated Successfully",
      token: user.getSignedToken(),
    });
     } catch (error) {
        next(error);
         return res.status(500).json({msg: error.message});
     }
    
};

export async function getUsers (req, res, next) {

     try {
         const users = await Utilisateur.find({}).select("+password");;
      
            res.send({"users" : users});
     } catch (error) {
        next(error);
         return res.status(500).json({msg: error.message});
     }
    
};