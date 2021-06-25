import express from 'express';
import mongoose from 'mongoose';
import hotelModel from '../Models/hotelModel.js';
import http from "https";
import { getCityy} from './city.js';
import axios from 'axios';

const router = express.Router();

export const getHotel = async (req , res ,  id , dated  , cham , per) => {

    

    const options = {
        "method": "GET",
        "hostname": "travel-advisor.p.rapidapi.com",  //60763
        "port": null,
        "path": "/hotels/get-details?location_id="+id+"&checkin="+dated+"&adults="+per+"&nights="+cham+"",
        "headers": {
            "x-rapidapi-key": "6e5bedd8cdmsh9a8621b6bf20f52p1cf4a4jsn2304b68f822f",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
     req = http.request(options, function (res) {
        const chunks = [];
    
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            const obj = JSON.parse(body);
            
                console.log(obj.data[0].name);
                console.log(obj.data[0].location_string);
                console.log(obj.data[0].ranking);
                console.log(obj.data[0].price);
                console.log(obj.data[0].hotel_class);
                console.log(obj.data[0].description);

               

           
            
        });
    });
    
    req.end();
   res.send('success');
   
    
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

        const hotel = req.body;
        const newHotel = new hotelModel(hotel);
        //const des = newHotel.destination;
        const des = "paris";
        console.log("des is"+des);
        const dated = newHotel.date_debut;
        //const datef = newHotel.date_fin;
        const cham = newHotel.chambres;
        const per = newHotel.personnes;
        
    try {
       // await newHotel.save();
       const id =  await getCityy( req , res , des );
       console.log(id);
       
        //const id = res.id;
      //const id = res.locals.id;
      
     getHotel( req , res , id , dated , cham , per);
        //res.status(201).json(newHotel);
    } catch (error) {
        
        res.status(409).json({ message : error.message});
    }

    
    
}

export default router;