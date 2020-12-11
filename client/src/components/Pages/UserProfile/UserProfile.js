import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./UserProfile.css";
import EditUserForm from "./EditUserForm";

const UserProfilePage = (props) => {
    const [details, setDetails] = useState({});

    // function to make api call to the backend to retrieve a single object from the database
    const getSingleUser = () => {
        // get the 'id' from url via 'props.match.params' object
        const  id  = props.loggedInUser._id;

        // api call to the server to retrieve a single object
        axios
            .get(`http://localhost:5000/api/userprofile/${id}`, {
                withCredentials: true,
            })
            .then((responseFromApi) => {
                console.log(responseFromApi);
                setDetails(responseFromApi.data);
            })
            .catch((error) => console.error(error));
    };

    // useEffect to mimic componentDidMount(). It'll get run anytime there is any change to the props.match.params value coming in.
    useEffect(getSingleUser, [props.match.params]);

    // function to render the edit form.
    const renderEditForm = () => {
        // Check if there is some value in the details state
        if (!details.username || !details.email || !details.phone) {
            // run the api call if the state isn't filled
            getSingleUser();
        } else {
            // render the edit form
            // pass down the details from state as props to form, in order to edit
            // pass down the user
            return (
                <EditUserForm
                    theUser={details}
                    getTheUser={getSingleUser}
                    {...props}
                />
            );
        }
    };

    // function to delete the user account
    const deleteUser = () => {
        // get the 'id' from url via 'props.match.params' object
        const { id } = props.match.params;

        // api call to the delete route in the backend
        axios
            .delete(`http://localhost:5000/api/user/${id}`, {
                withCredentials: true,
            })
            .then((results) => {
                // after submitting the form, 'props.history.push' can be used to redirect to 'user'
                props.history.push("/user");
            })
            .catch((error) => console.error(error));
    };

    const ownershipCheck = (user) => {
        if (props.loggedInUser && user.owner === props.loggedInUser._id) {
            return (
                <div>
                    <div>{renderEditForm()} </div>
                    <button onClick={() => deleteUser(details._id)}>
                        Delete User Account
          </button>
          {/* after deleting account, how I go to openinf page */}
                </div>
            );
        }
    };

    return (
        <div className="userprofile-container">
            <div className="userprofile">
                <h3>Hello,{details.username}</h3>
                <ul>
                    {/* <img src={details.imageUrl} alt="userImg"  style={{  width: "50%", height: "50%" }}/> */}
                    <li style={{ listStyleType: "none" }}><b>Username:</b> {details.username}</li>
                    <li style={{ listStyleType: "none" }}><b>E-mail:</b> {details.email}</li>
                    <li style={{ listStyleType: "none" }}><b>Phone:</b> {details.phone}</li>
                </ul>
                {ownershipCheck(details)}
                <Link to= {`/edituser/${details._id}`} className="edit-user-btn">Edit User</Link>
                {/* <button className="back-to-pets-btn" onClick={() => {{deleteUser(detail._id)}}> Delete pet </button> */}
            </div>
            
        </div>
    );
};


export default UserProfilePage;





