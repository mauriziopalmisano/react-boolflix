import useMovies from "../hooks/useMovies";
import Card from "../components/Card";

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
              <h1 className="text-danger">Risultati della ricerca</h1>
            </div>
            <Card 
              array = {searchResults} 
            />
          </>
        ) : (
          <>

            <div className="col-12">
              <h1 className="text-danger">Film Popolari</h1>
            </div>
            <Card
              array={popularMoviesList}
            />

            <div className="col-12 mt-4">
              <h1 className="text-danger">Serie TV Popolari</h1>
            </div>
            <Card
              array={popularTvList}
            />
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;