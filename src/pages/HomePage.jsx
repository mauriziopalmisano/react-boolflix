import useMovies from "../hooks/useMovies";

function HomePage() {
  const { popularMoviesList, loadingStatus, error, popularTvList, isSearching, searchResults } = useMovies();

  if (loadingStatus) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore {error}</p>;
  return (
    <>
      <div className="row">
        {isSearching ? (
          <>
            <div className="col-12">
              <h1>Risultati della ricerca</h1>
            </div>
            {searchResults.map((movie) => {
              const { id, title, img, flagURL, vote_average: valutation } = movie;
              return (
                <div className="col-3" key={id}>
                  <div className="card">
                    <img src={img} className="card-img-top" alt={title} />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <img className="img-fluid" src={flagURL} alt="" />
                      <div className="movie-rating">
                        <span className="me-2">Voto:</span>
                        {[...Array(5)].map((element, index) => (
                          <i
                            key={index}
                            className={index < valutation ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>

            <div className="col-12">
              <h1>Film Popolari</h1>
            </div>
            {popularMoviesList.map((movie) => {
              const { id, title, img, flagURL, vote_average: valutation } = movie;
              return (
                <div className="col-3" key={id}>
                  <div className="card">
                    <img src={img} className="card-img-top" alt={title} />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <img className="img-fluid" src={flagURL} alt="" />
                      <div className="movie-rating">
                        <span className="me-2">Voto:</span>
                        {[...Array(5)].map((element, index) => (
                          <i
                            key={index}
                            className={index < valutation ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="col-12 mt-4">
              <h1>Serie TV Popolari</h1>
            </div>
            {popularTvList.map((tvShow) => {
              const { id, title, img, flagURL, vote_average: valutation } = tvShow;
              return (
                <div className="col-3" key={id}>
                  <div className="card">
                    <img src={img} className="card-img-top" alt={title} />
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <img className="img-fluid" src={flagURL} alt="" />
                      <div className="movie-rating">
                        <span className="me-2">Voto:</span>
                        {[...Array(5)].map((element, index) => (
                          <i
                            key={index}
                            className={index < valutation ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;