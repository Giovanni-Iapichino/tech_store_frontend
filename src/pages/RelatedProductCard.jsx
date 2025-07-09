import { faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/WishlistContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const RelatedProducts = () => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [related, setRelated] = useState([]);
  const { slug } = useParams(); // ottieni lo slug del prodotto dalla URL

  useEffect(() => {
    // effettua la chiamata API per ottenere i prodotti correlati
    const fetchRelatedProducts = async () => {
      //utilizza async/await per gestire le chiamate API
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products`); // ottieni tutti i prodotti
        setRelated(response.data.products);

        const resProduct = await axios.get(`http://localhost:3000/api/v1/products/${slug}`); // ottieni il prodotto selezionato
        const selectedProduct = resProduct.data.product; // destruttura la risposta per ottenere il prodotto selezionatos
        const relatedProducts = response.data.products.filter(
          (
            product // filtra i prodotti correlati in base alla marca del prodotto selezionato
          ) => product.brand === selectedProduct.brand.toLowerCase() && product.id !== selectedProduct.id
        );
        setRelated(relatedProducts.slice(0, 4)); //limitare a 4 prodotti correlati
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelatedProducts();
  }, [setRelated]);
  return (
    <div className="related-products">
      <div className="row">
        {related.map((product) => (
          <div key={product.id} className="col-2 mb-2">
            <div className="card">
              <img src="../smartphone_placeholder.jpeg" alt="smartphone" className="card-img-top" />
              <div className="card-body">
                <h6 className="card-title ">
                  {product.brand} {product.title} {product.model}
                </h6>
                {product.discount && product.discount > 0 ? (
                  <>
                    <span className="discount">
                      <span className="text-muted fs-6">
                        <del>
                          <FontAwesomeIcon icon={faEuroSign} /> {product.price}
                        </del>{" "}
                        -{product.discount}%
                      </span>
                    </span>
                    <span>
                      <p className="price" style={{ color: "#089408" }}>
                        <FontAwesomeIcon icon={faEuroSign} /> {(product.price - (product.price * product.discount) / 100).toFixed(2)}
                      </p>
                    </span>
                  </>
                ) : (
                  <p className="price" style={{ color: "#089408" }}>
                    <FontAwesomeIcon icon={faEuroSign} /> {product.price}
                  </p>
                )}
                <button className="btn px-0" onClick={() => addToCart(product)}>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-black fs-5"
                    style={{
                      background: "#ff6543",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                  />
                </button>
                <button className="btn px-1" onClick={() => addToWishlist(product)}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-black fs-5"
                    style={{
                      background: "#ff6543",
                      padding: "8px",
                      borderRadius: "50%",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedProducts;
