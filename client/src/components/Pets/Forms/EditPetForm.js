import React, { useState , useEffect} from "react";
import axios from "axios";

const EditPetForm = (props) => {
  const [formState, setFormState] = useState({
  });
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
      setFormState(responseFromApi.data);
    })
    .catch((error) => console.error(error));
};

  useEffect(getSinglePet, [props.match.params]);

  // Function handler to submit form
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // form state data to pass with the api call
    const { animal, petname, breed, gender, color, age, comment, imageUrl , _id } = formState;

    axios
      .put(
        `http://localhost:5000/api/pets/${_id}`,
        {
          animal,
          petname,
          breed,
          gender,
          color,
          age,
          comment,
          imageUrl
        },
        { withCredentials: true }
      )
      .then(() => {
        // run method to call api method to get a single pet
        props.getThePet();

        // after submitting the form, 'props.history.push' can be used to redirect to 'pets'
        props.history.push("/pets");
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
      <h3>Edit form</h3>
      <form onSubmit={handleFormSubmit}>
        <label >Animal:</label>
        <input
          type="text"
          name="animal"
          value={formState.animal}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label >Pet Name:</label>
        <input
          type="text"
          name="petname"
          value={formState.petname}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label >Breed:</label>
        <input
          type="text"
          name="breed"
          value={formState.breed}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={formState.gender}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label>Color:</label>
        <input
          type="text"
          name="color"
          value={formState.color}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label>Comment:</label>
        <input
          type="text"
          name="comment"
          value={formState.comment}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <label>Image:</label>
        <input
          type="text"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleInputChange}
          className="txtb"
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditPetForm;
