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

import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


import Popup from "./AddUserPopUp";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import "./profile.css";


const PrivateAdminUsersScreen = ({ history, match }) => {
    const [usersdata, setUsersData] = useState(null);
    const [error2, setError2] = useState("");
    const [success1, setSuccess1] = useState("");
    const [openPopup, setOpenPopUp] = useState(false);

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#6649b8',
          color: theme.palette.common.white,
          
        },
        body: {
          fontSize: 13.5,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);
      
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
              
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
          
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
          
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  
    
  
  const fetchUsers = async () => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };


    try {
      const { data } = await axios.get(
        "/private/admin/users",
        config
      ).then(res => {
        // fetch success
        const allusers = res.data;
        setUsersData(allusers);

     });

    } catch (error) {
      setTimeout(() => {
        setError2("");
      }, 5000);
    }
  
  }; 
  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/login");
    }
    const fetchUsers = async () => {

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,          },
        };
    
    
        try {
          const { data } = await axios.get(
            "/private/admin/users",
            config
          ).then(res => {
            // fetch success
            const allusers = res.data;
            setUsersData(allusers);
  
         });
  
        } catch (error) {
          setTimeout(() => {
            setError2("");
          }, 5000);
        }
      
      };

      fetchUsers();

  }, [history]);
  
  
      
  const deleteUserHandler = async (id) => {

     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
       },
     };

     try {
       const { data } = await axios.delete(
         `/private/admin/users/delete/${id}`,
 
         config
       );

 
       setSuccess1(data.data);
       alert("User Deleted Successfully");
       fetchUsers();
     } catch (error) {
       setError2(error.response.data.error);
       setTimeout(() => {
         setError2("");
         alert(error2);
       }, 5000);
     }
  };

  
  const classes =useStyles();
    return error2 ? (
        <span className="error-message">{error2}</span>
      ) :  (

        <div>
        <NavbarAdmin/> 
        <main>
        <ThemeProvider theme={darkmode ? darktheme : lighttheme}>
        <div className="profile">
        <div className={isActive ? 'vol-screen__picd': "profile__pic"}>
        <p className="profile__quote">Users</p>

        <div class="usersinputBox">
        <div
        className="user__form"
      >
  

      <div className="userstable">
      <Paper className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">Username</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Password</StyledTableCell>
              <StyledTableCell align="left">Button</StyledTableCell>
            </TableRow>
          </TableHead>
      {usersdata &&
            usersdata.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
  
              return (
  
          <TableBody>
  
              <StyledTableRow key={user._id} hover role="checkbox" tabIndex={-1}>

                <StyledTableCell  component="th" scope="row">{user._id}</StyledTableCell>
                <StyledTableCell align="left">{user.role}</StyledTableCell>
                <StyledTableCell align="left">{user.username}</StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">{user.password}</StyledTableCell>
                 <StyledTableCell align="left"><Button  style={{textTransform: 'capitalize'}} type="submit" className="form-button" onClick={() => deleteUserHandler(user._id)} style={{ width: (50) , height:(30) , textTransform: 'capitalize'}}>Delete 
          </Button></StyledTableCell>
                
              </StyledTableRow>
   
          </TableBody>
              );
            })}
            </Table>
  
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          //count={usersdata.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
        <div style ={{paddingTop:(20),display:'flex'}}>
          <PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
          
      checked ={darkmode} />
      
      <Button  style={{textTransform: 'capitalize', margin:'auto'}} type="submit" className="form-button" startIcon = {<AddIcon/>} onClick = {()=> setOpenPopUp(true)}>Add a new Admin
              </Button>
          </div>
      </div>
      </div>
      </div>
  
  </div>
  </div>
  <Popup openPopup = {openPopup} setOpenPopUp = {setOpenPopUp}>

  </Popup>
      </ThemeProvider>
  
      <Footer/> 
  
  </main>
  </div>
    
    );
  };
  
  export default PrivateAdminUsersScreen;