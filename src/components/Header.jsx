import useMovies from "../hooks/useMovies.js";

function Header() {

    const {searchedTitle, changeHandler, submitHandler} = useMovies()

    return (
        <header>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-danger">Boolflix</a>
                    <form className="d-flex" onSubmit={submitHandler}>
                        <input className="form-control me-2" type="text" value={searchedTitle} onChange={changeHandler} name="query"/>
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;
