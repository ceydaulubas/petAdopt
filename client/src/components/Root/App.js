import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ProtectedRoute from "../Auth/ProtectedRoute";
import UserProfile from "../Pages/UserProfile/UserProfile"

import Navbar from "../Navbar/Navbar";
import PetList from "../Pets/PetList";
import OpeningPage from "../OpeningPage/OpeningPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import AdoptPage from "../Pages/Adopt/Adopt";
import FindHomePage from "../Pages/FindHomePage/FindHomePage";

import AuthService from "../../services/auth-service";
import PetDetails from "../Pets/PetDetails";
import EditPet from "../Pets/Forms/EditPetForm";
import EditUserProfile from "../Pages/UserProfile/EditUserForm";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  // Function to help fetch a logged in user
  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  // Function to help get the loggedIn user
  const getLoggedInUser = (userObject) => {
    setLoggedInUser(userObject);
  };

  // Run to check if user is authenticated
  fetchUser();

  return loggedInUser ? (
    <section className="App">
      <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />
      <Switch>
        <ProtectedRoute
          user={loggedInUser}
          path="/aboutpage"
          component={AboutPage}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/adopt"
          component={AdoptPage}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/findhome"
          component={FindHomePage}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/pets"
          component={PetList}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/pets/:id"
          component={PetDetails}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/editpet/:id"
          component={EditPet}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/edituser/:id"
          component={EditUserProfile}
          exact
        />

        <ProtectedRoute
          user={loggedInUser}
          path="/userprofile"
          component={UserProfile}
          exact
        />

      </Switch>
    </section>
  ) : (
      <section className="App">
        <Navbar userInSession={loggedInUser} getUser={getLoggedInUser} />

        <Switch>
          <Route
            exact
            path="/"
            component={OpeningPage}
          />

          <Route
            exact
            path="/signup"
            render={() => <Signup getUser={getLoggedInUser} />}
          />

          <Route
            exact
            path="/login"
            render={() => <Login getUser={getLoggedInUser} />}
          />

          <ProtectedRoute
            // user={loggedInUser}
            exact
            path="/pets"
            component={PetList}
          />
          
          <ProtectedRoute
            user={loggedInUser}
            path="/pets/:id"
            component={PetDetails}
            exact
          />

          <ProtectedRoute
            user={loggedInUser}
            path="/userprofile"
            component={UserProfile}
            exact
          />
        </Switch>
      </section>
    );
}

export default App;
