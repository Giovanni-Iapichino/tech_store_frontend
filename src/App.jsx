import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoaderProvider } from "./context/LoaderContex";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailsProductPage from "./pages/DetailsProductPage";
import ComparisonPage from "./pages/ComparisonPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";



export default function app() {
  return (
    <>
      <LoaderProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/shop" element={<ShopPage />}></Route>
              <Route path="/detailsproduct" element={<DetailsProductPage />}></Route>
              <Route path="/comparison" element={<ComparisonPage />}></Route>
              <Route path="/wichlist" element={<WishListPage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/checkout" element={<CheckOutPage />}></Route>
              <Route path="/ordersummary" element={<OrderSummaryPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoaderProvider>
    </>
  );
}
