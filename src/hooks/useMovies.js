import { useContext } from 'react';
import { MovieContext } from '../contexts/MovieContext';

function useMovies() {
    const context = useContext(MovieContext);

    if (context === null) {
        throw new Error(
            'useMovie: MovieProvider non trovato a monte del componente. ' +
            'Verifica di aver avvolto l\'app con <MovieProvider> in App.jsx.'
        );
    }

    return context;
}

export default useMovies;