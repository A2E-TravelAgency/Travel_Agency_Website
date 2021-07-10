import React from 'react';
import "./style.css";
import "../../css/all.css";
import { useState } from "react";

import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";


function NavbarUser () {
  const [darkmode, setDarkmode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkmode ? 'dark': 'light',
   
      },});

      const logoutHandler = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("id");
      }    ;
  return (
    <ThemeProvider theme={theme}>

    <body>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <a href="/user" class="nav-link">
          <span class="link-text logo-text">Nomadic</span>
          <i class="fad fa-compass"></i>
        </a>
      </li>

      <li class="nav-item">
        <a href="/user/Form" class="nav-link">
        <i class="fad fa-hotel"></i>
          <span class="link-text">Hotels</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/user/flights" class="nav-link">
        <i class="fad fa-plane-departure"></i>
          <span class="link-text">Flights</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/user/organizedTrips" class="nav-link">
        <i class="fad fa-map-marked-alt" ></i>
          <span class="link-text">Organized Trips</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/user/chat" class="nav-link">
        <i class="fad fa-comments-alt"></i>
          <span class="link-text">Chat</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/user/profile" class="nav-link">
        <i class="fad fa-address-card"></i>
          <span class="link-text">Profile</span>
        </a>
      </li>

      <li class="nav-item" onClick = {logoutHandler}>
        <a href="/login" class="nav-link">
        <i class="fad fa-sign-out-alt"></i>
          <span class="link-text">Log Out</span>
        </a>
      </li>

      

    </ul>
  </nav>

</body>
</ThemeProvider>
  );
};

export default NavbarUser;