import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";
import Image from "../../images/cd.jpg"
import "./Auth.css";
import {withRouter} from 'react-router-dom';

const initialState = { username: "", email: "", phone: "", imageUrl: "", password: "" };

const Signup = (props) => {
    const [regForm, setRegForm] = useState(initialState);
    const [regErrorMsg, setRegErrorMsg] = useState("");

    const service = new AuthService();

    // Form submission handler
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const { username, email, phone, imageUrl, password } = regForm;

        // Use the service.signup method to make a call to the back end and sign the user up
        service
            .signup(username, email, phone, imageUrl, password)
            .then((response) => {
                setRegForm(initialState);
                props.getUser(response);
                props.history.push("/aboutpage");
            })
            .catch((error) => {
                const { message } = error.response.data;
                setRegErrorMsg(message);
                console.log(error);
            });
    };

    // Change handler
    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegForm({ ...regForm, [name]: value });
    };

    return (
        <div className="signup-container" style={{ backgroundImage: `url(${Image})`, backgroundSize: "cover", width: "100%", height: "800px",  marginTop:"-100px"}} >
            <div className="signup-form">
                <form onSubmit={handleFormSubmit}>
                    <h1>Sign Up</h1>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={regForm.username}
                        onChange={handleChange}
                        required
                        className="txtb"
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={regForm.email}
                        onChange={handleChange}
                        required
                        className="txtb"
                    />

                    <label>Phone:</label>
                    <input
                        type="number"
                        name="phone"
                        value={regForm.phone}
                        onChange={handleChange}
                        required
                        className="txtb"
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={regForm.password}
                        onChange={handleChange}
                        className="txtb"
                    />

                    <label>Image:</label>
                    <input
                        type="file"
                        name="imageUrl"
                        value={regForm.imageUrl}
                        onChange={handleChange}
                        required
                        className="txtb"
                    />

                    <input type="submit" value="Signup" className="signup-btn" />
                </form>
                <br />

                {regErrorMsg && <span style={{ color: "red" }}>{regErrorMsg}</span>}

                <p>
                    Already have account?
        <Link to={"/login"}> Login</Link>
                </p>
            </div>
        </div>
    );

};

export default withRouter (Signup);

