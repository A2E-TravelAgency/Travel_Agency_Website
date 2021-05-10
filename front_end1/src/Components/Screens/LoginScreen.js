import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";



const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
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

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-screen__pic">
        <div className="wrap">
          <form onSubmit={loginHandler} className="login-screen__form">
            <h3 className="login-screen__title">LOGIN</h3>
            <h6 className="texte">Welcome to 2EA Travel! <br/>Please type your email and password to sign in to your account</h6>

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
  );
};

export default LoginScreen;