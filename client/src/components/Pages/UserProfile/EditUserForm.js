import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserProfileForm = (props) => {
    const [formState, setFormState] = useState({
    });
    const getSingleUser = () => {
        // get the 'id' from url via 'props.match.params' object
        const id = props.loggedInUser._id;

        // api call to the server to retrieve a single object
        axios
            .get(`http://localhost:5000/api/userprofile/${id}`, {
                withCredentials: true,
            })
            .then((responseFromApi) => {
                console.log(responseFromApi);
                setFormState(responseFromApi.data);
            })
            .catch((error) => console.error(error));
    };
    useEffect(getSingleUser, [props.match.params]);

    // Function handler to submit form
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // form state data to pass with the api call
        const { username, email, phone } = formState;

        axios
            .put(
                `http://localhost:5000/api/user/${props.theUser._id}`,
                {
                    username,
                    email,
                    phone,
                    //   imageUrl
                },
                { withCredentials: true }
            )
            .then(() => {
                // run method to call api method to get a single user
                props.getThePet();

                // after submitting the form, 'props.history.push' can be used to redirect to 'users'
                props.history.push("/user");
            })
            .catch((error) => console.error(error));
    };

    // Function handler to monitor the new changes in the inputs
    const handleInputChange = (event) => {
        // Data from the input field
        const { name, value } = event.target;

        // Set new form data
        setFormState({ ...formState, [name]: value });
    };

    return (
        <div className="edit-user-form">
            <h3>Edit User form</h3>
            <hr />
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username"><b>Username:</b></label>
                <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleInputChange}
                    className="txtbe"
                />
                <label htmlFor="email"><b>E-mail:</b></label>
                <input
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="txtbe"
                />
                <label htmlFor="phone"><b>Phone:</b></label>
                <input
                    type="number"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="txtbe"
                />
                <label htmlFor="imageUrl"><b>Image:</b></label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formState.imageUrl}
                    onChange={handleInputChange}
                />
                <br />
                <input type="submit" value="Submit" style={{ marginTop:"30px" }} />
            </form>
        </div>
    );
};

export default EditUserProfileForm;
