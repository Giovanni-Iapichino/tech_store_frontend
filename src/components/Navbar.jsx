import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import CartDropdown from "./CartDropdown";
import MenuLink from "./MenuLink";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
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
        <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 col-12">
          <div className="d-flex justify-content-between align-items-center gap-2 col-12 col-sm-2">
            {/* Logo */}
            <NavLink className="nav-link fs-3 col-4 col-sm-2 d-flex align-items-center" aria-current="page" to="/">
              <span style={{ color: "#ff6543" }}>Tech</span>
              <span className="text-dark">Store</span>
            </NavLink>
            {/* Bottone per mobile */}
            <button
              className="navbar-toggler d-sm-none col-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="justify-content-center align-items-center d-none d-sm-flex col-6 col-md-4">
            <MenuLink />
          </div>
          <div className="d-flex flex-md-row-reverse flex-grow-1 gap-3 col-12 col-sm-2 justify-content-center align-items-center">
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
              <div className="position-relative mt-2">
                <span onClick={() => setShowCart(!showCart)} style={{ cursor: "pointer" }}>
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
                </span>

                {/* Dropdown carrello */}
                {showCart && <CartDropdown onClose={() => setShowCart(false)} />}
              </div>
              <FontAwesomeIcon style={{ color: "#ff6543" }} className="fs-4 mt-2" icon={faUser} />
            </div>
          </div>
          {/* Menu centrato */}
          <div className="collapse justify-content-center d-sm-none" id="navbarNav">
            <MenuLink />
          </div>
          <div className="d-flex flex-column flex-md-row col-12 col-md-3 justify-content-center align-items-center">
            {/* FORM di ricerca dentro la navbar */}
            <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center np-form w-100 mt-2 mt-md-0">
              <input type="text" className="form-control border-0 shadow-none np-input" placeholder="Cerca..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
        </div>
      </nav>
    </header>
  );
}
