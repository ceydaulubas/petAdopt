import React, { useState } from "react";
import axios from "axios";

const EditUserProfileForm = (props) => {
    const [formState, setFormState] = useState({
        username: props.theUser.username,
        email: props.theUser.email,
        phone: props.theUser.phone,
        // imageUrl: props.theUser.imageUrl,
    });

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
        <div>
            <hr />
            <h3>Edit User form</h3>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">E-mail:</label>
                <input
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="phone">Phone:</label>
                <input
                    type="number"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                />
                {/* <label htmlFor="imageUrl">Image:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formState.imageUrl}
                    onChange={handleInputChange}
                /> */}

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default EditUserProfileForm;
