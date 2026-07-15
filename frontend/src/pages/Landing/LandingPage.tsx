import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Problem from "../../components/landing/Problem/Problem";
import Features from "../../components/landing/Features/Features";
import UseCases from "../../components/landing/UseCases/UseCases";
import Pricing from "../../components/landing/Pricing/Pricing";
import TrustedBy from "../../components/landing/TrustedBy/TrustedBy";
import Testimonials from "../../components/landing/Testimonials/Testimonials";
import FAQ from "../../components/landing/FAQ/FAQ";
import Footer from "../../components/landing/Footer/Footer";

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Problem />
            <Features />
            <UseCases />
            <Pricing />
            {/* <TrustedBy /> */}
            {/* <Testimonials /> */}
            <FAQ />
            <Footer />
        </>
    );
}