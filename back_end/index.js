import dotenv from "dotenv";
dotenv.config({ path:'./config.env' });
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import hotelRoutes from './Routes/hotels.js';
import voyagesRoutes from './Routes/voyages.js';
import volsRoutes from './Routes/vols.js';
import authRoutes from './Routes/auth.js';
import VoyageModel from './models/Voyage.js';

const app = express();
app.use(express.json());
app.use(cors());




//starting path :  every route in hotel routes is gonna start with hotels  => localhost:5000/hotels
//routes
//app.use('/hotels ' , hotelRoutes);
//app.use('/voyages ' , voyagesRoutes);
//app.use('/vols ' , volsRoutes);
app.use('/api/auth', authRoutes);


/*express.json({limit : "30mb" , extended : true});
express.urlencoded({limit : "30mb" , extended : false});
app.use(cors());*/

const  CONNECTION_URL = "mongodb+srv://admin:2021@cluster0.fwzji.mongodb.net/Travel_Agency?retryWrites=true&w=majority";


const PORT = process.env.PORT || 5000;

mongoose.connect( CONNECTION_URL , { useNewUrlParser : true , useUnifiedTopology : true } )
    .then( () => app.listen(PORT , () => console.log(`server running on port : ${PORT}`)))
    .catch( (error) => console.log(error.message ));

    
    mongoose.set('useFindAndModify' , false);


    app.post("/insert",async (req,res)=>{


      const villeDep = req.body.villeDep;
      const villeArr = req.body.villeArr;
      const dateDep = req.body.dateDep;
      const dateArr = req.body.dateArr;
      const nbPlace = req.body.nbPlace;
      const price = req.body.price;

      
        const voyage = new VoyageModel({ voyageDepart :villeDep, 
         voyageArrive:villeArr, voyageDateDepart:dateDep,voyageDateArrive:dateArr,
          voyagePrix:price,voyagePlaces:nbPlace});
          try{
            await voyage.save();
          }catch(err){
              console.log(err);
          }//ss
    });




    app.put("/buy",async (req,res)=>{


      // const name = req.body.name;
      // const tel = req.body.tel;
      const id =req.body.id;
      var voyageurs= { name: req.body.name, tel: req.body.tel };
      
          try{
            VoyageModel.findById(id,(bought)=>{
              bought.voyageurs.push(voyageurs);
              bought.voyagePlaces=bought.voyagePlaces-1;
              bought.save();
            });
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


    app.get("/readvoyageurs",async (req,res)=>{
      VoyageModel.find({},(err,result)=>{
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