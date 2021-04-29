
import hotelModel from '../Models/hotelModel.js';

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