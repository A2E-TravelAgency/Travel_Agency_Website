import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import clsx from 'clsx';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Grid} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";


import { createMuiTheme, ThemeProvider, makeStyles,withStyles } from "@material-ui/core/styles";


export default function AddUserPopUp(props){
    const {title, children, openPopup, setOpenPopUp} = props;
    const handleTextUChange = (event) => {
        setUsername(event.target.value);
    
      };
      const handleTextEChange = (event) => {
    
        setEmail(event.target.value);
      };
    
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");

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
      const addAdminHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
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
          const { data } = await axios.post(
            `/private/admin/users/add`,
            {
              username,
              email,
              role:'admin',
              password : values.confirmpassword,
            },
            config
          );
    
          console.log(data);
          setSuccess(data.data);
          alert("Admin Added Successfully")
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };
      const classes =useStyles();

    return(
        <Dialog open={openPopup}>
            <DialogTitle >
            <div style ={{display:'flex',justifyContent:'center',marginLeft:(20)}}>
            <div >Add Admin </div>
            <div ><Button startIcon = {<CloseIcon/>}  onClick={()=>setOpenPopUp(false)}></Button></div></div>
            </DialogTitle>
            <DialogContent>
            {error && <span className="error-message">{error} </span>}
            {success && <span className="success-message">{success} </span>}

                <Grid container justify="center" direction="column" alignItems="center" spacing={2} className={classes.grid} align="center">

                <Grid item xs={12} >
                <TextField id="filled-basic" label="Username" variant="filled"  value={username}  onChange={handleTextUChange} style={{ width: (250) }}/>
                </Grid>
                <Grid item xs={12}  >
                <TextField id="filled-basic1" label="Email" variant="filled" value={email} onChange={handleTextEChange}  style={{ width: (250) }} />
                </Grid>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
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
                <Button  style={{textTransform: 'capitalize', margin:'auto'}} type="submit" className="form-button" startIcon = {<AddIcon/>} onClick = {addAdminHandler}>Add a new Admin
              </Button>
              </Grid>
            </DialogContent>
        </Dialog>
    )
}