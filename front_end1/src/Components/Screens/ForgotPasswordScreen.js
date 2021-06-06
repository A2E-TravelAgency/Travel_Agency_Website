import { useState } from "react";
import axios from "axios";
import "./LoginScreen.css";
import Navbar from "./Navbar";


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/authentification/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
        <div className="forgotpass-wrap">
          <form
            onSubmit={forgotPasswordHandler}
            className="login-screen__form"
          >
            <h3 className="login-screen__title">Forgot Password ?</h3>
            

            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
            <div className="form-group">
              <p className="login-screen__subtext">
                Please enter the email address you register your account with. We
                will send you reset password confirmation to this email
              </p>
              <input
                type="email"
                required
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="form-buttn">
              Send
            </button>
          </form>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordScreen;