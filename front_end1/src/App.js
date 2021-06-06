import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Components/Routing/PrivateRoute.js";
import PrivateScreen from "./Components/Screens/PrivateScreen.js";
import LoginScreen from "./Components/Screens/LoginScreen.js";
import RegisterScreen from "./Components/Screens/RegisterScreen.js";
import ForgotPasswordScreen from "./Components/Screens/ForgotPasswordScreen.js";
import PasswordResetScreen from "./Components/Screens/PasswordResetScreen.js";
import VolsScreen from "./Components/Screens/VolsScreen.js";



const  App =  () => {
  return (
    <Router>
      <div className="app" >
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen}/>
          <Route exact path="/login" component={LoginScreen}/>
          <Route exact path="/register" component={RegisterScreen}/>
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
          <Route exact path="/passwordreset/:resetToken" component={PasswordResetScreen}/>
          <Route exact path="/flights" component={VolsScreen}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
