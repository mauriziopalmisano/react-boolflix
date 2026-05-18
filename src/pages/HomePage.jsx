import useMovies from "../hooks/useMovies";


function HomePage() {

  const lenguageExeption = {
    en:'gb',
    ja:'jp',
    zh:'cn',
    ko:'kr',
    da:'dk',
    el:'gr'
  }

const exeptionLenguageToCountry = (language) => {
  return lenguageExeption[language] || language;
};

  const { fetchedData } = useMovies();

  return (<>
    <div className="row">
      {fetchedData && fetchedData.results.map(movie => {
        const { id, title, poster_path:img, original_language } = movie;
        const imgURL = img ? `https://image.tmdb.org/t/p/w185${img}`: ' https://placehold.co/500x750?text=No+Poster';
        const country = exeptionLenguageToCountry(original_language);
        const flagURL = `https://flagcdn.com/16x12/${country}.png`;
        return (
          <div className="col-3" key={id}>
            <div className="card">
              <img src={imgURL} className="card-img-top" alt={title} />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <img className="img-fluid" src={flagURL} alt="" />
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
