import useMovies from "../hooks/useMovies";



function HomePage() {





  const { fetchedData, loadingStatus, error } = useMovies();


  if (loadingStatus) return <p>Caricamento in corso...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!fetchedData || fetchedData.length === 0) return <p>Nessun film trovato.</p>;

  return (<>
    <div className="row">
      {fetchedData && fetchedData.map(movie => {
        const { id, title, img, flagURL, vote_average:valutation } = movie;
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
                      className={index < valutation ? "bi bi-star-fill text-warning" : "bi bi-star"}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </>
  );
}
export default HomePage;
