import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClipboardList, faShieldHalved, faTrophy, faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import ProductCardLigth from "../components/ProductCardLight";
import BestSellerCard from "../components/BestSellerCard";
import { useProducts } from "../context/GetProductsContext";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import PopUpNewsletter from "../components/PopUpNewsletter";
import { useNewsletter } from "../context/newsletterContext";

export default function HomePage() {
  const { bestSeller, promotions, promotionsInComing, promotionsOnGoing } = useProducts();
  const { newsletter, randomClick, setOpen, open, updateRandomClick } = useNewsletter();

  useEffect(() => {
    if (randomClick === 0) {
      setOpen(true);
    }
  }, [randomClick]);

  useEffect(() => {
    if (newsletter === "false") {
      const currentValue = randomClick;
      updateRandomClick(currentValue - 1);
    }
  }, []);

  return (
    <>
      {open && newsletter === "false" && <PopUpNewsletter />}
      <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "300px", width: "100%" }}>
            <div className="bg-body-secondary w-100 h-100 d-flex justify-content-center align-items-center py-2">
              <div className="container h-100 d-flex justify-content-center align-items-center flex-column flex-sm-row my-auto">
                <div className="title-carusel">
                  <h4>Iphone 16 Pro Max</h4>
                  <p>L’iPhone 16 Pro Max è lo smartphone più potente mai realizzato da Apple. Con il nuovo chip A18 Pro, un display ancora più grande e brillante, fotocamere professionali di nuova generazione e funzioni AI all’avanguardia, porta l’esperienza mobile a un livello superiore. </p>
                </div>
                <div className="img-carusel">
                  <img className="d-block w-100" src="/smartphone/16pro.png" alt="..." />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "300px", width: "100%" }}>
            <div className="bg-body-secondary w-100 h-100 d-flex justify-content-center align-items-center py-2">
              <div className="container h-100 d-flex justify-content-center align-items-center flex-column flex-sm-row">
                <div className="title-carusel">
                  <h4>Xiaomi 14</h4>
                  <p>Lo Xiaomi 14 unisce prestazioni di alto livello e design compatto. Dotato del potente processore Snapdragon 8 Gen 3, un display AMOLED ultra nitido e un sistema fotografico Leica di nuova generazione, offre un’esperienza premium in un formato maneggevole.</p>
                </div>
                <div className="img-carusel">
                  <img className="d-block w-100" src="/smartphone/xiaomi.png" alt="..." />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "300px", width: "100%" }}>
            <div className="bg-body-secondary w-100 h-100 d-flex justify-content-center align-items-center py-2">
              <div className="container h-100 d-flex justify-content-center align-items-center flex-column flex-sm-row">
                <div className="title-carusel">
                  <h4>Samsung S24</h4>
                  <p>Il Samsung Galaxy S24 porta l’AI al cuore dello smartphone. Con il nuovo Galaxy AI, un display Dynamic AMOLED brillante, prestazioni fluide grazie al chip Exynos 2400 (o Snapdragon 8 Gen 3, a seconda del mercato) e un comparto fotografico migliorato, offre un’esperienza completa, potente e intelligente.</p>
                </div>
                <div className="img-carusel">
                  <img className="d-block w-100" src="/smartphone/samsungs24.webp" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <main className="container">
        <div className="services my-5">
          <div className="row">
            <div className="col-md-3">
              <div className="service d-flex gap-3">
                <div className="service-icon">
                  <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faCartShopping} />
                </div>
                <div className="service-content">
                  <h5>Spedizione Gratuita</h5>
                  <p>Spedizione gratuita per tutti gli ordini superiori a 100€</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service d-flex gap-3">
                <div className="service-icon">
                  <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faTrophy} />
                </div>
                <div className="service-content">
                  <h5>Qualità</h5>
                  <p>Prodotti originali e di alta qualità</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service d-flex gap-3">
                <div className="service-icon">
                  <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faClipboardList} />
                </div>
                <div className="service-content">
                  <h5>Offerte</h5>
                  <p>Offerte e sconti sui nostri prodotti</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="service d-flex gap-3">
                <div className="service-icon">
                  <FontAwesomeIcon className="fs-3" style={{ color: "#ff6543" }} icon={faShieldHalved} />
                </div>
                <div className="service-content">
                  <h5>Sicurezza</h5>
                  <p>Pagamento sicuro con PayPal, Carta di Credito, Bonifico Bancario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brands my-5">
          <div className="row align-items-center gap-3 justify-content-center">
            <Link to="/shop?brand=apple" className="card-brand border">
              <img className="w-100" src="/brand/apple.jpg" alt="Brand 1" />
            </Link>
            <Link to="/shop?brand=samsung" className="card-brand border">
              <img className="w-100" src="/brand/samsung.jpg" alt="Brand 1" />
            </Link>
            <Link to="/shop?brand=lg" className="card-brand border">
              <img className="w-100" src="/brand/lg.png" alt="Brand 1" />
            </Link>
            <Link to="/shop?brand=huawei" className="card-brand border">
              <img className="w-100" src="/brand/huawei.png" alt="Brand 1" />
            </Link>
            <Link to="/shop?brand=xiaomi" className="card-brand border">
              <img className="w-100" src="/brand/xiaomi.png" alt="Brand 1" />
            </Link>
            <Link to="/shop?brand=motorola" className="card-brand border">
              <img className="w-100" src="/brand/motorola.svg" alt="Brand 1" />
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row gap-4">
          <div className="d-flex flex-column gap-4 col-12 col-lg-6">
            <h5 className="">Promozioni in corso</h5>
            <div className="promotions d-flex gap-4 justify-content-between align-items-center">
              {/* <div className="banner">
            <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faChevronLeft} />
          </div> */}
              <div className="row gap-3 flex-nowrap overflow-y-auto p-3 hide-scrollbar">
                {promotionsOnGoing && promotionsOnGoing.map((product) => <ProductCardLigth key={product.id} product={product} />)}
              </div>
              {/* <div className="banner-arrow">
            <FontAwesomeIcon className="fs-3" icon={faChevronRight} />
          </div> */}
            </div>
          </div>
          <div className="d-flex flex-column gap-4 col-12 col-lg-6">
            <h5 className="">Promozioni in arrivo</h5>
            <div className="promotions d-flex gap-4 justify-content-between align-items-center">
              {/* <div className="banner">
            <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faChevronLeft} />
          </div> */}
              <div className="row gap-4 overflow-y-auto flex-nowrap p-2 hide-scrollbar justify-content-between col-12">
                {promotionsInComing && promotionsInComing.map((product) => <ProductCardLigth key={product.id} product={product} />)}
              </div>
              {/* <div className="banner-arrow">
            <FontAwesomeIcon className="fs-3" icon={faChevronRight} />
          </div> */}
            </div>
          </div>
        </div>
        <h5 className="my-5">Best Selling Items</h5>
        <div className="promotions my-5 d-flex gap-3  align-items-center">
          {/* <div className="banner">
            <FontAwesomeIcon className="fs-3 cursor-pointer" icon={faChevronLeft} />
          </div> */}
          <div className="row gap-4 overflow-y-auto flex-nowrap p-2 hide-scrollbar justify-content-between col-12">
            {bestSeller && bestSeller.map((product) => <BestSellerCard key={product.id} product={product} />)}
          </div>
          {/* <div className="banner-arrow">
            <FontAwesomeIcon className="fs-3" icon={faChevronRight} />
          </div> */}
        </div>
      </main>
    </>
  );
}
