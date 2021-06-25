import { useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import "./style.css";
import Navbar from "./Navbar";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/user/profile");
    }
  }, [history]);
  
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/authentification/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/user/profile");
    } catch (error) {
      setError(error.response.data.error);
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
          <div className="register-wrap">
            <form onSubmit={registerHandler} className="register-screen__form">
              <h3 className="login-screen__title">REGISTER</h3>
              <h6 className="texte">Welcome to 2EA Travel! <br/>Please type your informations to sign up to our website</h6>
              {error && <span className="error-message">{error}</span>}
              <div className="form-group">
                <input
                  type="text"
                  required
                  id="name"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  required
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  required
                  id="confirmpassword"
                  autoComplete="true"
                  placeholder="Confirm password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="form-buttn">
                Sign up
              </button>

              <span className="login-screen__subtext">
                Already have an account? <Link to="/login" className="login-screen__subtext">Login</Link>
              </span>
            </form>
            </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default RegisterScreen;