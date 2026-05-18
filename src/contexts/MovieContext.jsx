import { useState, useEffect, createContext, useRef } from "react";
import { API_KEY } from "../data";

const MovieContext = createContext(null);
const partialURL = 'https://api.themoviedb.org/3/search/movie?query=';
const popularURL = 'https://api.themoviedb.org/3/movie/popular';

function MovieProvider({ children }) {
    const [search, setSearch] = useState(null);
    const [movieTitle, setMovieTitle] = useState('');
    const [fetchedData, setFetechedData] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [error, setError] = useState(null);
    
    const mountedStatus = useRef(true);

    useEffect(() => {
        mountedStatus.current = true;
        const controller = new AbortController(); //permette di annullare richieste in corso.
        setFetechedData(null);
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


        fetch(search ? search : popularURL, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                if (mountedStatus.current) {
                    setFetechedData(json);
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
    }, [search])



    const changeHandler = (event) => {
        const { value } = event.target;
        setMovieTitle(value);
        console.log(value);

    }

    const submitHandler = (event) => {
        event.preventDefault();
        if(movieTitle){
            setSearch(partialURL + movieTitle);
        }else{
            setSearch(popularURL);
        }
        console.log(movieTitle);

    }

    const value = {
        search,
        movieTitle,
        changeHandler,
        submitHandler,
        fetchedData
    };

    return (
        <MovieContext value={value}>
            {children}
        </MovieContext>
    );
}

export { MovieContext, MovieProvider };