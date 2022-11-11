import React, { useState } from "react";
const initialSearch = "";
const ImbdForm = ({ handleSearch }) => {
  const [search, setSearch] = useState(initialSearch);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
    setSearch(initialSearch);
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5em",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="submit"
          onSubmit={handleSubmit}
          style={{ display: "none", marginTop: "1.5em" }}
        />
        <input
          style={{
            minWidth: "400px",
            width: "60%",
            border: "0",
            outline: "none",
            padding: ".5em",
            background: "black",
            fontWeight: "boldy",
            color: "whitesmoke",
          }}
          type="search"
          placeholder="Busqueda de Peliculas o Series de TV"
          onChange={handleChange}
          value={search}
          spellCheck={false}
        />
      </form>
    </>
  );
};

export default ImbdForm;
