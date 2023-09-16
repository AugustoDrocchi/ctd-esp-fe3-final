import React from "react";
import { Link } from "react-router-dom";
import { useDentistStates } from "./utils/global.context";

const Card = ({ name, username, id }) => {
  const { favDispatch, apiState } = useDentistStates();

  const addToFavorites = () => {
    favDispatch({ type: "ADD_FAVORITE", payload: apiState.dentistList });
  };

  return (
    <div className="card" key={id}>
      <img className="doctor-img" src="./images/doctor.jpg" alt="DH-logo" />
      <h3>{id}</h3>
      <h2>{name}</h2>
      <h3>{username}</h3>
      <Link key={id} to={"/dentist/" + id}>
        Details
      </Link>
      <button onClick={addToFavorites} className="favButton">
      ⭐️ 
      </button>
    </div>
  );
};

export default Card;

