import { useState, useEffect, createContext, useRef } from "react";
import { API_KEY } from "../data";

const MovieContext = createContext(null);
const partialURL = 'https://api.themoviedb.org/3/search/multi?query='
const popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular';
//const popularTvURL = 'https://api.themoviedb.org/3/tv/popular';

function MovieProvider({ children }) {
    const [search, setSearch] = useState(popularMoviesURL);
    const [searchedTitle, setSearchedTitle] = useState('');
    const [fetchedData, setFetechedData] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [error, setError] = useState(null);
    const mountedStatus = useRef(true);

    const lenguageExeption = {
        en: 'gb',
        ja: 'jp',
        zh: 'cn',
        ko: 'kr',
        da: 'dk',
        el: 'gr'
    }

    const exeptionLenguageToCountry = (language) => {
        return lenguageExeption[language] || language;
    };




    function standardList(multiList) {
        const filtredList = multiList.filter(element => element.media_type !== 'person');
        const mappedList = filtredList.map(element => {
            const keyTitle = element.media_type === 'movie' ? 'title' : 'name';
            const keyOriginalTitle = element.media_type === 'movie' ? 'original_title' : 'original_name';
            const valutation = Math.ceil(Math.ceil((element.vote_average || 0) / 2));
            const imgURL = element.poster_path ? `https://image.tmdb.org/t/p/w185${element.poster_path}` : 'https://placehold.co/500x750?text=No+Poster';
            const country = exeptionLenguageToCountry(element.original_language);
            const flagURL = `https://flagcdn.com/16x12/${country}.png`;
            return {
                id: element.id,
                title: element[keyTitle],
                original_title: element[keyOriginalTitle],
                vote_average: valutation ? valutation : 0,
                img: imgURL,
                flagURL: flagURL
            }
        });
        console.log(mappedList);

        return mappedList;
    }





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


        fetch(search, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Errore HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((json) => {
                if (mountedStatus.current) {
                    const newList = standardList(json.results);
                    console.log(newList);

                    setFetechedData(newList);
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
        setSearchedTitle(value);
        console.log(value);

    }

    const submitHandler = (event) => {
        event.preventDefault();
        setSearch(partialURL + searchedTitle);
        console.log(searchedTitle);

    }

    const value = {
        search,
        searchedTitle,
        changeHandler,
        submitHandler,
        fetchedData,
        loadingStatus,
        error
    };

    return (
        <MovieContext value={value}>
            {children}
        </MovieContext>
    );
}

export { MovieContext, MovieProvider };