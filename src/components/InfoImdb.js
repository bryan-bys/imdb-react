import React from "react";
import "./InfoImdb.css";

const InfoImdb = ({ movieInfo, closeModal, isOpen, setMovieInfo }) => {
  let { title, year, type, id, image, plot, runtimeMins, awards, genres } =
    movieInfo;
  return (
    <div className={`modal ${isOpen && "is-open"}`}>
      <div className="modal-container">
        <button
          className="modal-close"
          onClick={() => {
            closeModal();
          }}
        >
          X
        </button>
        {!image ? (
          <h1 style={{ color: "white" }}>Informacion no disponible</h1>
        ) : (
          <div className="modal-container dos">
            <img src={image} alt={id} />
            <div className="description-container">
              <h3>Genres: {genres}</h3>
              <h3>Awards: {awards}</h3>
              <h3>Title: {title}</h3>
              <h3>Categorie: {type}</h3>
              <h3>Year: {year}</h3>
              <h3>{runtimeMins && `Duracion: ${runtimeMins} Mins`}</h3>
              <h3>Synopsis:</h3>
              <h3 className="plot"> {plot}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoImdb;
