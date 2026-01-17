import GetInTouch from "../sections2/get-in-touch";
import OurTestimonials from "../sections2/our-testimonials";
import TrustedCompanies from "../sections2/trusted-companies";

import LenisScroll from "../components2/lenis-scroll";
import AboutOurApps from "../sections2/about-our-apps";
import HeroSection from "../sections2/hero-section";
import OurLatestCreation from "../sections2/our-latest-creation";
import OurTeam from "../sections2/our-team";
import ProjectsSection from "../sections2/ProjectsSection";
import JobPostSection from "../sections2/job-post-section";

export default function ITServicesPage() {
  return (
    <>
      <LenisScroll />

      <main className="px-6 md:px-16 lg:px-24 xl:px-32">
        <HeroSection />

        {/*<OurLatestCreation /> */}
        <AboutOurApps />
        <OurTeam />
        <ProjectsSection />
        <OurTestimonials />
        {/*<TrustedCompanies /> */}
        <JobPostSection />
      </main>
    </>
  );
}
