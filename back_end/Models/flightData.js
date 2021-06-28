import mongoose from 'mongoose';
const flightDataSchema = new mongoose.Schema({
    username: {
        type: String,  default: "unknown"
    },
    destination: {
        type: String, 
    },
    flightdate: {
        type: Date, 
    },
    actiondate: {
        type: Date, default: Date.now
    },
});

const flightData = mongoose.model("flightData",flightDataSchema);
export default flightData;