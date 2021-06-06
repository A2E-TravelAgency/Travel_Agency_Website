import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, makeStyles,withStyles } from "@material-ui/core/styles";
import {Button, Switch} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete , { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";



import "./style.css";
import "./VolsScreen.css";
import "./LoginScreen.css";


const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6649b8' //your color
      
    },
  },
  overrides: {
    // Style sheet name
    MuiButton: {
      typography: {
       
        "fontSize": 18
      }
    },

    MuiTouchRipple: {
      // Name of the rule
      child: {
        // Some CSS
        backgroundColor: "purple"
      }
    }
  },
  typography: {
    fontFamily: [
      'Raleway'
    ].join(','),
  }
});
const PurpleSwitch = withStyles({
  switchBase: {
    
    '&$checked': {
      color: '#6649b8',
    },
    '&$checked + $track': {
      backgroundColor: '#6649b8',
    },
  },
  checked: {},
  track: {},
})(Switch);
const useStyles = makeStyles(()=>({
    grid: {
      width:'100%',
      margin:'0px'
    }, formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    tr: {
      borderRadius:theme.shape.borderRadius,
      transition: theme.transitions.create(["background", "background-color"], {
        duration: theme.transitions.duration.complex,}),
      '&:hover': {
        backgroundColor: "rgba(60, 60, 60, 0.1)",

      }
    },
}));

const VolsScreen = ({ history, match }) => {
  const [inputValue1, setinputValue] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [age, setAge] = React.useState('');
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const [darkmode, setDarkmode] = useState(false);
  const darktheme = createMuiTheme({
    
    palette: {
      type: darkmode ? 'dark': 'light',
      primary: {
        main: '#6649b8' //your color
        
      },
    },
    overrides: {
      // Style sheet name
      MuiButton: {
        typography: {
         
          "fontSize": 18
        }
      },
  
      MuiTouchRipple: {
        // Name of the rule
        child: {
          // Some CSS
          backgroundColor: "purple"
        }
      }
    },
    typography: {
      fontFamily: [
        'Raleway'
      ].join(','),
      },});
      
      const lighttheme = createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#6649b8' //your color
            
          },
        },
        overrides: {
          // Style sheet name
          MuiButton: {
            typography: {
             
              "fontSize": 18
            }
          },
      
          MuiTouchRipple: {
            // Name of the rule
            child: {
              // Some CSS
              backgroundColor: "purple"
            }
          }
        },
        typography: {
          fontFamily: [
            'Raleway'
          ].join(','),
          },});

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };


    try {
      const { data } = await axios.put(
        `/flights`,
        {
          inputValue1,

        },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const airports = [{"name": "Goroka ", "city": "Goroka", "country": "Papua New Guinea", "IATA": "GKA", "ICAO": "AYGA", "lat": "-6.081689834590001", "lon": "145.391998291", "timezone": "10"}];
  /*const search = document.getElementById('search');
  const matchList = document.getElementById('match-list');

  const searchAirports = async searchText => {
      const res = await fetch('../data/airports.json');
      const airports = res.json();

      let matches = airports.filter(airport => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return airport.name.match(regex) || airport.city.match(regex) || airport.country.match(regex) || airport.IATA.match(regex);

      }
      );

      if (searchText.length === 0){
        matches = [];
        matchList.innerHTML ='';
      }
      outputHtml(matches);
  };
    const outputHtml = matches => {
        if(matches.length>0){
          const html = matches.map(match=> `
          <h4>${match.name} (${match.city}) <span class= "text-primary">${match.country}</span></h4>
          <small> Lat : ${match.lat} / Long : ${match.lon}</small>
          `).join('');

          matchList.innerHTML = html;
        }
    };
    search.addEventListener('input', () => searchAirports(search.value));
*/

const classes =useStyles();
const filterOptions = createFilterOptions({
  stringify: ({ country, city, name, IATA }) => `${country} ${city} ${name} ${IATA}`
});
  return (


<div>
 <Navbar/> 
  <main>
  <div className="vol-screen">
  <div className={isActive ? 'vol-screen__picd': "vol-screen__pic"} >
  <p className="vol-screen__quote"> “When once you have tasted flight, you will forever walk the earth with your eyes turned skyward, for there you have been, and there you will always long to return.”
<div>– Leonardo DaVinci</div></p>

      <div class="inputBox">
    <ThemeProvider theme={darkmode ? darktheme : lighttheme}>
      <form
        onSubmit={resetPasswordHandler}
        className="vol-screen__form"
      >
        <h3 className="vol-screen__title">Enter Flight Informations</h3>
        {error && <span className="error-message">{error} </span>}
        {success && (
          <span className="success-message">
            {success} <Link to="/login">Login</Link>
          </span>
        )}
      <Grid container justify="center" direction="row" alignItems="center" spacing={2} className={classes.grid} align="center">
      <Grid item xs={12} md={6} >
    <Autocomplete
      id="combo-box-demo"
      options={airports}
      inputValue={inputValue1}
      onInputChange={(e) => setinputValue(e.target.value)}
      filterOptions={filterOptions}  
      getOptionLabel={({ country, city }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        return `${country} ${city}`;
      }}
      style={{ width: (400) }}
      className={classes.tr}
      renderInput={(params) => <TextField {...params} label="Departure" variant="outlined" />}
      open={inputValue1.length > 2}
      renderOption={(option) => (
        <>
          <p>{option.country} - {option.city} - {option.name} - {option.IATA} <small> 
            <br />Lat : {option.lat} / Long : {option.lon}</small></p>
        </>
        
      )}
    />
    </Grid>
    <Grid item xs={12} md ={6} >
    <Autocomplete
      id="combo-box-demo1"
      options={airports}
      
      filterOptions={filterOptions}  
      getOptionLabel={({ country, city }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        return `${country} ${city}`;
      }}
      style={{ width: (400) }}
      className={classes.tr}
      renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
      renderOption={(option) => (
        <>
          <p>{option.country} - {option.city} - {option.name} - {option.IATA} <small> 
            <br />Lat : {option.lat} / Long : {option.lon}</small></p>
        </>
        
      )}
    />
    </Grid>
    <Grid item xs>
    <FormControl className={classes.formControl}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label=" Travel departure date"
            style={{ width: (248) ,height:(55)}}
            className={classes.tr}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
      </FormControl>

      </Grid>
      <Grid item xs>
      <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Number of individuals</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            style={{ width: (248) }}
            className={classes.tr}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs>
      <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label1">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={age}
            onChange={handleChange}
            style={{ width: (248) }}
            className={classes.tr}

          >
            <MenuItem value={1}>First Class</MenuItem>
            <MenuItem value={2}>Business Class</MenuItem>
            <MenuItem value={3}>Economic Class</MenuItem>
          </Select>
        </FormControl>
      </Grid>
        <div className="form-group">
         
        </div>
        <Grid item>
        
        <Button  style={{textTransform: 'capitalize'}} type="submit" className="form-button">
            Search
          </Button>
        </Grid>
        </Grid>
      </form>
<PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
     
checked ={darkmode} />
      </ThemeProvider>
      </div>

    </div>
    </div>
    <Footer/> 

</main>
</div>
  
  );
};

export default VolsScreen;