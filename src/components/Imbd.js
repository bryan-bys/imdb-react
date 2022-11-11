import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

import ImbdForm from "./ImbdForm";
import ImbdPoster from "./ImbdPoster";
import InfoImdb from "./InfoImdb";
import { Loader } from "./Loader";

const initialModal = false;

const Imbd = () => {
  const [query, setQuery] = useState(null);
  const [imbdImages, setImbdImages] = useState([]);
  const [idImdb, setIdImdb] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(initialModal);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImbdImages([]);
    if (query === null) return;
    const getData = async (url) => {
      setLoading(true);
      try {
        let res = await fetch(url);
        console.log(res);

        // if (!res.ok) {
        //   let err = new Error("Error");
        //   err.status = res.status || "00";
        //   err.statusText = res.statusText || "Ocurrio un error";
        //   throw err;
        // }
        let json = await res.json();
        console.log(json);
        if (!res.ok || json.errorMessage) {
          let err = new Error("Error");
          err.statusText =
            res.statusText || json.errorMessage || "Ocurrio un error";
          err.status = !res.status === "400" || "00";
          throw err;
        }
        json.results.forEach((el) => {
          let thePoster = {
            id: el.id,
            image: el.image,
            title: el.title,
          };
          setImbdImages((imbdImages) => [...imbdImages, thePoster]);
        });
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    getData(`https://imdb-api.com/API/Search/k_t3z46lty/${query}`);
  }, [query]);

  useEffect(() => {
    setMovieInfo(null);
    if (idImdb === null) return;
    setLoading(true);
    const getMovieData = async (url) => {
      let res = await fetch(url),
        json = await res.json();
      console.log(json);
      setMovieInfo(json);
      setLoading(false);
    };

    getMovieData(`https://imdb-api.com/en/API/Title/k_t3z46lty/${idImdb}`);
  }, [idImdb]);

  const handleSearch = (data) => {
    setQuery(data);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            minWidth: "700px",
            width: "100%",
            margin: "0 auto",
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ fontFamily: "sans-serif" }}>API IMDB BY BRYAN</h1>
          <ImbdForm handleSearch={handleSearch} />
        </div>
        {error && (
          <ErrorMessage msg={`Error: ${error.status} : ${error.statusText}`} />
        )}
        {loading && <Loader />}
        {movieInfo && (
          <InfoImdb
            movieInfo={movieInfo}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            setMovieInfo={setMovieInfo}
          />
        )}
        {imbdImages === 0 ? (
          <h3>cargando</h3>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              minWidth: "600px",
              width: "95%",
              marginBottom: "3em",
            }}
          >
            {imbdImages.map((el) => (
              <ImbdPoster
                el={el}
                poster={el.image}
                key={el.id}
                title={el.title}
                setIdImdb={setIdImdb}
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Imbd;
