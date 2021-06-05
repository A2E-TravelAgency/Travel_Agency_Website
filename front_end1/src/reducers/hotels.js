export default (hotels = [] , action  ) => {

    switch (action.type) {
        case 'FETCH_ALL':
                return action.payload;
            break;

        case 'CREATE':
                return hotels;
             break;
    
        default:
            return hotels;
            break;
    }





}