import { useState ,useEffect} from "react";
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
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import {DataGrid} from '@material-ui/data-grid'
import {Line} from 'react-chartjs-2'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


import {airports} from "../../data/airports.js"
import "./style.css";
import "./VolsScreen.css";
import "./LoginScreen.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#6649b8',
    color: theme.palette.common.white,
    
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


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

  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#6649b8',
    }
  },

  table: {
    minWidth: 700,
  },
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

const VolsScreenAdmin = ({ history, match }) => {
  const [dataf, setDataf] = useState(null);
  const columns = [
    {field: 'origin', headerName: 'Origin'},
    {field: 'destination', headerName: 'Destination'},
  ]
  const [inputValue1, setinputValue] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
  const [number, setNumber] = React.useState('');
  const [classe, setClass] = React.useState('');
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


const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
        
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
        
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
const [page1, setPage1] = useState(0);
const [rowsPerPage1, setRowsPerPage1] = useState(10);
        
const handleChangePage1 = (event, newPage) => {
  setPage1(newPage);
};
        
const handleChangeRowsPerPage1 = (event) => {
  setRowsPerPage1(+event.target.value);
  setPage1(0);
};

const handleChange = (event) => {
  setNumber(event.target.value);
};
  const handleCChange = (event) => {
    setClass(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (event,value) => {
    setinputValue(value);
  };
  const handleInputDChange = (event,value) => {
    setDestination(value);
  };

  const formatDate=(date)=>{
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

const testHandler=(event)=>{
  const inputV= inputValue1.IATA ;
  console.log(inputV);
  console.log(inputV);
  console.log(inputV);
  console.log(inputV);
}

  const flightsHandler = async (e) => {
    e.preventDefault();

    const inputV= inputValue1.IATA ;
    const dest = destination.IATA;
    const dates = formatDate(selectedDate);
    const classes = classe;
    const nbr = number;

     const config = {
       header: {
         "Content-Type": "application/json",
       },
     };

     const desti= destination.country ;
     try {
      const { datafl } = axios.post(
        "/travel/flightsData",
        {

          desti,
          dates,

        },
        config
      );

    } catch (error) {
      setTimeout(() => {
   
      }, 5000);
    }

     try {
       const { data } = await axios.post(
         "/travel/flights",
         {
           inputV,
           dest,
           dates,
           nbr,
           classes,
         },
         config
       ).then(res => {
         // fetch success
         const allTickets = res.data;
         setDataf(allTickets);
       
         console.log(res.data);
      });
       history.push("/");
      
       console.log(data);
       console.log(data);
       console.log(data.data);
     } catch (error) {
       setTimeout(() => {
         setError("");
       }, 5000);
     }
    /*try{const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
  };
      await fetch("/travel/flights",requestOptions).then(res => {
        // fetch success
        return res.json
     }).then(jsonResponse => console.log(jsonResponse))
    }catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }*/
    //let allStatements = <div>Some Results</div>

  };
  const [flightdata, setflightData] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chart1Data, setChart1Data] = useState({});
  const [destinationData, setDestinationData] = useState([]);
  const [dateData, setDateData] = useState([]);

  const [error2, setError2] = useState("");
  useEffect(() => {
  
    const fetchData = async () => {
      let des = [];
      let dat = [];
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
    
        try {
          const { data } = await axios.get(
            "/private/admin/flightdata",
            config
          ).then(res => {
            // fetch success
            for (const dataObj of res.data.data){
                des.push(dataObj.destination)
                dat.push(dataObj.flightdate)

            }
            setChartData({
              labels: dat,
              datasets: [{
                  label: 'clients/dates',
                  lineTension: 0.1,
                  data: [12, 19, 3, 5, 2, 3],
                  fill:true,
                  backgroundColor: 
                      'rgba(255, 159, 64, 0.2)'
                  ,
                  borderColor: 'orange',
                  borderWidth: 2.5
              }]
          })
          setChart1Data({
            labels: des,
            datasets: [{
                label: 'clients/countries',
                lineTension: 0.1,
                data: [2, 9, 3, 5, 12, 30],
                fill:true,
                backgroundColor:  'rgba(102, 73, 184, 0.2)',
                borderColor: ['#6649b8'],
                borderWidth: 2.5
            }]
        })
            const alldata = res.data;
            setflightData(alldata);
  
         });
  
        } catch (error) {
            console.log(error)
        }
      

      };


      fetchData();

  }, [history]);
   
  // const airports = [{"name": "Goroka ","name": "Goroka ", "city": "Goroka", "country": "Papua New Guinea", "IATA": "GKA", "ICAO": "AYGA", "lat": "-6.081689834590001", "lon": "145.391998291", "timezone": "10", "id" : 1}, {"name": "Madang ", "city": "Madang", "country": "Papua New Guinea", "IATA": "MAG", "ICAO": "AYMD", "lat": "-5.20707988739", "lon": "145.789001465", "timezone": "10", "id" : 2}];
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
  limit: 500,
  stringify: ({ country, city, name, IATA }) => `${country} ${city} ${name} ${IATA}`
});

  return (


<div>
 <NavbarAdmin/> 
  <main>
  <ThemeProvider theme={darkmode ? darktheme : lighttheme}>

  <div className="vol-screen">
  <div className={isActive ? 'vol-screen__picd': "vol-screen__pic"} >
  <p className="vol-screen__quote"> “When once you have tasted flight, you will forever walk the earth with your eyes turned skyward, for there you have been, and there you will always long to return.”
<div>– Leonardo DaVinci</div></p>

      <div class="inputBox">
      <form
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
      value={inputValue1}
      onChange={handleInputChange}
      //inputValue={inputValue1}
      //onInputChange={(e) => setinputValue(e.target.value)}
     // onChange={(event, value) => console.log(value)}
      //onChange={(event, newValue) => setinputValue(newValue)}
      filterOptions={filterOptions}  
      getOptionLabel={({IATA, country, city }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        return `${IATA} - ${country} - ${city}`;
      }}
      getOptionSelected={(option, value) => option.value === value.value}
      //getOptionLabel={({ IATA }) => { this is how our option will be displayed when selected remove the `id` here return `${IATA}`;}}
      style={{ width: (400) }}
      className={classes.tr}
      renderInput={(params) => <TextField {...params} label="Departure"   variant="outlined" />}
     // open={inputValue1.length > 2}
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
      value={destination}
      onChange={handleInputDChange}
      filterOptions={filterOptions}  
      getOptionLabel={({IATA, country, city }) => {
        // this is how our option will be displayed when selected
        // remove the `id` here
        return `${IATA} - ${country} - ${city}`;
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
            format="yyyy-MM-dd"
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
            value={number}
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
            value={classe}
            onChange={handleCChange}
            style={{ width: (248) }}
            className={classes.tr}

          >
            <MenuItem value={'F'}>First Class</MenuItem>
            <MenuItem value={'C'}>Business Class</MenuItem>
            <MenuItem value={'M'}>Economic Class</MenuItem>
          </Select>
        </FormControl>
      </Grid>
        <div className="form-group">
         
        </div>
        <Grid item>
        
        <Button  style={{textTransform: 'capitalize'}} type="submit" className="form-button" onClick={flightsHandler}>
            Search
          </Button>
        </Grid>
        </Grid>
      </form>
<PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
     
checked ={darkmode} />
      </div>

    </div>
    </div>
    <div className="back">
    <div className="datatable">
    <Paper className={classes.root}>
    <TableContainer component={Paper} className={classes.container}>
    <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Company</StyledTableCell>
            <StyledTableCell align="right">Plane</StyledTableCell>
            <StyledTableCell align="right">Departure airport</StyledTableCell>
            <StyledTableCell align="right">Destination aiport</StyledTableCell>
            <StyledTableCell align="right">Departure</StyledTableCell>
            <StyledTableCell align="right">Arrival</StyledTableCell>
            <StyledTableCell align="right">Price&nbsp;(DH)</StyledTableCell>
            <StyledTableCell align="right">Link</StyledTableCell>
          </TableRow>
        </TableHead>
    {dataf &&
          dataf.tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flight, index) => {

            return (

        <TableBody>

            <StyledTableRow hover role="checkbox" tabIndex={-1}>
              <StyledTableCell component="th" scope="row">
                {flight.compagnie}
              </StyledTableCell>
              <StyledTableCell align="right">{flight.plane}</StyledTableCell>
              <StyledTableCell align="right">{flight.origin}</StyledTableCell>
              <StyledTableCell align="right">{flight.destination}</StyledTableCell>
              <StyledTableCell align="right">{flight.deptime}</StyledTableCell>
              <StyledTableCell align="right">{flight.arrtime}</StyledTableCell>
              <StyledTableCell align="right">{flight.price}</StyledTableCell>
              <StyledTableCell align="right"><a href={flight.url} target="_blank">Redirect</a></StyledTableCell>
            </StyledTableRow>
 
        </TableBody>
            );
          })}
          </Table>

    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        //count={dataf.tickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    <div className="datatable">
    <Paper className={classes.root}>
    <TableContainer component={Paper} className={classes.container}>
    <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right">Destination</StyledTableCell>
            <StyledTableCell align="right">Flight date</StyledTableCell>
            <StyledTableCell align="right">Action date</StyledTableCell>
          </TableRow>
        </TableHead>
    {flightdata &&
          flightdata.data.slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1).map((flight, index) => {

            return (

        <TableBody>

            <StyledTableRow hover role="checkbox" tabIndex={-1}>
              <StyledTableCell component="th" scope="row">
                {flight.username}
              </StyledTableCell>
              <StyledTableCell align="right">{flight.destination}</StyledTableCell>
              <StyledTableCell align="right">{flight.flightdate}</StyledTableCell>
              <StyledTableCell align="right">{flight.actiondate}</StyledTableCell>

            </StyledTableRow>
 
        </TableBody>
            );
          })}
          </Table>

    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        //count={dataf.tickets.length}
        rowsPerPage={rowsPerPage1}
        page={page1}
        onChangePage={handleChangePage1}
        onChangeRowsPerPage={handleChangeRowsPerPage1}
      />
    </Paper>
    </div>
    <div className="datatable" >
    <div className="chart" >
    <Line
        data= {chartData}
    options= {{
      responsive: true,
        scales: {
            y: {
                grid:{display:false,},
                beginAtZero: true
            },
           
            x: {
                grid:{display:false,},
                beginAtZero: true
            }
        }
    }}/></div>
    <div className="chart" >
    <Line
        data= {chart1Data}
        
    options= {{
      responsive: true,
        scales: {
            y: {
                grid:{display:false,},
                beginAtZero: true
            },
           
            x: {
                grid:{display:false,},
                beginAtZero: true
            }
        }
    }}/></div>
    </div>
    </div>
    </ThemeProvider>

    <Footer/> 

</main>
</div>
  
  );
};

export default VolsScreenAdmin;