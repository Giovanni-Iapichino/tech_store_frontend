import { useCompare } from "../context/CompareContext";
import { useCart } from "../context/CartContext";
import { useNewsletter } from "../context/newsletterContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCartShopping,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import PopUpNewsletter from "../components/PopUpNewsletter";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ComparisonPage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const { randomClick, updateRandomClick, open, setOpen, newsletter } =
    useNewsletter();

  // Controllo newsletter
  useEffect(() => {
    if (newsletter === "false") {
      updateRandomClick(randomClick - 1);
    }
  }, []);

  useEffect(() => {
    if (randomClick === 0) {
      setOpen(true);
    }
  }, [randomClick]);

  // Ritorno in caso di confronto vuoto
  if (compareList.length === 0)
    return (
      <>
        {open && newsletter === "false" && <PopUpNewsletter />}
        <div className="container text-center my-5">
          <p>Nessun prodotto selezionato per il confronto.</p>
          <Link
            className="btn btn-warning mt-4"
            to="/shop"
            style={{ background: "#ff6543", color: "white", border: "white" }}
          >
            Torna allo Shop
          </Link>
        </div>
      </>
    );

  // const EXCLUDED_KEYS = [
  //   "id",
  //   "title",
  //   "thumbnail",
  //   "create_at",
  //   "update_at",
  //   "description",
  //   "slug",
  // ];
  // const allKeys = Array.from(
  //   new Set(compareList.flatMap((product) => Object.keys(product)))
  // ).filter((key) => !EXCLUDED_KEYS.includes(key));

  const getCartQuantity = (productId) => {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      <div className="container overflow-auto">
        <h1 className="my-4 text-center" style={{ color: "#ff6543" }}>
          <strong>Confronto Prodotti</strong>
        </h1>

        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th style={{ width: "180px" }}></th>
                {compareList.map((product) => (
                  <th key={product.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="d-block mx-auto"
                        style={{ fontWeight: 600 }}
                      >
                        <img
                          src={product.thumbnail || "/placeholder.jpg"}
                          alt={product.title}
                          style={{ maxWidth: "100px" }}
                        />
                      </span>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        title="Rimuovi dal confronto"
                        onClick={() => removeFromCompare(product.id)}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          style={{ color: "red", fontSize: "1.2rem" }}
                        />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Nome</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.title}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Marca</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.brand}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Modello</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.model}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Sistema operativo</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.operating_system}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Ram</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.ram}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Memoria</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.memory}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Pollici</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.inches}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Risoluzione</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.risolution}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Megapixel</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.megapixel}
                    </span>
                  </td>
                ))}
              </tr>

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543", textTransform: "uppercase" }}>Prezzo</th>
                {compareList.map((product) => (
                  <td key={product.id}>
                    <span
                      className="d-block mx-auto"
                      style={{ fontWeight: 600 }}
                    >
                      {product.price}
                    </span>
                  </td>
                ))}
              </tr>

              {/* {allKeys.map((key) => (
                <tr key={key}>
                  <th style={{ textTransform: "capitalize" }}>
                    {key.replace(/_/g, " ")}
                  </th>
                  {compareList.map((product) => (
                    <td key={product.id}>{String(product[key])}</td>
                  ))}
                </tr>
              ))} */}

              <tr>
                <th style={{ fontWeight: 600, color: "#ff6543",  textTransform: "uppercase" }}>Quantità nel carrello</th>
                {compareList.map((product) => {
                  const cartQty = getCartQuantity(product.id);
                  return (
                    <td key={product.id}>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{ color: "#ff6543", borderColor: "#ff6543" }}
                          onClick={() => {
                            if (cartQty > 1) {
                              updateQuantity(product.id, cartQty - 1);
                            } else if (cartQty === 1) {
                              removeFromCart(product.id);
                            }
                          }}
                          disabled={cartQty === 0}
                          title="Rimuovi uno"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span style={{ minWidth: 20 }}>{cartQty}</span>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          style={{ color: "#ff6543", borderColor: "#ff6543" }}
                          onClick={() => addToCart(product)}
                          title="Aggiungi uno"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-4 flex-wrap gap-3">
          <button
            className="btn btn-warning"
            style={{ background: "#ff6543", color: "white", border: "white" }}
            onClick={clearCompare}
          >
            Svuota confronto
          </button>
          <Link
            to="/shop"
            className="btn"
            style={{ background: "#ff6543", color: "white", border: "white" }}
          >
            Torna allo shop
          </Link>
        </div>
      </div>
    </>
  );
}
