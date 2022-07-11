import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RegisterUser from "./components/RegisterUser";
import RegisterDog from "./components/RegisterDog";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Terms from "./components/Terms";

// Helpers
import {
  getCoordinates,
  fetchCoordinates,
  sendCoordinatesToServer,
  // apiLocationSetState
} from "./helpers/getCoordinates";

// Temp global variable for user's logged-in status

function App() {
  // Global State
  const [loggedIn, setLoggedIn] = useState(() => true);
  const [userName, setUserName] = useState("Snoopy123");
  const [urlPath, setUrlPath] = useState(window.location.pathname);

  // Get user location
  const [userCoordinates, setUserCoordinates] = useState();

  // Update userCoordinates, after async request for location is fulfilled
  useEffect(() => {
    (async () => {
      await fetchCoordinates(getCoordinates)
        .then((results) => {
          console.log("results, App.js: ", results);
          setUserCoordinates(results);
        })
        .catch((error) => {
          console.log(error);
        });
      // OR:
      // const response = await fetchCoordinates(getCoordinates);
      // setUserCoordinates(response);
    })();

    // After state is set, pass lat/longitude to database
    // sendCoordinatesToServer(userCoordinates, ownerId);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header
          loggedIn={loggedIn}
          userName={userName}
          setLoggedIn={setLoggedIn}
          setUrlPath={setUrlPath}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage loggedIn={loggedIn} userName={userName} />}
          />
          <Route
            path="/register-user"
            element={<RegisterUser loggedIn={loggedIn} />}
          />
          <Route path="/register-dog" element={<RegisterDog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer urlPath={urlPath} setUrlPath={setUrlPath} />
      </BrowserRouter>
      <RegisterDog />
    </div>
  );
}

export default App;
