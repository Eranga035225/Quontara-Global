import LenisScroll from "./components/lenis-scroll";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import QsHome from "./pages/QsHome";
import ContactUs from "./pages/ContactUs";
import ITServicesPage from "./pages/it_services_page";
import AboutUs from "./pages/AboutUs";
import LoginPage from "./pages/admin/LoginPage";
import AdminPage from "./pages/AdminPage";

export default function Page() {
  return (
    <>
      <LenisScroll />
      <Toaster position="top-right" />

      <Routes>
        {/* 🌐 Public routes (WITH navbar & footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<QsHome />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/itservices" element={<ITServicesPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>

        {/* 🔐 Admin routes (NO navbar & footer) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/*" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}
