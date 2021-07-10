import VoyageModel from '../Models/Voyages.js';
import express from 'express';
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import crypto from 'crypto';
import mongoose from 'mongoose';
import path from 'path';
const app = express.Router();


/*const storage = multer.diskStorage({
  destination : (req, file, callback) =>{
    callback(null, "../../front_end1/src/Components/Screens/img/uploads");
  },
  filename: (req, file, callback)=>{
    callback(null, file.originalname);
  }
});

const upload = multer({storage: storage});*/

const mongoURI = "mongodb+srv://admin:2021@cluster0.fwzji.mongodb.net/Travel_Agency?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    // this function runs every time a new file is created
    return new Promise((resolve, reject) => {
      // use the crypto package to generate some random hex bytes
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // turn the random bytes into a string and add the file extention at the end of it (.png or .jpg)
        // this way our file names will not collide if someone uploads the same file twice
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
        // resolve these properties so they will be added to the new file document
        resolve(fileInfo);
      });
    });
  },
});

// set up our multer to use the gridfs storage defined above
const store = multer({
  storage,
  // limit the size to 20mb for any files coming in
  limits: { fileSize: 20000000 },
  // filer out invalid filetypes
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  // https://youtu.be/9Qzmri1WaaE?t=1515
  // define a regex that includes the file types we accept
  const filetypes = /jpeg|jpg|png|gif/;
  //check the file extention
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // more importantly, check the mimetype
  const mimetype = filetypes.test(file.mimetype);
  // if both are good then continue
  if (mimetype && extname) return cb(null, true);
  // otherwise, return error message
  cb('filetype');
}

const uploadMiddleware = (req, res, next) => {
  const upload = store.single('image');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send('File too large');
    } else if (err) {
      // check if our filetype error occurred
      if (err === 'filetype') return res.status(400).send('Image files only');
      // An unknown error occurred when uploading.
      return res.sendStatus(500);
    }
    // all good, proceed
    next();
  });
};


app.post("/insert", async (req,res)=>{


    const villeDep = req.body.villeDep;
    const villeArr = req.body.villeArr;
    const dateDep = req.body.dateDep;
    const dateArr = req.body.dateArr;
    const nbPlace = req.body.nbPlace;
    const price = req.body.price;
    const id = req.body.image;
console.log(id);
       const voyage = new VoyageModel({ voyageDepart :villeDep, 
        voyageArrive:villeArr, voyageDateDepart:dateDep,voyageDateArrive:dateArr,
         voyagePrix:price,voyagePlaces:nbPlace,image:id});
         try{
           await voyage.save();
         }catch(err){
             console.log(err);
         }//ss
  });

  app.post("/insertimage", uploadMiddleware/*upload.single("voyageImage")*/, async (req,res)=>{


    const { file } = req;

    // and the id of that new image file
    const { id } = file;

    // we can set other, smaller file size limits on routes that use the upload middleware
    // set this and the multer file size limit to whatever fits your project
    if (file.size > 5000000) {
      // if the file is too large, delete it and send an error
      deleteImage(id);
      return res.status(400).send('file may not exceed 5mb');
    }
    console.log('uploaded file: ', file);
    return res.send(file.id);
    

  });
  const deleteImage = (id) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
      if (err) return res.status(500).send('image deletion error');
    });
  };
  
  // this route will be accessed by any img tags on the front end which have
  // src tags like
  // <img src="/api/image/123456789" alt="example"/>
  // <img src={`/api/image/${user.profilePic}`} alt="example"/>
  app.get('/insertimage/:id', ({ params: { id } }, res) => {
    // if no id return error
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    // if there is an id string, cast it to mongoose's objectId type
    const _id = new mongoose.Types.ObjectId(id);
    // search for the image by id
    gfs.find({ _id }).toArray((err, files) => {
      if (!files || files.length === 0)
        return res.status(400).send('no files exist');
      // if a file exists, send the data
      gfs.openDownloadStream(_id).pipe(res);
    });
  });
  


  app.put("/buy",async (req,res)=>{


    // const name = req.body.name;
    // const tel = req.body.tel;
    const id =req.body.id;
    var voyageur= { name: req.body.name, tel: req.body.tel };
        try{
         const VM = await VoyageModel.findOne({_id : id});
         VM.voyageurs.push(voyageur);
         VM.voyagePlaces = VM.voyagePlaces-1,
         VM.save();
          // ,(bought)=>{
          //   bought.voyageurs.push(voyageur);
          //   bought.voyagePlaces=bought.voyagePlaces-1;
          //   bought.save();
          // }
        }catch(err){
            console.log(err);
        }//ss
  });

  // reservation insert after checkout
  // app.post("/insertreservation",async (req,res)=>{

  //   const name = req.body.name;
  //   const mail = req.body.mail;
  //   const tel = req.body.tel;

  //   const villeDep = req.body.villeDep;
  //   const villeArr = req.body.villeArr;
  //   const dateDep = req.body.dateDep;
  //   const dateArr = req.body.dateArr;
  //   const nbPlace = req.body.nbPlace;
  //   const price = req.body.price;

    
  //     const voyageur = new VoyageurModel({ name:name, mail:mail, tel:tel,  voyageDepart :villeDep, 
  //      voyageArrive:villeArr, voyageDateDepart:dateDep,voyageDateArrive:dateArr,
  //       voyagePrix:price,voyagePlaces:nbPlace});
  //       try{
  //         await voyage.save();
  //       }catch(err){
  //           console.log(err);
  //       }//ss
  // });



  app.get("/read",async (req,res)=>{
    VoyageModel.find({},(err,result)=>{
      if(err){
        res.send(err);
      }

      res.send(result);


    })

  });


  app.post("/readvoyageurs/",async (req,res)=>{
    const Id = req.body.id;
     VoyageModel.find({_id:Id},(err,result)=>{
       if(err){
         res.send(err);
       }
    
       res.send(result);


     })

  });


  app.delete("/delete/:id", async (req,res)=>{
      const id = req.params.id;
      await VoyageModel.findByIdAndRemove(id).exec();
      res.send("Deleted")
    })

    export default app;
