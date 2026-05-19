import { genresList } from "../data/genersList";


const baseURL = 'https://api.themoviedb.org/3/'


const defaultparams = { include_adult: false, language: 'it-IT', page: 1 };

const URLconstructor = (path, params) => {
    const customUrl = new URL(path, baseURL);
    const mergedParams = { ...defaultparams, ...params };
    const normalizedParams = new URLSearchParams(mergedParams);
    const completeURL = customUrl + normalizedParams;
    return completeURL;
}

export const searchMulti = (query, options, extraparams = {}) => {
    const multiURL = URLconstructor('search/multi?', { query, ...extraparams });
    return fetch(multiURL, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.json();
        })
}

export const popularMoviesListFetch = (options, extraparams = {}) => {
    const popularMovies = URLconstructor('movie/popular?', extraparams);
    return fetch(popularMovies, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.json();
        })
}

export const popularTvListFetch = (options, extraparams = {}) => {
    const popularTv = URLconstructor('tv/popular?', extraparams);
    return fetch(popularTv, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.json();
        })
}



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




export function standardList(multiList) {

    const mappedList = multiList.map(element => {
        const keyTitle = element.media_type === 'movie' ? 'title' : 'name';
        const keyOriginalTitle = element.media_type === 'movie' ? 'original_title' : 'original_name';
        const valutation = Math.ceil((element.vote_average || 0) / 2);
        const imgURL = element.poster_path ? `https://image.tmdb.org/t/p/w342${element.poster_path}` : 'https://placehold.co/500x750?text=No+Poster';
        const country = exeptionLenguageToCountry(element.original_language);
        const flagURL = `https://flagcdn.com/16x12/${country}.png`;
        const idsDeiGeneri = element.genre_ids;
        const geners = idsDeiGeneri.map(generId => {
            const genereOBJ = genresList.find(ele => generId === ele.id);
            return genereOBJ ? genereOBJ.name : 'ID non trovato';
        })
        return {
            id: element.id,
            title: element[keyTitle] ? element[keyTitle] : element.title,
            original_title: element[keyOriginalTitle] ? element[keyOriginalTitle] : element.original_title,
            vote_average: valutation ? valutation : 0,
            img: imgURL,
            flagURL: flagURL,
            overview: element.overview,
            gener_ids : geners
        }
    });

    return mappedList;
}


