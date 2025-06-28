export default function HomePage() {
  return (
    <main className="container">
      <h1 className="my-5">HomePage</h1>
      <h1 className="my-5">Categories</h1>

      {/* Carosello Bootstrap */}
      <h1 className="my-5">Best Selling Items</h1>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Indicatori */}
        <div className="carousel-indicators btn btn-dark">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        {/* Immagini */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://via.placeholder.com/800x300?text=Slide+1" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x300?text=Slide+2" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/800x300?text=Slide+3" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>

        {/* Controlli */}
        <button className="carousel-control-prev btn btn-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Precedente</span>
        </button>
        <button className="carousel-control-next btn btn-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Successiva</span>
        </button>
      </div>
    </main>
  );
}
