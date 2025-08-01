import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContex";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./components/NotFound";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailsProductPage from "./pages/DetailsProductPage";
import ComparisonPage from "./pages/ComparisonPage";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";

import { ProductsProvider } from "./context/GetProductsContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";
import { NewsletterProvider } from "./context/newsletterContext";
import { ToastProvider } from "./context/ToastContext";

export default function app() {
  return (
    <>
      <CompareProvider>
        <ToastProvider>
          <ProductsProvider>
            <CartProvider>
              <WishlistProvider>
                <LoaderProvider>
                  <NewsletterProvider>
                    <BrowserRouter>
                      <Routes>
                        <Route element={<DefaultLayout />}>
                          <Route path="/" element={<HomePage />}></Route>
                          <Route path="/shop">
                            <Route index element={<ShopPage />}></Route>
                            <Route
                              path=":slug"
                              element={<DetailsProductPage />}
                            ></Route>
                          </Route>
                          <Route
                            path="/comparison"
                            element={<ComparisonPage />}
                          ></Route>
                          <Route
                            path="/wishlist"
                            element={<WishListPage />}
                          ></Route>
                          <Route path="/cart" element={<CartPage />}></Route>
                          <Route
                            path="/checkout"
                            element={<CheckOutPage />}
                          ></Route>
                          <Route
                            path="/checkout/:slug"
                            element={<CheckOutPage />}
                          ></Route>
                          <Route
                            path="/ordersummary"
                            element={<OrderSummaryPage />}
                          ></Route>
                          <Route path="*" element={<NotFound />} />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </NewsletterProvider>
                </LoaderProvider>
              </WishlistProvider>
            </CartProvider>
          </ProductsProvider>
        </ToastProvider>
      </CompareProvider>
    </>
  );
}
