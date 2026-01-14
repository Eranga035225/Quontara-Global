import GetInTouch from "./sections2/get-in-touch";
import OurTestimonials from "./sections2/our-testimonials";
import SubscribeNewsletter from "./sections2/subscribe-newsletter";
import TrustedCompanies from "./sections2/trusted-companies";
import Footer from "./components2/footer";
import LenisScroll from "./components2/lenis-scroll";
import Navbar from "./components2/navbar";
import AboutOurApps from "./sections2/about-our-apps";
import HeroSection from "./sections/hero-section";
import OurLatestCreation from "./sections2/our-latest-creation";


export default function ITServicesPage(){

   return (
          <>
              <LenisScroll />
              <Navbar />
              <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                  <HeroSection />
                  <OurLatestCreation />
                  <AboutOurApps />
                  <OurTestimonials />
                  <TrustedCompanies />
                  <GetInTouch />
                  <SubscribeNewsletter />
              </main>
              <Footer />
          </>
      );








}