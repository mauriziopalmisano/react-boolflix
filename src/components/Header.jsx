import useMovies from "../hooks/useMovies.js";

function Header() {

    const {movieTitle, changeHandler, submitHandler} = useMovies()

    return (
        <header>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Boolflix</a>
                    <form className="d-flex" onSubmit={submitHandler}>
                        <input className="form-control me-2" type="text" value={movieTitle} onChange={changeHandler} name="query"/>
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;
