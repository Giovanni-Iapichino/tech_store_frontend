import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import { useLoaderProvider } from "../context/LoaderContex";
import Loader from "../components/Loader";

export default function DefaultLayout() {
  const { isLoading } = useLoaderProvider();

  return (
    <>
      <Navbar></Navbar>
      <Loader isLoading={isLoading} />
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}
