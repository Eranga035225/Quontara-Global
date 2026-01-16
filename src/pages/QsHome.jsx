import React from "react";
import HeroSection from "../sections/hero-section";
import OurLatestCreation from "../sections/our-latest-creation";
import AboutOurApps from "../sections/about-our-apps";
import OurTestimonials from "../sections/our-testimonials";
import TrustedCompanies from "../sections/trusted-companies";
import SubscribeNewsletter from "../sections/subscribe-newsletter";
import JobPostSection from "../sections/job-post-section";
import ProjectsSection from "../sections/ProjectsSection";
import OurTeam from "../sections/our-team";

const QsHome = () => {
  return (
    <>
      <main className="px-6 md:px-16 lg:px-24 xl:px-32">
        <HeroSection />
        {/* <OurLatestCreation /> */}
        <AboutOurApps />
        <OurTeam />
        <ProjectsSection />
        <OurTestimonials />
        {/* <TrustedCompanies />*/}
        <JobPostSection />
        <SubscribeNewsletter />
      </main>
    </>
  );
};

export default QsHome;
