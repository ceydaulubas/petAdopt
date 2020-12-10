import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoImg from "../../images/PinClipart.com_ms-word-clipart_83496.png"

import AuthService from "../../services/auth-service";

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // Mimic lifecycle method when a component updates
  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  // function to log user out
  const logoutUser = () => {
    service.logout().then(() => {
      // reset state value
      setLoggedInUser(null);

      // reset getUser value
      props.getUser(null);
    });
  };

  if (loggedInUser) {
    return (

      <nav className="nav-style">
        <ul>
          <li className="welcome">
          Welcome, {loggedInUser.username} 🐾
          </li>

          <li>
            <Link to="/aboutpage"> About </Link>
          </li>

          <li>
            <Link to="/adopt"> Adopt</Link>
          </li>

          <li>
            <Link to="/findhome"> Find New Home </Link>
          </li>

          <li>
            <Link to="/userprofile"> User Profile</Link>
          </li>

          <Link to="/" onClick={logoutUser}>Logout</Link>

        </ul>
      </nav>
    );
  } else {
    return (

      <nav className="nav-style">
      <ul>

      <li className="logo">
      LIVE with PET
      {/* <img style={{ width: '150px', height: '50px' }}
					src={logoImg} alt="logoImg" ></img> */}
          </li>

        <li>
          <Link to="/" >Home</Link>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    );
  }
};

export default Navbar;
