import * as api from '../api';

export const getHotels = () => async (dispatch) => {

    try {
        const { data } = await api.fetchHotels();

        dispatch({ type : 'FETCH_ALL' , payload: data }) ;
    } catch (error) {
        
        console.log(error.message);
    }

     }



export const createHotel = (hotel) => async (dispatch) => {

        try {
            const { data } = await api.createHotel(hotel);
    
            dispatch({ type : 'CREATE' , payload: data }) ;
        } catch (error) {
            
            console.log(error);
        }
    
         }

    
