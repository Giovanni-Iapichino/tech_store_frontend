import { NavLink } from "react-router-dom";

export default function MenuLink() {
  return (
    <ul className="d-flex gap-2 list-unstyled m-0">
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
  );
}
