import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pet.css";

// import AddPetForm from "./Forms/AddPetForm";

const PetList = () => {
  const [listOfPets, setListOfPets] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('animal');
  console.log(myParam);

  // Function to help get all projects from the backend
  const getAllProjects = () => {
    let requestUrl = "https://pet-adopt-ironhack.herokuapp.com/api/pets"
    if(myParam !== null){
      requestUrl =`https://pet-adopt-ironhack.herokuapp.com/api/pets?animal=${myParam}`
    }
    console.log(requestUrl);
    axios
      .get(requestUrl, { withCredentials: true })
      .then((responseFromApi) => {
        console.log(responseFromApi);
        setListOfPets(responseFromApi.data);
      })
      .catch((error) => console.error(error));
  };

  // useEffect to mimic the side effects of componentDidMount().
  // Because we are using functional components, useEffects are the way to go for us.
  useEffect(getAllProjects, []);

  return (
    <div >
      <div>
        <h2 className="allpets-header">Your best friend is waiting for you</h2>
        {listOfPets.map((pets) => {
          return (
            <div key={pets._id} className="allpets-list">
            <Link to={`/pets/${pets._id}`}>
              <img src={pets.imageUrl} style={{ width: "350px", height: "350px", marginLeft:"75px" }} className="allpet-list-img"></img>   
                {/* <h3>{pets.animal}</h3> */}
                {/* <h3>{pets.petname}</h3> */}
              </Link>     
            </div>
            );
        })}
      </div>
      {/* <div style={{ width: "40%", float: "right" }}>
        <AddPetForm getData={getAllPets} />
      </div> */}
    </div>
  );
};

export default PetList;
