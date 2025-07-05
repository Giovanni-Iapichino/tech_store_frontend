import { Link } from "react-router-dom";
import MenuLink from "../components/MenuLink";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Colonna 1 */}
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2">TechStore</li>
              <li>
                <p>
                  TechStore è il tuo negozio di fiducia per smartphone di qualità. Offriamo una vasta selezione di dispositivi delle migliori marche come Apple, Samsung, Xiaomi e Huawei. Con prezzi
                  competitivi, spedizione rapida e assistenza clienti dedicata, rendiamo l'acquisto del tuo prossimo smartphone semplice e sicuro.
                </p>
              </li>
            </ul>
          </div>

          {/* Colonna 2 */}
          <div className="col-md-6">
            <MenuLink />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="text-center">&copy; {new Date().getFullYear()} TechStore. Tutti i diritti riservati.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
