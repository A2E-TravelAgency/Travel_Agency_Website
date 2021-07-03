import React from 'react';
import "./style.css";
import "../../css/all.css";
import { useState } from "react";

import { createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";


function Navbar () {
  const [darkmode, setDarkmode] = useState(false);
  const theme = createMuiTheme({
    palette: {
      type: darkmode ? 'dark': 'light',
   
      },});
  return (
    <ThemeProvider theme={theme}>

    <body>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <a href="/" class="nav-link">
          <span class="link-text logo-text">Nomadic</span>
          <i class="fad fa-compass"></i>
        </a>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
        <i class="fad fa-hotel"></i>
          <span class="link-text">Hotels</span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/flights" class="nav-link">
        <i class="fad fa-plane-departure"></i>
          <span class="link-text">Flights</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/organizedTrips" class="nav-link">
        <i class="fad fa-map-marked-alt" ></i>
          <span class="link-text">Organized Trips</span>
        </a>
      </li>

      <li class="nav-item">
        <a href="/login" class="nav-link">
        <i class="fad fa-sign-in-alt"></i>
          <span class="link-text">Log in</span>
        </a>
      </li>

      

    </ul>
  </nav>

</body>
</ThemeProvider>
  );
};

export default Navbar;