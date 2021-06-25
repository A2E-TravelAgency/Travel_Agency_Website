import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import "./profile.css";
import {Grid} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import clsx from 'clsx';
import {Button, Switch} from '@material-ui/core';


import { createMuiTheme, ThemeProvider, makeStyles,withStyles } from "@material-ui/core/styles";

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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  grid: {
    width:'100%',
    margin:'0px'
  }, 
}));

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

const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [success1, setSuccess1] = useState("");
  const [usernamedata, setUsernameData] = useState("");
  const [emaildata, setEmailData] = useState("");
  const [roledata, setRoleData] = useState("");
  const [iddata, setIdData] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

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
      

        },
        typography: {
          fontFamily: [
            'Raleway'
          ].join(','),
          },});


  const handleTextUChange = (event) => {
    setUsername(event.target.value);

  };
  const handleTextEChange = (event) => {

    setEmail(event.target.value);
  };

  const [values, setValues] = useState({

    password: '',

    showPassword: false,
    confirmpassword: '',

    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword});
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 
  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/login");
    }
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
  
      try {
        const { data } = await axios.get("/private/admin", config);
        setUsernameData(data.data.username);
        setEmailData(data.data.email);
        setRoleData(data.data.role);
        setIdData(data.data._id);
        setUsername(data.data.username);
        setEmail(data.data.email);
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        setError2("You are not authorized please login");
      }
    };


    fetchPrivateDate();

  }, [history]);

    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      history.push("/login");
    }

 
    const [success, setSuccess] = useState("");
  
    const resetPasswordHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
  
      if (values.password !== values.confirmpassword) {
         setValues({ ...values, password :"" });
         setValues({ ...values, confirmpassword :"" });
         setTimeout(() => {
           setError("");
         }, 5000);
         return setError("Passwords don't match");
       }
  
      try {
        const { data } = await axios.put(
          `/private/admin/changepassword`,
          {
            email : emaildata,
            password : values.confirmpassword,
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
  

    const editUsernameEmailHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
  
      try {
        const { data } = await axios.put(
          `/private/admin/changecred`,
          {
            email : emaildata,
            newusername : username,
            newemail : email,
          },
          config
        );
  
        console.log(data);
        setSuccess1(data.data);
      } catch (error) {
        setError1(error.response.data.error);
        setTimeout(() => {
          setError1("");
        }, 5000);
      }
    };
  
    const classes =useStyles();

  return error2 ? (
    <span className="error-message">{error2}</span>
  ) :  (
    <>
    <div>
    <NavbarAdmin/> 
    <main>
    <ThemeProvider theme={darkmode ? darktheme : lighttheme}>
    <div className="profile">
    <div className={isActive ? 'vol-screen__picd': "profile__pic"}>

    <p className="profile__quote"> HELLO Admin {usernamedata}   :) </p>
    <div class="profileinputBox">
    <div
        className="profile__form"
      >
         {/* {privateData.map((user) =>{
        return( */}
          <table className={isActive ? 'tabled': "table"}>
            <tr>
              <td className="td font">Username</td>
              <td className="td tdy">{usernamedata}</td>
            </tr>
             <tr>
              <td className="td font">Email</td>
              <td className="td tdy">{emaildata}</td>
            </tr>

            <tr>
              <td className="font">Role</td>
              <td className="tdy">{roledata}</td>
            </tr> 
          </table> 
        {/* );
      })}    */}
    </div>
    <br/>
    <form
        className="profile__form adj" 
      >

    <Grid container justify="center" direction="column" alignItems="center" spacing={2} className={classes.grid} align="center">
    {error1 && <span className="error-message">{error1} </span>}
      {success1 && <span className="success-message">{success1} </span>}
    <Grid item xs={12} >
    <TextField id="filled-basic" label="Username" variant="filled"  value={username}  onChange={handleTextUChange} style={{ width: (250) }}/>
    </Grid>
    <Grid item xs={12}  >
    <TextField id="filled-basic1" label="Email" variant="filled" value={email} onChange={handleTextEChange}  style={{ width: (250) }} />
    </Grid>
    <Grid item>
        
        <Button  style={{textTransform: 'capitalize'}} type="submit" className="form-button" onClick = {editUsernameEmailHandler}>
            Edit
          </Button>
        </Grid>
        <br/> 
        {error && <span className="error-message">{error} </span>}
        {success && <span className="success-message">{success} </span>}
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
          <InputLabel htmlFor="filled-adornment-passwordd">Confirm Password</InputLabel>
          <FilledInput
            id="filled-adornment-passwordd"
            type={values.showConfirmPassword ? 'text' : 'password'}
            value={values.confirmpassword}
            onChange={handleChange('confirmpassword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility1"
                  onClick={handleClickShowCPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Grid item>
        
        <Button  style={{textTransform: 'capitalize'}} type="submit" className="form-button" onClick={resetPasswordHandler}>
            Change Password
          </Button>
        </Grid>
        <PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
     
checked ={darkmode} />
    </Grid>
    </form>
    </div>
    </div>
      </div>
      </ThemeProvider>
        <Footer/> 


    </main>
    </div>
    </>
  );
};

export default PrivateScreen;