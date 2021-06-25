import express from 'express';
import mongoose from 'mongoose';
import cityModel from '../Models/cityModel.js';
import hotelModel from '../Models/hotelModel.js';
import http from "https";
import fetch from "node-fetch";
import got from "got";
import axios from 'axios';
import { resolve } from 'path';


const router = express.Router();
   // new%20york

export const getCity = async (req , res   ) => {

   const a = 1;

    const options = {
        "method": "GET",
        "hostname": "travel-advisor.p.rapidapi.com",
        "port": null,
        "path": "/locations/search?query=chicago",
        "headers": {
            "x-rapidapi-key": "6e5bedd8cdmsh9a8621b6bf20f52p1cf4a4jsn2304b68f822f",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
     req = await http.request(options,  function (res) {
        const chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function () {
            const body = Buffer.concat(chunks);
            const obj = JSON.parse(body);
            const id =  (obj.data[0].result_object.location_id);
            //return id ;

            console.log(obj.data[0].result_object.location_id);
           /* return new Promise(function (resolve, reject) {
                //resolve( id) ;  
            
                    });*/
    });
    
        

    req.end();
   res.send('success');
   //return (a);
    //return(id) ;
    //next();
 } )
 
} 


export const  getCityy = async (req , res , des  ) => {


    var options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/locations/search',
        params: {query: des},
        headers: {
          'x-rapidapi-key': '6e5bedd8cdmsh9a8621b6bf20f52p1cf4a4jsn2304b68f822f',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }
      };
      
     /*res = await axios.request(options).then(function (response) {
         // console.log(response.data.data[0].result_object.location_id);
         const id = response.data.data[0].result_object.location_id;
         return id;
      }).catch(function (error) {
          console.error(error);
      });*/
      const result = await axios.request(options);
    //console.log(result.data.data[0].result_object.location_id);
    return await result.data.data[0].result_object.location_id;

   /*await fetch("https://travel-advisor.p.rapidapi.com/locations/search?query=pattaya", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "6e5bedd8cdmsh9a8621b6bf20f52p1cf4a4jsn2304b68f822f",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
    })
    .then(body => {

        //const obj = JSON.parse(response);
        console.log(body);
    })
    .catch(err => {
        console.error(err);
    });*/

   /* const options = {
        "method": "GET",
        "hostname": "travel-advisor.p.rapidapi.com",
        "port": null,
        "path": "/locations/search?query=pattaya&lang=en_US",
        "headers": {
            "x-rapidapi-key": "6e5bedd8cdmsh9a8621b6bf20f52p1cf4a4jsn2304b68f822f",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "useQueryString": true
        }
    };

     req =  http.request(options, async function (res) {
        const chunks = [];
    
        res.on("data", await function (chunk) {
            chunks.push(chunk);
        });
    
        res.on("end", function  () {
            const body =  Buffer.concat(chunks);
            const obj = JSON.parse(body);
            const id =  obj.data[0].result_object.location_id;
            
           export function give (){
                        return id;
                }
            
             console.log(id);
        });
    })

    
    
    req.end();
    return id;*/
    
    
 } 



export const getCities = async (req , res ) => {

    try {
        const message = await cityModel.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message : error.message});
    }
    
}

export const createCity = async (req , res ) => {

        const city = req.body;
        const newCity = new hotelModel(hotel);
    try {
        await newHotel.save();

        res.status(201).json(newCity);
    } catch (error) {
        
        res.status(409).json({ message : error.message});
    }
    
}


export default router;