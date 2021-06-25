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


    app.get("/",async (req,res)=>{
        const voyage = new VoyageModel({ voyageDepart :"Marrakech", 
         voyageArrive:"Rabat", voyageDateDepart:"2022-05-09",voyageDateArrive:"2022-12-09",
          voyagePrix:1500,voyagePlaces:40});
          try{
            await voyage.save();
          }catch(err){
              console.log(err);
          }//ss
    });