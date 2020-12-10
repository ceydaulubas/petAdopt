import React, { useState } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import UploadService from "../../../services/upload-service";

import video from "../../../videos/dogandchildren.mp4"

const initialState = { animal: "", petname: "",breed: "", gender: "", color: "", age: "", comment: "", imageUrl: "" };

const AddPetForm = (props) => {
  const [formState, setFormState] = useState(initialState);

  const service = new UploadService();

  // Function handler for input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Function to uploading a file
  const handleFileUpload = (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    // Creates a new FormData object that will take the file upload data
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    // upload the data to cloudinary
    service
      .upload(uploadData)
      .then((response) => {
        // The response from uploading to cloudinary is the url which will be saved in the database.
        console.log("response is: ", response);
        setFormState({ ...formState, imageUrl: response.cloudinaryUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // Function handler for form submission
  const handleFormSubmit = (event) => {
    // Prevent default form action
    event.preventDefault();

    // Extract values to use with axios call
    const { animal, petname, breed, gender, color, age, comment, imageUrl } = formState;

    // Make api call to the backend to save form data
    axios
      .post(
        "http://localhost:5000/api/pets",
        { animal, petname, breed, gender, color, age, comment, imageUrl },
        { withCredentials: true }
      )
      .then(() => {
        setFormState(initialState);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="videoBig">
      <video autoPlay loop muted poster={video}>
        <source src={video} type='video/mp4' />
      </video>
      <form onSubmit={handleFormSubmit} className="add-pet-form" >
        <h3><strong>FIND NEW HOME YOUR PET</strong></h3>
        <label >Choose an animal:</label>
        <select name="animal" value={formState.animal} onChange={handleInputChange}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <br />
        <label>Pet Name:</label>
        <input
          type="text"
          name="petname"
          value={formState.petname}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br/>
        <label>Breed:</label>
        <input
          type="text"
          name="breed"
          value={formState.breed}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br />
        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formState.gender}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br />
        <label>Color:</label>
        <input
          type="text"
          name="color"
          value={formState.color}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br />
        <label>Age:</label>
        <input
        type="text"
          name="age"
          value={formState.age}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br />
        <label htmlFor="comment">Comment:</label>
        <textarea
          name="comment"
          value={formState.comment}
          onChange={handleInputChange}
          className="txtb1"
        />
        <br />
        <label>Image:</label>
        <input 
        type="file" 
        name="imageUrl" 
        onChange={handleFileUpload} 
        className="txtb1"
        />
        <br />
        {formState.imageUrl ? (
          <button type="submit" >Submit</button>
        ) : (
            <button type="submit" >
            {/* onClick="/adopt" */}
              Submit
            </button>
          )}
      </form>
    </div>
  );
};

export default withRouter(AddPetForm);

