import axios from 'axios';

const url = 'http://localhost:5000/hotels';

export const fetchHotels = () => axios.get(url);
export const createHotel = (newHotel) => axios.post(url , newHotel);