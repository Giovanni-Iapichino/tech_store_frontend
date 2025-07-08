import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/WishlistContext";
import RelatedProducts from "./RElatedProductCard";
import axios from "axios";
import { useNewsletter } from "../context/newsletterContext";
import PopUpNewsletter from "../components/PopUpNewsletter";
import { useToast } from "../context/ToastContext";

export default function DetailsProductPage() {
  const { addToCart } = useCart(); //aggiungi al carrello
  const { addToWishlist } = useWishlist(); //aggiungi alla wishlist
  const [product, setProduct] = useState(); //prodotto da visualizzare
  const { slug } = useParams();
  const { randomClick, updateRandomClick, open, setOpen, newsletter } =
    useNewsletter();
  const navigate = useNavigate(); //per navigare tra le pagine
  const { showToast } = useToast(); //per mostrare i toast

  const productApiUrl = `http://localhost:3000/api/v1` + "/products/" + slug; // URL dell'API per ottenere il prodotto specifico

  useEffect(() => {
    if (newsletter === "false") {
      const currentValue = randomClick;
      updateRandomClick(currentValue - 1);
    }
  }, []);

  useEffect(() => {
    if (randomClick === 0) {
      setOpen(true);
    }
  }, [randomClick]);

  const fetchProduct = () => {
    axios.get(productApiUrl).then((res) => {
      // chiamata API per ottenere il prodotto
      const { product } = res.data; // destruttura la risposta per ottenere il prodotto
      setProduct(product); // imposta il prodotto nello stato
    });
  };
  useEffect(fetchProduct, []); // chiama la funzione fetchProduct al caricamento del componente

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      {product ? (
        <main>
          <div className="container">
            <div className="bottom-prev">
              <Link to={`/shop`}>
                <button className="btn btn-primary ">
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                  Torna allo shop
                </button>
              </Link>
            </div>
            <div className="container-details">
              <div className="row ">
                <div className="col-md-2 mb-2">
                  <div className="img">
                    <img src="../smartphone_placeholder.jpeg" />
                    <img src="../smartphone_placeholder.jpeg" />
                    <img src="../smartphone_placeholder.jpeg" />
                  </div>
                </div>
                <div className="col-md-6 mb-6">
                  <img src="../smartphone_placeholder.jpeg" alt="smartphone" />
                </div>
                <div className="col-md-4 mb-4">
                  <div className="title">
                    <h1>
                      {product.brand} {product.title} {product.model}
                    </h1>
                  </div>
                  <div className="text">
                    <p className="price">
                      <FontAwesomeIcon icon={faEuroSign} /> {product.price}
                    </p>
                    <p>
                      <strong>
                        Descrizione:
                        <br />
                      </strong>
                      {product.description}
                    </p>
                  </div>
                  <div className="button ">
                    <button
                      className="btn btn-success m-1 p-2"
                      onClick={() => {
                        addToCart(product);
                        navigate("/checkout");
                      }}
                    >
                      Acquista
                    </button>
                    <button
                      className="btn m-1 p-2"
                      style={{
                        background: "#ff6543",
                        color: "white",
                      }}
                      onClick={() => {
                        addToCart(product);
                        showToast("Prodotto aggiunto al carrello");
                      }}
                    >
                      Aggiungi a carrello
                    </button>
                    <button
                      className="btn btn-white py-2"
                      style={{
                        color: " #ff6543",
                        background: "white",
                        border: "1px solid #ff6543",
                      }}
                      onClick={() => {
                        addToWishlist(product);
                        showToast("Prodotto aggiunto alla wishlist");
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} className="text-danger" />
                    </button>
                  </div>
                  <div className="bottom-text">
                    <p>
                      <strong>Category:</strong>
                      <br />
                      Smartphone, {product.brand}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-form">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button "
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Descrizione
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Scheda tecnica
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active p-3"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                  tabIndex={0}
                >
                  {product.description}
                </div>
                <div
                  className="tab-pane fade p-3"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                  tabIndex={0}
                >
                  <ul>
                    <li>
                      <strong>Sistema operativo:</strong>{" "}
                      {product.operating_system}
                    </li>
                    <li>
                      <strong>Ram:</strong> {product.ram}
                    </li>
                    <li>
                      <strong>Memoria:</strong> {product.memory}
                    </li>
                    <li>
                      <strong>Display:</strong> {product.inches}
                    </li>
                    <li>
                      <strong>Risoluzione:</strong> {product.risolution}
                    </li>
                    <li>
                      <strong>Megapixel:</strong> {product.megapixel}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container-related">
              <div className="title">
                <h3>Prodotti correlati</h3>
                <RelatedProducts />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="loading">
          <h2>Nessun prodotto trovato...</h2>
        </div>
      )}
    </>
  );
}
