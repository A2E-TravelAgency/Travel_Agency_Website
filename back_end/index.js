import express from 'express';
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
import cors from 'cors';
import hotelRoutes from './Routes/hotels.js';
import cityRoutes from './Routes/city.js';




const app = express();

//starting path :  every route in hotel routes is gonna start with hotels  => localhost:5000/hotels


app.use(express.json({limit : "30mb" , extended : true}));
app.use(express.urlencoded({limit : "30mb" , extended : true}));
app.use(cors());    
app.use('/hotels' , hotelRoutes);
app.use('/city' , cityRoutes);
// app.get
// app.get
//express.json({limit : "30mb" , extended : true});
//express.urlencoded({limit : "30mb" , extended : false});


const  CONNECTION_URL = "mongodb+srv://admin:2021@cluster0.fwzji.mongodb.net/Travel_Agency?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect( CONNECTION_URL , { useNewUrlParser : true , useUnifiedTopology : true } )
    .then( () => app.listen(PORT , () => console.log(`server running on port : ${PORT}`)))
    .catch( (error) => console.log(error.message ));

    mongoose.set('useFindAndModify' , false);


    // api :  sandb_otLymM7a9SRARVkd81MKtlaQPSSkPJtsWSBq90qN