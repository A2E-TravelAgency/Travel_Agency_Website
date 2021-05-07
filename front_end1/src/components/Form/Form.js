import React from 'react';
import { TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './styles';
import Button from '@material-ui/core/Button';


const Form = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    return (
         <form className={classes.root} noValidate autoComplete="off">
      <div>
    
        <TextField id="outlined-search" label="Destination" type="search" variant="outlined" />


        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de début"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>


    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date de fin"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
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
        />

    
        <TextField
          id="outlined-number"
          label="Nombre des personnes"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

    <Button variant="contained" color="primary" disableElevation>
      Rechercher
    </Button>

      </div>
    </form>

    );

}


export default Form;