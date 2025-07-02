import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function DetailsProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const productApiUrl = `http://localhost:3000/api/v1` + "/products/" + id;
  const [product, setProduct] = useState();

  const fetchProduct = () => {
    axios.get(productApiUrl).then(res => {
      const {product } = res.data;
      setProduct(product);
    });
  };
  useEffect(fetchProduct, []);
  return (
    <>
      {product ?(
        <main>
          <div className="bottom-prev m-1">
            <Link to={`/shop`} >
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Torna allo shop
              </button>
            </Link>
          </div>
          <div className="container-details">
            <div className="row ">
              <div className="col-md-6 mb-6">
                <div className="row">
                  <div className="col-2">immagini piccole</div>
                  <div className="col-10">immagine grande</div>
                </div>
              </div>
              <div className="col-md-6 mb-6">
                <div className="title">
                  <h1>{product.title} {product.model}</h1>
                </div>
                <div className="text">
                  <p className="price"><FontAwesomeIcon icon={faEuroSign} /> {product.price}</p>
                  <p><strong>Descrizione:<br /></strong>
                  {product.description}</p>
                </div>
                <div className="button ">
                  <button className="btn btn-danger">Ordina</button>
                  <button className="btn btn-success m-2" onClick={() => addToCart(product)}>Aggiungi a carrello</button>
                  <button className="btn btn-dark">&hearts;</button>
                </div>
                <div className="bottom-text">
                  <p>{product.brand}</p>
                  <p>{product.title}{product.model}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-form">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button " role="tab" aria-controls="nav-home" aria-selected="true">Descrizione</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Scheda tecnica</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">{product.description}</div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <ul>
                  <li><strong>Sistema operativo:</strong> {product.operating_system}</li>
                  <li><strong>Ram:</strong> {product.ram}</li>
                  <li><strong>Memoria:</strong> {product.memory}</li>
                  <li><strong>Display:</strong> {product.inches}</li>
                  <li><strong>Risoluzione:</strong> {product.risolution}</li>
                  <li><strong>Megapixel:</strong> {product.megapixel}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="container-related">
            <div className="title">
              <h3>Prodotti correlati</h3>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    ):(
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )}
      
    </>
  );
}
