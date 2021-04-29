import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema(
    {
        destination : String ,
        date_debut : Date,
        date_fin : Date , 
        chambres : Number ,
        personnes : Number ,

    }

);

const hotelModel = mongoose.model('hotelModel' , hotelSchema);

export default hotelModel;