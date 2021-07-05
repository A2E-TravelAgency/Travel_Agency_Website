import express from 'express';
import mongoose from 'mongoose';
import hotelModel from '../Models/hotelModel.js';
import http from "https";
import { getCityy} from './city.js';
import axios from 'axios';

const router = express.Router();

export const getHotel = async (req , res ,  id , dated  , cham , per ) => {



    var options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/hotels/get-details',
        params: {
          location_id: id,
          checkin: dated,
          adults: per,
          nights: cham
        },
        headers: {
          'x-rapidapi-key': '512e81dfc6mshba53a137a3da1f7p16781cjsnc11a1b76dbb3',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      };
      const result = await axios.request(options);
    //const result = await axios.request(options);

    //for ( var i = 0 ; i < 10 ; i++){

        //var myJSON = JSON.stringify(result.data.data);
 //await result.data[0];
   //console.log(myJSON); 
     
        
        // await result.data.data[i];
        
        
        //const tab =[];
       // tab.push(arr);
       //console.log(result.data.data[i].name);
        //const hotels  = result.data.data;
        
     // }
    //  res.end();
    
     try {

        
        //for ( var i = 0 ; i < 10 ; i++){

            //var myJSON = JSON.stringify(result.data.data[i]);
     //await result.data[0];
       //console.log(myJSON); 
        // res.write(myJSON);
            
            // await result.data.data[i];
            res.send(result.data.data);
            
            //const tab =[];
           // tab.push(arr);
           //console.log(result.data.data[i].name);
            //const hotels  = result.data.data;
            
          }
         // res.end();
         catch (error) {
          console.log(error);
      }
    } 
    

       
    
   
   
    

export const getHotels = async (req , res ) => {

    try {
        const message = await hotelModel.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message : error.message});
    }
    
}

export const createHotel = async (req , res ) => {

        const hotel = await req.body;
        const newHotel = new hotelModel(hotel);
        
        //const des = "boston";
         //const hotelbody = JSON.stringify(hotel);
        
        const dated = newHotel.date_debut;
        const des = newHotel.ville;
        const cham = newHotel.chambres;
        const per = newHotel.personnes;
        console.log(" des "+newHotel.ville);
        console.log("cham is "+cham);
        console.log("dated is "+dated);
        console.log("hotel "+newHotel);
        console.log("personne is "+per);
    try {
       // await newHotel.save();
       const id =  await getCityy( req , res , des );
       console.log("id is "+id);
       
        //const id = res.id;
      //const id = res.locals.id;
      
     getHotel( req , res , id , dated , cham , per);
        //res.status(201).json(newHotel);
    } catch (error) {
        
        res.status(409).json({ message : error.message});
    }

    
    
}

export default router;