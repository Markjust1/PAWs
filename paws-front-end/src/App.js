import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

// Components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RegisterUser from "./components/RegisterUser";
import RegisterDog from "./components/RegisterDog";
import LandingPage from "./components/LandingPage";
import DogMatches from "./components/DogMatches";
import UsersDogs from "./components/UsersDogs";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import DogProfile from "./components/DogProfile";
import DogProfileCard from "./helpers/dogProfileCard";
import Status from "./components/Status";
import FetchProfiles from "./components/FetchProfiles";
import NewsBar from "./components/NewsBar";
// import DogProfileTemplate from "./components/DogProfileTemp";

// Helpers
import {
  getCoordinates,
  fetchCoordinates,
  sendCoordinatesToServer,
  // apiLocationSetState
} from "./helpers/getCoordinates";

//Chat
import Chat from "./Chat";
import DogProfileTemplate from "./components/DogMatches";

const App = () => {
  // GLOBAL STATE
  const [loggedIn, setLoggedIn] = useState();
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [urlPath, setUrlPath] = useState(window.location.pathname);

  // GET FROM SERVER, DOGS IN THE LOCAL AREA
  // const [areaDogs, setAreaDogs] = useState("");

  // const fetchAreaDogs = function () {
  //   axios
  //     .get(`/api/dogs`)
  //     .then(response => {
  //       setAreaDogs(response.data);
  //     })
  //     .catch(error => console.log("error fetching dogs in App.js: ", error));
  // };

  // useEffect(() => {
  //   fetchAreaDogs();
  // }, []);

  // GET FROM SERVER, OWNERS IN THE LOCAL AREA
  const [areaOwners, setAreaOwners] = useState("");

  const fetchAreaOwners = function () {
    axios
      .get("/api/owners")
      .then((response) => {
        setAreaOwners(response.data);
      })
      .catch((error) =>
        console.log("error fetching owners in App.js: ", error)
      );
  };

  // useEffect(() => {
  //   fetchAreaOwners();
  // }, []);

  // console.log("areaOwners: ", areaOwners);
  // console.log("areaDogs: ", areaDogs);

  // GET USER LOCATION
  const [userCoordinates, setUserCoordinates] = useState("");
  // Update userCoordinates, after async request for location is fulfilled
  const getLongLat = async function () {
    try {
      await fetchCoordinates(getCoordinates).then((results) => {
        console.log("results, App.js: ", results);
        setUserCoordinates(results);
        // After state is set, pass lat/longitude to database
        // sendCoordinatesToServer(userCoordinates, ownerId);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLongLat();
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundImage: 'url("images/skipping-dogs.jpg")' }}
    >
      <BrowserRouter>
        <Header
          loggedIn={loggedIn}
          userName={userName}
          setLoggedIn={setLoggedIn}
          setUrlPath={setUrlPath}
          setUserId={setUserId}
        />
        <NewsBar />
        <Routes>
          <Route
            path="/"
            element={<HomePage loggedIn={loggedIn} userName={userName} />}
          />
          <Route
            path="/"
            element={<HomePage loggedIn={loggedIn} userName={userName} />}
          />
          <Route
            path="/register-user"
            element={<RegisterUser loggedIn={loggedIn} />}
          />
          <Route path="/register-dog" element={<RegisterDog />} />
          <Route
            path="/dog-matches"
            element={<FetchProfiles urlPath={urlPath} />}
          />
          <Route path="/users-dogs" element={<FetchProfiles />} />
          {/* <Route path="/dog-matches" element={<DogMatches />} />
            <Route path="/users-dogs" element={<UsersDogs />} /> */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/user-profile" element={<LandingPage />} />
        </Routes>
        {/* <RegisterDog /> */}
        {/* <Status />
        <RegisterUser /> */}
        <FetchProfiles />
        <Footer urlPath={urlPath} setUrlPath={setUrlPath} />
      </BrowserRouter>
    </div>
  );
};

export default App;
