import express from 'express';
import mongoose from 'mongoose';
import hotelModel from '../Models/hotelModel.js';
import http from "https";
import axios from 'axios';

const router = express.Router();

export const getHotel = async (req , res ) => {

    

    const options = {
        "method": "GET",
        "hostname": "travel-advisor.p.rapidapi.com",
        "port": null,
        "path": "/hotels/get-details?location_id=60763&checkin=2021-07-01&adults=1&nights=2",
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
            console.log(obj);
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
    try {
        await newHotel.save();

        res.status(201).json(newHotel);
    } catch (error) {
        
        res.status(409).json({ message : error.message});
    }
    
}

export default router;