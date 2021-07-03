import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      
      if(localStorage.role == "user"){
        history.push("/user/profile");
      }else if(localStorage.role == "admin"){
        history.push("/admin/profile");
      }

    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/authentification/login",
        { email, password },
        config
      );

     localStorage.setItem("authToken", data.token);
     localStorage.setItem("role", data.role);
     localStorage.setItem("id", data.id);
     localStorage.setItem("username", data.username);
      console.log(localStorage);
     if(localStorage.role == "user"){
      history.push("/user/profile");
    }else if(localStorage.role == "admin"){
      history.push("/admin/profile");
    }

      
    } catch (error) {
      //setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
<div>
 <Navbar/> 
  <main>
    <div className="login-screen">
      <div className="login-screen__pic">
        <div className="wrap">
          <form onSubmit={loginHandler} className="login-screen__form">
            <h3 className="login-screen__title">LOGIN</h3>
            <h6 className="texte">Welcome to Nomadic Travel! <br/>Please type your email and password to sign in to your account</h6>

            {error && <span className="error-message">{error}</span>}
            <div className="form-group">
              <input
                type="email"
                required
                id="email"
                placeholder="Email "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
            </div>
            <div className="form-group">
              
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
            </div>
            <span className="login-screen__forgotpassword">
              <Link to="/forgotpassword" className="login-screen__forgotpassword">
                  Forgot Password?
              </Link>
            </span>
            <button type="submit" className="form-buttn">
              Login
            </button>
           
            <span className="login-screen__subtext">
              Don't have an account? <Link to="/register" className="login-screen__subtext">Register</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
    <Footer/> 
  </main>
</div>
  );
};

export default LoginScreen;