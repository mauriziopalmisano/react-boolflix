import { useState, useEffect, createContext } from "react";

const MovieContext = createContext(null);

function MovieProvider({ children }) {
    

    const value = {};

    return (
        <MovieContext value={value}>
            {children}
        </MovieContext>
    );
}

export { MovieContext, MovieProvider };