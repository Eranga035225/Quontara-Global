import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import QsHome from "./pages/QsHome";
import ContactUs from "./pages/ContactUs";
import ITServicesPage from "./pages/it_services_page";
import AboutUs from "./pages/AboutUs";

export default function Page() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<QsHome />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/itservices" element={<ITServicesPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}
