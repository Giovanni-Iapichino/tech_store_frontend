import { useProducts } from "../context/GetProductsContext";

export default function ShopPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="container">
        <h2 className="mb-4">
          <strong>Smartphone disponibili</strong>
        </h2>
        <div className="row g-3">
          {products.map((product) => (
            <div key={product.id} className="col-4">
              <div className="card h-100 shadow p-3">
                <div className="card-body d-flex flex-column"></div>
                <h4 className="card-title">
                  {`${product.brand} ${product.title} ${product.model}`}
                </h4>
                <p className="mt-auto card-text">
                  <strong>€{product.price}</strong>
                </p>
                <p className="mt-auto card-text">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
