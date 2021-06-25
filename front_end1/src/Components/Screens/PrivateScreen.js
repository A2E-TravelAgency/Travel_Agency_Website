import { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "./NavbarUser";
import Footer from "./Footer";

const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

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
        const { data } = await axios.get("/private/user", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      history.push("/login");
    }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
    <div>
    <NavbarUser/> 
      <main>
    <div>{privateData}</div>
    <button onClick = {logoutHandler}>Logout</button>
        <Footer/> 

    </main>
    </div>
    </>
  );
};

export default PrivateScreen;