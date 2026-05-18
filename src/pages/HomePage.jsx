import useMovies from "../hooks/useMovies";


function HomePage() {

  const { fetchedData } = useMovies();

  return (<>
    <div className="row">
      {fetchedData && fetchedData.results.map(movie => {
        const { id, title, poster_path:img } = movie;
        return (
          <div className="col-3" key={id}>
            <div className="card">
              <img src={`https://image.tmdb.org/t/p/w185${img}`} className="card-img-top" alt={title} />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
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
