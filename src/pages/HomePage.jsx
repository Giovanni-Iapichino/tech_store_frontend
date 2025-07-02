import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClipboardList, faShieldHalved, faTrophy, faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import ProductCardLigth from "../components/ProductCardLight";
import { useProducts } from "../context/GetProductsContext";

import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { bestSeller, promotions } = useProducts();

  return (
    <main className="container">
      <div id="carouselExampleIndicators" className="carousel slide my-5 h-50" data-bs-ride="carousel">
        {/* Immagini */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/hero-placeholder.png" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="/hero-placeholder.png" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="/hero-placeholder.png" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>

        {/* Indicatori */}
        <div className="carousel-indicators">
          <button className="btn btn-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
          <button className="btn btn-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button className="btn btn-dark" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
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
      <div className="services my-5">
        <div className="row">
          <div className="col-md-3">
            <div className="service d-flex gap-3">
              <div className="service-icon">
                <FontAwesomeIcon className="fs-3 text-warning" icon={faCartShopping} />
              </div>
              <div className="service-content">
                <h5>Spedizione Gratuita</h5>
                <p>Spedizione gratuita per tutti gli ordini superiori a 100€</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="service d-flex gap-3">
              <div className="service-icon">
                <FontAwesomeIcon className="fs-3 text-warning" icon={faTrophy} />
              </div>
              <div className="service-content">
                <h5>Qualità</h5>
                <p>Prodotti originali e di alta qualità</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="service d-flex gap-3">
              <div className="service-icon">
                <FontAwesomeIcon className="fs-3 text-warning" icon={faClipboardList} />
              </div>
              <div className="service-content">
                <h5>Offerte</h5>
                <p>Offerte e sconti sui nostri prodotti</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="service d-flex gap-3">
              <div className="service-icon">
                <FontAwesomeIcon className="fs-3 text-warning" icon={faShieldHalved} />
              </div>
              <div className="service-content">
                <h5>Sicurezza</h5>
                <p>Pagamento sicuro con PayPal, Carta di Credito, Bonifico Bancario</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="brands my-5">
        <div className="row align-items-center gap-3 justify-content-center">
          <Link to="/shop?brand=apple" className="card-brand border">
            <img className="w-100" src="/apple.jpg" alt="Brand 1" />
          </Link>
          <Link to="/shop?brand=samsung" className="card-brand border">
            <img className="w-100" src="/samsung.jpg" alt="Brand 1" />
          </Link>
          <Link to="/shop?brand=lg" className="card-brand border">
            <img className="w-100" src="/lg.png" alt="Brand 1" />
          </Link>
          <Link to="/shop?brand=huaway" className="card-brand border">
            <img className="w-100" src="/huaway.png" alt="Brand 1" />
          </Link>
          <Link to="/shop?brand=xiaomi" className="card-brand border">
            <img className="w-100" src="/xiaomi.png" alt="Brand 1" />
          </Link>
          <Link to="/shop?brand=motorola" className="card-brand border">
            <img className="w-100" src="/motorola.svg" alt="Brand 1" />
          </Link>
        </div>
      </div>
      <h5 className="my-5">Promotions</h5>
      <div className="promotions my-5 d-flex gap-4 justify-content-between align-items-center">
        <div className="banner">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faChevronLeft} />
        </div>
        <div className="row gap-3">{promotions && promotions.map((product) => <ProductCardLigth key={product.id} product={product} />)}</div>
        <div className="banner-arrow">
          <FontAwesomeIcon className="fs-3" icon={faChevronRight} />
        </div>
      </div>
      <h5 className="my-5">Best Selling Items</h5>
      <div className="promotions my-5 d-flex gap-3 justify-content-between align-items-center">
        <div className="banner">
          <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faChevronLeft} />
        </div>
        <div className="row gap-4">{bestSeller && bestSeller.map((product) => <ProductCardLigth key={product.id} product={product} />)}</div>
        <div className="banner-arrow">
          <FontAwesomeIcon className="fs-3" icon={faChevronRight} />
        </div>
      </div>
    </main>
  );
}
