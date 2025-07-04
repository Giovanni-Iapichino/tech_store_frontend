import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  // Cambia: conta la quantità totale dei prodotti nel carrello
  const [cartItems, setCartItems] = useState(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const [wishlistItems, setWishlistItems] = useState(wishlist.length);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setCartItems(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    setWishlistItems(wishlist.length);
  }, [cart, wishlist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      q: searchTerm,
      page: 1, // reset pagina quando si cambia ricerca
    };
    setSearchParams(newParams);
    navigate("/shop?" + new URLSearchParams(newParams).toString());
  };

  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg">
        {/* Bool shop a sinistra */}
        <div className="container-fluid d-flex justify-content-between flex-lg-row align-items-center">
          <NavLink className="nav-link navbar-brand fs-3" aria-current="page" to="/">
            <span style={{ color: "#ff6543" }}>Tech</span>
            <span className="text-dark">Store</span>
          </NavLink>
          {/* Menu centrato */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">
                  Offerte
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shop">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bottoni */}
          <div className="buttons d-flex gap-3">
            <Link className="position-relative mt-2" to="/wishlist">
              {wishlistItems > 0 ? (
                <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faHeart} />
              ) : (
                <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faHeartRegular} />
              )}

              {/* {wishlistItems > 0 && (
                <span
                  className="badge bg-dark position-absolute rounded-circle"
                  style={{
                    top: "-10px",
                    right: "-10px",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistItems}
                </span>
              )} */}
            </Link>
            <Link className="position-relative mt-2" to="/cart">
              <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faCartShopping} />
              {cartItems > 0 && (
                <span
                  className="badge bg-dark position-absolute rounded-circle"
                  style={{
                    top: "-10px",
                    right: "-10px",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartItems}
                </span>
              )}
            </Link>
            <FontAwesomeIcon style={{ color: "#ff6543" }} className="fs-4 mt-2" icon={faUser} />

            {/* FORM di ricerca dentro la navbar */}
            <form onSubmit={handleSubmit} className="d-flex align-items-center ms-2 np-form">
              <input type="text" className="form-control border-0 shadow-none np-input" placeholder="Cerca il tuo smartphone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button
                className="btn"
                type="submit"
                style={{
                  background: "#ff6543",
                  color: "#fff",
                  borderRadius: "0 25px 25px 0",
                  border: "none",
                  padding: "8px 14px",
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
          {/* Bottone per mobile */}
          <button className="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
