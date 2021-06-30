import React,{useState , useEffect} from 'react';
import Axios from 'axios';
import { makeStyles, Button , Grid, Switch} from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";

import './organizedTrips.css';
import TripsCard from "./OrganizedTripsCard";


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


const useStyles = makeStyles({
  muiVersion: {
    background: 'linear-gradient(to bottom right, #ccc, #eee)',
    marginTop: '4em',
    textAlign: 'center',
    padding: '1em',
    borderRadius: '4px',
  },
  btn: {
    background: '#333',
    color: 'white',
    fontSize: '2.4rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    padding: '1em 2.4em',
    boxShadow: '0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.466)',
    '&:hover': {
      background: '#111',
      transform: 'translateY(-0.25rem)',
      boxShadow: '0.45rem 0.45rem 0.45rem rgba(153, 153, 153, 0.651)',
    },
  },
  imageSection: {
    height: '20em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    width: '25vw',
    height: '25vw',
    minWidth: '10em',
    minHeight: '10em',
    maxWidth: '20em',
    maxHeight: '20em',
    objectFit: 'contain',
  },
  nopic: { color: 'black' },
  link: { color: 'black' },
  
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }, grid: {
    width:'80%',
    margin:'0px'
  },
   grid1: {
    width:'100%',
    margin:'0px'
  },
  tr: {
    borderRadius:theme.shape.borderRadius,
    transition: theme.transitions.create(["background", "background-color"], {
      duration: theme.transitions.duration.complex,}),
    '&:hover': {
      backgroundColor: "rgba(60, 60, 60, 0.1)",

    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

const  OrganizedTripsAdminScreen =  ({history}) => {

  const Load =  () => {
    Axios.get('http://localhost:5000/organizedTrips/read' ).then((response)=>{
      setVoyageList(response.data);
        })};

  useEffect(()=>{

        Load();
  },[history])



  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);

  const handleFile = ([file]) => file && setImageFile(file);
  const handleDelete = () => setImageFile(null);
  const [voyageList,setVoyageList] = useState([]);

  const [villeDep,setVilleDep] = useState('');
  const [villeArr,setVilleArr] = useState('');
  const [dateDep,setDateDep] = React.useState(new Date(Date.now()));
  const [dateArr,setDateArr] = React.useState(new Date(Date.now()));
  const [nbPlace,setNbPlace] = useState('');
  const [price,setPrice] = useState('');
  const [isActive, setActive] = useState(false);

  const formatDate=(date)=>{
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

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
      
          
        },
        typography: {
          fontFamily: [
            'Raleway'
          ].join(','),
          },});





  const addToVoyages= async()=>{

    await Axios.post("http://localhost:5000/organizedTrips/insert" , {villeDep:villeDep ,
    villeArr:villeArr,dateDep:formatDate(dateDep),dateArr:formatDate(dateArr),nbPlace:nbPlace,
    price:price,image:imageId});
    await window.location.reload();
  }



  const insertImage=([file])=>{
    const formData = new FormData();

    formData.append("image",file, file.name);
    Axios.post("http://localhost:5000/organizedTrips/insertimage" , formData, {
      onUploadProgress: (progressEvent) => {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
        console.log(
          'upload progress: ',
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
      },
    })
    .then(({ data }) => {
      setImageId(data);
      setImageFile(null);
      setCurrentlyUploading(false);
      setShow(false);
    })
    .catch((err) => {
      if (err.response.status === 400) {
        const errMsg = err.response.data;
        if (errMsg) {
          console.log(errMsg);
          alert(errMsg);
        }
      } else if (err.response.status === 500) {
        console.log('db error');
        alert('db error');
      } else {
        console.log('other error');
      }
      setCurrentlyUploading(false);
      setShow(false);
    });
  }

  const deleteVoyage=(id)=>{
    Axios.delete(`http://localhost:5000/organizedTrips/delete/${id}`  )
  }

 

  // const onChangeFile = e => {
  //   setFilename(e.target.files[0]);
  // }


  // let dropdown = document.getElementById('locality-dropdown');
  // dropdown.length = 0;
  
  // let defaultOption = document.createElement('option');
  // defaultOption.text = 'Choose State/Province';
  
  // dropdown.add(defaultOption);
  // dropdown.selectedIndex = 0;
  
  // const url = 'front_end1/src/cities.json';
  
  // fetch(url)  
  //   .then(  
  //     function(response) {  
  //       if (response.status !== 200) {  
  //         console.warn('Looks like there was a problem. Status Code: ' + 
  //           response.status);  
  //         return;  
  //       }
  
  //       // Examine the text in the response  
  //       response.json().then(function(data) {  
  //         let option;
      
  //       for (let i = 0; i < data.length; i++) {
  //           option = document.createElement('option');
  //           option.text = data[i].ville;
  //           dropdown.add(option);
  //       }    
  //       });  
  //     }  
  //   )  
  //   .catch(function(err) {  
  //     console.error('Fetch Error -', err);  
  //   });

  return (
    <div>
      <NavbarAdmin/> 
      <main>
      <ThemeProvider theme={darkmode ? darktheme : lighttheme}>

        <div className="vol-screen">
        <div className={isActive ? 'vol-screen__picd': "voyage__pic"} >
        <p className="vol-screen__quote"> “The world is a book and those who do not travel read only one page.”
        <div>– Saint Augustine</div></p>

            <div class="inputBox">
            <form
              className="vol-screen__form"
            >
              <h3 className="vol-screen__title">Trips management</h3>
          <div class="App" >
          {/* <select id="locality-dropdown" name="locality">
          </select> */}
                      <div class ="information">
                      <Grid container justify="center" direction="row" alignItems="center" spacing={2} className={classes.grid} align="center">
                      <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                        <TextField id="vd" 
                          label="Departure" 
                          variant="filled"  
                          onChange={(event)=>{
                            setVilleDep(event.target.value);
                            }}
                          style={{ width: (300) }}/>
                          </FormControl>
                          </Grid>

                      <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                        <TextField id="va" 
                          label="Arrival" 
                          variant="filled"  
                          onChange={(event)=>{
                            setVilleArr(event.target.value);
                            }}
                          style={{ width: (300) }}/>
                          </FormControl>
                          </Grid>

                        <Grid item xs={12} md={6} >
                        <FormControl className={classes.formControl}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="yyyy-MM-dd"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label=" Trip Departure date"
                                  style={{ width: (300) ,height:(55)}}
                                  className={classes.tr}
                                  value={dateDep}
                                  onChange={(date)=>{
                                    setDateDep(date);
                                    }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                            </MuiPickersUtilsProvider>
                            </FormControl>
                          </Grid>
                        <Grid item xs={12} md={6} >
                        <FormControl className={classes.formControl}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="yyyy-MM-dd"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label=" Trip Arrival date"
                                  style={{ width: (300) ,height:(55)}}
                                  className={classes.tr}
                                  value={dateArr}
                                  onChange={(date)=>{
                                    setDateArr(date);
                                    }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                            </MuiPickersUtilsProvider>
                            </FormControl>
                          </Grid>
                        <Grid item xs={12} md={6} >
                        <FormControl className={classes.formControl}>
                        <TextField 
                            type="number"
                            variant="filled" 
                            InputProps={{
                                inputProps: { 
                                    max: 100, min: 0 
                                }
                            }}
                            style={{ width: (300) }}
                            label="Number of available seats"
                            onChange={(event)=>{
                              setNbPlace(event.target.value);
                              }}
                        />
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6} >
                        <FormControl className={classes.formControl}>
                        <TextField id="filled-basic" 
                          label="Price" 
                          variant="filled"  
                          onChange={(event)=>{
                            setPrice(event.target.value);
                            }}
                          style={{ width: (300) }}/>
                          </FormControl>
                          </Grid>
                          
                        </Grid>
                            <div className={classes.muiVersion}>
                              <div className={classes.imageSection}>
                                {imageId ? (
                                  <>
                                    <img
                                      className={classes.img}
                                      src={`/organizedTrips/insertimage/${imageId}`}
                                      alt='material ui version preview'
                                    />
                                    <a
                                      className={classes.link}
                                      href={`/organizedTrips/insertimage/${imageId}`}
                                      target='_blank'
                                    >
                                      link
                                    </a>
                                  </>
                                ) : (
                                  <p className={classes.nopic}>no uploaded picture yet</p>
                                )}
                              </div>
                              <Button style={{textTransform: 'capitalize',width:(600)}}  className="form-button" onClick={() => setShow(true)}>
                                Upload picture
                              </Button>
                              <DropzoneDialog
                                open={show}
                                onChange={handleFile}
                                onClose={() => setShow(false)}
                                onDelete={handleDelete}
                                acceptedFiles={['image/jpeg', 'image/png']}
                                maxFileSize={5000000}
                                filesLimit={1}
                                showFileNamesInPreview={false}
                                showFileNames={false}
                                dropzoneText={'Drop it here'}
                                getFileAddedMessage={() => 'file added!'}
                                getFileRemovedMessage={() => 'file removed!'}
                                onAlert={(alert) => console.log({ alert })}
                                getFileLimitExceedMessage={() => 'file is too big'}
                                getDropRejectMessage={(file) => {
                                  if (file.size > 5000000) return 'file is too big';
                                  else return 'invalid file type';
                                }}
                                onSave={insertImage}
                              />
                            </div>
                        <Button style={{textTransform: 'capitalize',width:(300),margin:(50)}}  className="form-button" onClick={addToVoyages} > ADD</Button>
                        </div>
                        </div>
                        </form>
                            <PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
                                
                            checked ={darkmode} />
                          </div>
                        
                       
                        
                        </div>
                        </div>
                        
                    <div className={isActive ? 'voyagesB': "voyages"}>
                      <h1 className={isActive ? 'h1B': "h1"}>Organized trips</h1>
                      <Grid container spacing={2} alignItems="center" justify="center" className={classes.grid1}>
                      {voyageList.map((val,key)=>{
                        const event = new Date(val.voyageDateDepart);
                        const event2 = new Date(val.voyageDateArrive);
                        const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };

                        return<Grid item key={val._id} xs={12} sm={6} md={4} lg={3} >
                              <TripsCard val={val} />
                            </Grid> 
                        // <div onClick={()=>showVoy(val._id)} class="voyage" key={key}>
                        //    <h3>Départ: <br></br>{val.voyageDepart}</h3>
                        //    <h3>Arrivé:<br></br> {val.voyageArrive}</h3>
                        //    <h3>Date de départ:<br></br> {event.toLocaleDateString(undefined, options)}</h3>
                        //    <h3>Date d'Arrivé:<br></br> {event2.toLocaleDateString(undefined, options)}</h3>
                        //    <h3>Prix: <br></br> {val.voyagePrix} DH</h3>
                        //    <h3>Places:<br></br> {val.voyagePlaces}</h3>
                        //    <img
                        //               className={classes.img}
                        //               src={`/organizedTrips/insertimage/${val.image}`}
                        //               alt='material ui version preview'
                        //             />
                        //    <button className = "voyagebtn" onClick={()=>deleteVoyage(val._id)}  > Delete</button>


                        //  </div>

                      })}
                  </Grid>
                  </div> 
                  </ThemeProvider>
                  <Footer/> 
             
        </main>
      
</div>
);
}

export default OrganizedTripsAdminScreen;
