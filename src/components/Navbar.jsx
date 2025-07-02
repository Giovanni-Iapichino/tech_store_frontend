import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [cartItems, setCartItems] = useState(cart.length);
  const [wishlistItems, setWishlistItems] = useState(wishlist.length);

  useEffect(() => {
    setCartItems(cart.length);
    setWishlistItems(wishlist.length);
  }, [cart, wishlist]);

  return (
    <header className="container">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between">
          {/* Bool shop a sinistra */}

          <NavLink className="nav-link navbar-brand fs-3" aria-current="page" to="/">
            <span style={{ color: "#ff6543" }}>Tech</span>
            <span className="text-dark">Store</span>
          </NavLink>

          {/* Bottone per mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

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

          <div className="buttons d-flex gap-3">
            <Link className="position-relative" to="/wishlist">
              <FontAwesomeIcon style={{ color: "#ff6543" }} className="fs-4" icon={faHeart} />

              {wishlistItems > 0 && (
                <span
                  className="badge bg-dark position-absolute rounded-circle"
                  style={{ top: "-10px", right: "-10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link className="position-relative" to="/cart">
              <FontAwesomeIcon className="fs-4" style={{ color: "#ff6543" }} icon={faCartShopping} />
              {cartItems > 0 && (
                <span
                  className="badge bg-dark position-absolute rounded-circle"
                  style={{ top: "-10px", right: "-10px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {cartItems}
                </span>
              )}
            </Link>
            <FontAwesomeIcon style={{ color: "#ff6543" }} className="fs-4" icon={faUser} />
          </div>
        </div>
      </nav>
    </header>
  );
}
