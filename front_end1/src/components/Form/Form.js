import React , {useState} from 'react';
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {createHotel} from '../../actions/hotels';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Hotels from '../Hotels/Hotels';


const Form = () => {
    
  const [postVille , setPostVille] = useState( );
  const [postDate_debut , setPostDate_debut] = useState( );
  const [postDate_fin , setPostDate_fin] = useState( );
  const [postChambres , setPostChambres] = useState( ) ;
  const [postPersonnes , setPostPersonnes] = useState( ) ;

  
  
   
    //const [postHotel , setPostHotel] = useState({ ville : '' , date_debut :'' , date_fin : '' , chambres : '' , personnes : ''});
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01T21:11:54'));
    const [selectedDateFin, setSelectedDateFin] = React.useState(new Date('2021-01-01T21:11:54'));

    const postHotel  = { ville : postVille , date_debut : selectedDate ,  chambres : postChambres , personnes : postPersonnes};

    let history = useHistory();
    const handleSubmit=(e)=>{

      e.preventDefault();
      //console.log(postHotel);
      dispatch(createHotel(postHotel));

      history.push("/Hotels");
      
      

    };

    /*const handleChange = (prop) => (event) => {
      setPostHotel({ ...postHotel, [prop]: event.target.value });
    };*/
    const clear =()=>{

    };

  const handleDateChange = (date) => {
  setSelectedDate(date);
  };  

  /*const handleDateChangeFin = (date) => {
    setSelectedDateFin(date);
    };  */

  

  

    return (
      <>
         <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
    
        <TextField id="outlined-search" label="Ville Destination" type="search" variant="outlined" value={postHotel.ville} onChange={(e)=>setPostVille(e.target.value)} /> 


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de début"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}  /*(e)=>setPostHotel(...postHotel , {date_debut : e.target.value})*/
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>


    



        <TextField
          id="outlined-number"
          label="Nombre des chambres"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={postHotel.chambres}
          onChange={(e)=>setPostChambres(e.target.value)}
        />

    
        <TextField
          id="outlined-number"
          label="Nombre des personnes"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={postHotel.personnes}
          onChange={(e)=>setPostPersonnes(e.target.value)}
        />

    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" disableElevation type="submit" fullWith /*onClick={}*/>
     Rechercher
    </Button>
    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" disableElevation onClick={clear} fullWith /*onClick={}*/>
    Réinitialiser
    </Button>

      </div>
    </form>
    
    </>
    );

}


export default Form;