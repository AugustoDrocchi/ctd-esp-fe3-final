import React from "react";
import { Link } from "react-router-dom";
import { useDentistStates } from "./utils/global.context.jsx";

const Navbar = () => {
  const { themeState, themeDispatch } = useDentistStates();

  const switchTheme = () => {
    if (themeState.isDark) {
      themeDispatch({ type: "SWITCH_LIGHT" });
    } else {
      themeDispatch({ type: "SWITCH_DARK" });
    }
  };

  const homeRoute = "/";
  const contactRoute = "/contacto";
  const favsRoute = "/favs";

  return (
    <nav>
      <div className="odonto-logo">
        <h2>Odonto</h2>
      </div>
      <div className="nav-links">
        <Link to={homeRoute}>
          <h3>Home</h3>
        </Link>
        <Link to={contactRoute}>
          <h3>Contact</h3>
        </Link>
        <Link to={favsRoute}>
          <h3>Favorites</h3>
        </Link>
        <div>
          <button onClick={switchTheme}>
            {themeState.isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
