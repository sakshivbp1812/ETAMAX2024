import React, { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import HambergerMenu from "./Components/HambergerMenu";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Schedule from "./Pages/Schedule";
import EventCard from "./Pages/event_cards";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
const App = () => {
  const [windowStatus, setWindowStatus] = useState(
    window.innerWidth > 820 ? true : false
  );

  function checkWindowSize() {
    setWindowStatus(window.innerWidth > 820 ? true : false);
  }

  window.onresize = checkWindowSize;

  const [isAuth, setIsAuth] = useState();

  function checkToken() {
    if (localStorage.getItem("token")) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }
  useEffect(() => {
    checkToken();
  });

  return (
    <div>
      <Router>
        {isAuth &&
          (windowStatus ? (
            <NavigationBar setAuth={setIsAuth} />
          ) : (
            <HambergerMenu setAuth={setIsAuth} />
          ))}
        <Routes>
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/about"
            element={isAuth ? <About /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/schedule"
            element={isAuth ? <Schedule /> : <Navigate to="/" />}
          />
          <Route
            path="/events"
            element={isAuth ? <EventCard /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              !isAuth ? <Login setAuth={setIsAuth} /> : <Navigate to="/home" />
            }
          />
        </Routes>
        {isAuth && <Footer />}
      </Router>
    </div>
  );
};

export default App;
