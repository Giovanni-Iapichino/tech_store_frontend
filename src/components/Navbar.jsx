import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        {/* Bool shop a sinistra */}

        <NavLink className="nav-link navbar-brand" aria-current="page" to="/">
          Bool shop
        </NavLink>

        {/* Bottone per mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu centrato */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/comparison">
                Comparazione
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                Wishlist
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/checkout">
                Checkout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ordersummary">
                Order summary
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
