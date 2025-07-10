import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center p-5">
      <h1>404 - Pagina non trovata</h1>
      <p>La pagina che stai cercando non esiste o è stata rimossa.</p>
      <Link className="btn btn-orange" to="/">Torna alla Home</Link>
    </div>
  );
}
