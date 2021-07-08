import mongoose from 'mongoose';

const citySchema = mongoose.Schema(
    {
        
        id : Number ,
       

    }

);

const cityModel = mongoose.model('cityModel' , citySchema);

export default cityModel; 