import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pet.css";

import EditPetForm from "./Forms/EditPetForm";

const PetDetails = (props) => {
  const [details, setDetails] = useState({});
console.log('details', details);
console.log("props.match.params", props.match.params);
  // function to make api call to the backend to retrieve a single object from the database
  const getSinglePet = () => {
    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;
    // api call to the server to retrieve a single object
    axios
      .get(`http://localhost:5000/api/pets/${id}`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        console.log(responseFromApi);
        setDetails(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  // useEffect to mimic componentDidMount(). It'll get run anytime there is any change to the props.match.params value coming in.
  useEffect(getSinglePet, [props.match.params]);

  // function to render the edit form.
  const renderEditForm = () => {
    // Check if there is some value in the details state
    if (!details.animal || !details.petname || !details.breed || !details.gender || !details.color || !details.age || !details.comment) {
      // run the api call if the state isn't filled
      getSinglePet();
    } else {
      // render the edit form
      // pass down the details from state as props to form, in order to edit
      // pass down the pet
      return (
        <EditPetForm
          thePet={details}
          getThePet={getSinglePet}
          {...props}
        />
      );
    }
  };

  // function to delete the pet
  const deletePet = () => {

    // get the 'id' from url via 'props.match.params' object
    const { id } = props.match.params;

    // api call to the delete route in the backend

    axios
      .delete(`http://localhost:5000/api/pets/${id}`, {
        withCredentials: true,
      })
      .then((results) => {
        // after submitting the form, 'props.history.push' can be used to redirect to 'pets'
        props.history.push("/pets");
      })
      .catch((error) => console.error(error));

  };

  const ownershipCheck = (pets) => {
    if (props.loggedInUser && pets.owner === props.loggedInUser._id) {
      return (
        <div>
          <div>{renderEditForm()} </div>
          <button onClick={() => deletePet(details._id)}>
            Delete pet
          </button>
        </div>
      );
    }
  };

  return  !details.hasOwnProperty('_id') ? ('Loading pet information...') : (
    <div className="pet-list">
      <div className="pet-detail">
        <h3>Animal Information {details.petname}</h3>
        <ul>
          <img src={details.imageUrl} alt="pet" style={{ width: "50%", height: "50%" }} />
          <li style={{ listStyleType: "none" }}><b>Pet Name:</b>{details.petname}</li>
          <li style={{ listStyleType: "none" }}><b>Breed:</b> {details.breed}</li>
          <li style={{ listStyleType: "none" }}><b>Gender:</b> {details.gender}</li>
          <li style={{ listStyleType: "none" }}><b>Color:</b> {details.color}</li>
          <li style={{ listStyleType: "none" }}><b>Age:</b> {details.age}</li>
          <li style={{ listStyleType: "none" }}><b>Comment:</b> {details.comment}</li>
        </ul>     
        {props.loggedInUser && props.loggedInUser._id === details.owner._id && (<div> 
        <Link to={`/editpet/${details._id}`} className="back-to-pets-btn">Edit pet </Link>
        <button className="back-to-pets-btn" onClick={() => deletePet(details._id)}> Delete pet </button>
        </div>)} 
        <Link to="/adopt" className="back-to-pets-btn">Back to all pets</Link>


      </div>
      <div className="owner-detail">
        <ul>
          <h3>Owner Information</h3>
          {/* <img src={details.owner.imageUrl} alt="pet" style={{ width: "50%", height: "50%" }} /> */}
          <li style={{ listStyleType: "none" }}><b>Owner Name:</b> {details.owner && details.owner.username} </li>
          <li style={{ listStyleType: "none" }}><b>Owner E-mail:</b> {details.owner && details.owner.email} </li>
          <li style={{ listStyleType: "none" }}><b>Owner Phone Number:</b> {details.owner && details.owner.phone} </li>
          {ownershipCheck(details)}

          <p>Please click to purple button to arrange a meeting with the owner
          <Link to={{ pathname: "https://calendar.google.com/calendar/u/0/r" }} target="_blank" className="back-to-pets-btn" /> </p>
          {/* <Link to="/pets" className="back-to-pets-btn">Arrange a meeting with the owner</Link> */}
        </ul>
      </div>
    </div>
  );
};

export default PetDetails;
