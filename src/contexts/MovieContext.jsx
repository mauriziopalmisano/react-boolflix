import { useState, useEffect, createContext, useRef } from "react";
import { API_KEY } from "../data";
import { searchMulti, popularMoviesListFetch, popularTvListFetch, standardList } from "../utils/functions";

const MovieContext = createContext(null);


function MovieProvider({ children }) {
    const [popularMoviesList, setPopularMoviesList] = useState([]);
    const [popularTvList, setPopularTvList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchedTitle, setSearchedTitle] = useState('');
    
    
    
    const [isSearching, setIsSearching] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [error, setError] = useState(null);
    const mountedStatus = useRef(true);








    useEffect(() => {
        mountedStatus.current = true;
        const controller = new AbortController(); //permette di annullare richieste in corso.
        setPopularMoviesList(null);
        setPopularTvList(null);
        setLoadingStatus(true);
        setError(null);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            },
            signal: controller.signal
        };

        Promise.all([
            popularMoviesListFetch(options),
            popularTvListFetch(options)
        ])
            .then(([moviesData,tvData]) => {
                if(mountedStatus.current){
                    const newMovieList = standardList(moviesData.results);
                    const newTvList = standardList(tvData.results);
                    setPopularMoviesList(newMovieList);
                    setPopularTvList(newTvList);
                    setLoadingStatus(false);
                }
            })
            .catch((err) => {
                if (err.name !== "AbortError" && mountedStatus.current) {
                    setError(err.message);
                    setLoadingStatus(false);
                }
            });
        
        return () => {
            mountedStatus.current = false;
            controller.abort();
        };
    }, []);



    const changeHandler = (event) => {
        const { value } = event.target;
        setSearchedTitle(value);
        console.log(value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: API_KEY
            },
        };

        if(!searchedTitle.trim()){
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        searchMulti(searchedTitle,options)
            .then((json) => {
                const filtredList = json.results.filter(element => element.media_type !== 'person');
                const serachedList = standardList(filtredList);
                setSearchResults(serachedList);
                setIsSearching(true);
            })
            .catch((err) => {
                    setError(err.message);
                    setIsSearching(false);
            });
    };

    const clearSearchHandler = () => {
        setSearchedTitle('');
        setSearchResults([]);
        setIsSearching(false);
    };


    const value = {
        searchResults,
        searchedTitle,
        changeHandler,
        submitHandler,
        loadingStatus,
        error,
        popularMoviesList,
        popularTvList,
        isSearching,
        clearSearchHandler
    };

    return (
        <MovieContext value={value}>
            {children}
        </MovieContext>
    );
}

export { MovieContext, MovieProvider };