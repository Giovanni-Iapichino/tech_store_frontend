import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/////////////// IMPORT BOOTSTRAP //////////////
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
///////////////////////////////////////////////
import "./assets/css/index.css";
import App from "./App.jsx";

/////////////// IMPORT AXIOS ///////////////////
import axios from "axios";
///////////////////////////////////////////////

/////////////// IMPORT REACT-ROUTERS-DOM /////////////////////////////////
import { BrowserRouter, Routes, Route } from "react-router-dom";
//////////////////////////////////////////////////////////////////////////

createRoot(document.getElementById("root")).render(<App />);
