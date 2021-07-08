
export default (hotels = [ [{ name : 'name' , category : {key : 'key' } } ] ] , action  ) => {

    switch (action.type) {
        case 'FETCH_ALL':
                return action.payload;
            break;

        case 'CREATE':
                return [... hotels , action.payload ];
             break;
    
        default:
            return hotels;
            break;
    }





}