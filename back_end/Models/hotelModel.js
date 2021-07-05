import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema(
    {
        ville : String ,
        date_debut : Date,
        chambres : Number ,
        personnes : Number ,

    }

);

const hotelModel = mongoose.model('hotelModel' , hotelSchema);

export default hotelModel;