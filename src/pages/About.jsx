import React from "react";
import Services from "../components/Services";
import StatsCard from "../components/StatsCard";

const About = () => {
  return (
    <div className="bg-gray-100 w-full">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center bg-no-repeat flex justify-center items-center bg-[url('/src/assets/Hero-banner-1.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="text-5xl md:text-6xl text-white font-bold z-10">
          About Us
        </h1>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Welcome to our online store, your trusted destination for
            high-quality products at unbeatable prices. We are committed to
            delivering an exceptional shopping experience, ensuring customer
            satisfaction, reliability, and a unique product selection tailored
            to your needs.
          </p>
        </div>

        {/* Stats Section */}
        <StatsCard />

        {/* Mission Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto px-6">
          <div className="group inline-block  cursor-pointer">
            <h2 className="relative text-3xl md:text-5xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
              Our Mission
            </h2>
          </div>
          <p className="mt-6 mb-10 text-gray-700 text-base md:text-lg leading-relaxed">
            Our mission is to revolutionize online shopping by offering
            premium-quality products that bring convenience, affordability, and
            satisfaction to our customers. We prioritize efficiency, trust, and
            top-notch customer service to ensure an unparalleled shopping
            journey.
          </p>
        </div>

        {/* Features & Services Section */}
        <Services />
      </div>
    </div>
  );
};

export default About;
