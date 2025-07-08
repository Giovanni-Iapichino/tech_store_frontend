import { Link } from "react-router-dom";
import MenuLink from "../components/MenuLink";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Colonna 1 */}
          <div className="col-md-4">
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
          <div className="col-md-4">
            <MenuLink />
          </div>

          {/* Colonna 2 */}
          <div className="col-md-4">
            <h5>Contattaci</h5>
            <p>
              Hai domande o suggerimenti?
              <p>
                scrivici a{" "}
                <a className="text-white" href="mailto:tech.store.team.2@gmail.com" target="_blank">
                  tech.store.team.2@gmail.com
                </a>
              </p>
            </p>
            <p>
              Hai bisogno di assistenza?
              <p>
                Contattaci.{" "}
                <a className="text-white" href="tel:+3933344455566" target="_blank">
                  +39 333 444 555 66
                </a>
              </p>
            </p>
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
