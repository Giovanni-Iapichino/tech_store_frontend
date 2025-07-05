import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import { useLoaderProvider } from "../context/LoaderContex";
import Loader from "../components/Loader";

export default function DefaultLayout() {
  const { isLoading } = useLoaderProvider();

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar></Navbar>
        <Loader isLoading={isLoading} />
        <main className="flex-grow-1">
          <Outlet />
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
