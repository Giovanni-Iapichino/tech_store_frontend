import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailsProductPage() {
  const { id } = useParams();
  const productApiUrl = `http://localhost:3000/api/v1` + "/products/" + id;
  const [product, setProduct] = useState();

  const fetchProduct = () => {
    axios.get(productApiUrl).then(res => {
      const {product } = res.data;
      setProduct(product);
    });
  };
  useEffect(fetchProduct, []);
  return (
    <>
      {product ?(
        <main>
          <div className="container-details">
            <div className="row ">
              <div className="col-md-6 mb-6">
                <div className="row">
                  <div className="col-2">immagini piccole</div>
                  <div className="col-10">immagine grande</div>
                </div>
              </div>
              <div className="col-md-6 mb-6">
                <div className="title">
                  <h1>{product.title}</h1>
                </div>
                <div className="text">
                  <p>{product.price}</p>
                  <p>{product.description}</p>
                  <p>colore:</p>
                </div>
                <div className="button ">
                  <button className="btn btn-danger">ordina</button>
                  <button className="btn btn-success m-2">aggiungi a carrello</button>
                  <button className="btn btn-dark">&hearts;</button>
                </div>
                <div className="bottom-text">
                  <p>{product.brand}</p>
                  <p>{product.title}{product.model}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-form">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button " role="tab" aria-controls="nav-home" aria-selected="true">Descrizione</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Altre info</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">{product.description}</div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, atque perspiciatis doloribus nisi dolor, aliquam temporibus vel, at possimus beatae quisquam tempore eum asperiores omnis? Voluptatum non aliquam molestias. Ab?</div>
            </div>
          </div>
          <div className="container-related">
            <div className="title">
              <h3>Prodotti correlati</h3>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="card">
                    <div className="card-image">immagine</div>
                    <div className="card-text">testo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    ):(
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    )}
      
    </>
  );
}
