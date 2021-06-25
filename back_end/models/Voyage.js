import mongoose from 'mongoose';


const voyageSchema = new mongoose.Schema({
    voyageDepart:{
        type : String,
        requiered: true,
    },
    voyageArrive:{
        type : String,
        requiered: true,
    },
    voyageDateDepart:{
        type : Date,
        requiered: true,
    },
    voyageDateArrive:{
        type : Date,
        requiered: true,
    },
    voyagePrix:{
        type : Number,
        requiered: true,
    },
    voyagePlaces:{
        type : Number,
        requiered: true,
    }
});

const Voyages = mongoose.model("Voyages",voyageSchema)
export default Voyages;