import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

export default function ComparisonPage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0)
    return (
      <div className="container">
        <p>Nessun prodotto selezionato per il confronto.</p>
        <Link className="btn btn-warning mt-4" to="/shop">
          Torna allo Shop
        </Link>
      </div>
    );

  // Escludi queste chiavi dalla visualizzazione
  const EXCLUDED_KEYS = [
    "id",
    "title",
    "thumbnail",
    "create_at",
    "update_at",
    "description",
    "slug",
  ];

  // Ottieni tutte le chiavi presenti nei prodotti (unione di tutte le chiavi)
  const allKeys = Array.from(
    new Set(compareList.flatMap((product) => Object.keys(product)))
  ).filter((key) => !EXCLUDED_KEYS.includes(key));

  return (
    <div className="container">
      <h1 className="my-4">Confronto Prodotti</h1>
      <div className="d-flex gap-3 overflow-auto">
        {compareList.map((product) => (
          <div
            className="card p-3 shadow"
            key={product.id}
            style={{ minWidth: "300px" }}
          >
            <h5>{product.title}</h5>
            {/* Visualizza tutte le info tranne quelle escluse */}
            {allKeys.map((key) => (
              <div key={key}>
                <span style={{ fontWeight: 600 }}>
                  {key.replace(/_/g, " ")}:
                </span>{" "}
                {String(product[key])}
              </div>
            ))}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCompare(product.id)}
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-warning mt-4" onClick={clearCompare}>
        Svuota confronto
      </button>
    </div>
  );
}
