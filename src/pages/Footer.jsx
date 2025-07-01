import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Colonna 1 */}
          <div className="col-md-3 mb-3">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2">Bool Flix</li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  dolores corporis accusamus. Omnis magnam ipsa dolor fuga autem
                  laudantium ipsam eligendi quisquam repellendus! Id
                  perspiciatis tenetur architecto quibusdam quae hic.
                </p>
              </li>
            </ul>
          </div>

          {/* Colonna 2 */}
          <div className="col-md-3 mb-3">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2">Links</li>
              <li>
                {" "}
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/detailsproduct">
                  Details Product
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/comparison">
                  Comparazione
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/wishlist">
                  Wishlist
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/checkout">
                  Checkout
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link" to="/ordersummary">
                  Order summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3 */}
          <div className="col-md-3 mb-3">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2">Azienda</li>
              <li>Chi siamo</li>
              <li>Lavora con noi</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Colonna 4 */}
          <div className="col-md-3 mb-3">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2">Azienda</li>
              <li>Chi siamo</li>
              <li>Lavora con noi</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
