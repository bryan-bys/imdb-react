import React from "react";
import "./ImbdPoster.css";
const ImbdPoster = ({ el, poster, id, title, setIdImdb, openModal }) => {
  return (
    <>
      <div
        className="poster"
        onClick={() => {
          setIdImdb(el.id);
          openModal();
        }}
      >
        <img src={poster} alt={id} />
        <h3>
          <abbr title={title}>{title}</abbr>
        </h3>
      </div>
    </>
  );
};

export default ImbdPoster;
