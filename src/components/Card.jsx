function Card({
    array
}) {
    return (
        <>
            {array.map((movie) => {
                const { id, title, img, flagURL, vote_average: valutation, original_title, overview, gener_ids } = movie;
                return (
                    <div className="col-sm-6 col-md-4 col-lg-3  mb-3" key={id}>
                        <div className="card custom-hover-card">
                            <img src={img} className="card-img-top" alt={title} />
                            <div className="card-overlay">
                                <div className="card-body">
                                    <h5 className="card-title fs-4 mb-2"><strong className="text-danger">Titolo:</strong><br />{title}</h5>
                                    <h6 className=" card-subtitle mb-2"><strong className="text-danger">Titolo originale:</strong><br />{original_title}</h6>
                                    {overview && (<p className="card-description mb-2"><strong className="text-danger">Descrizione:</strong><br />{overview}</p>)}
                                    <img className="img-fluid" src={flagURL} alt="" />
                                    <div >
                                        <span className="me-2 text-danger">Voto:</span>
                                        {[...Array(5)].map((element, index) => (
                                            <i
                                                key={index}
                                                className={index < valutation ? "bi bi-star-fill text-warning" : "bi bi-star text-muted"}
                                            ></i>
                                        ))}
                                        <br />
                                        <span className="me-2 text-danger">Generi:</span>
                                        {gener_ids && gener_ids.map((gener, index) => (
                                            <span key={index} className="badge text-bg-danger me-1">{gener}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    )
}
export default Card