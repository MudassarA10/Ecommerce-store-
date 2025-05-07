import React from "react";
import { FaShippingFast, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { Box } from "@mui/material";
const services = [
  {
    icon: FaShippingFast,
    title: "Fast & Free Shipping",
    description: "Get your orders delivered quickly and at no extra cost.",
  },
  {
    icon: FaUndo,
    title: "Easy Returns",
    description: "We return money within 30 days if you're not satisfied.",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Our support team is available around the clock for you.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    description: "Your transactions are safe with our encrypted payments.",
  },
];

const Services = () => {
  return (
    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {services.map((item, index) => {
        const Icon = item.icon;
        return (
          <Box
            key={index}
            className="flex max-w-xs gap-4 items-center cursor-pointer justify-center flex-col bg-white px-4 py-8 rounded-lg border border-gray-200 transition duration-300 hover:bg-[#f73636] group hover:shadow-xl"
          >
            <Box className="p-2 rounded-full bg-gray-300">
              <Box className="text-4xl invert p-2 rounded-full bg-white">
                <Icon className="text-4xl" />
              </Box>
            </Box>
            <h3 className="text-xl font-bold my-2 group-hover:text-gray-100 text-nowrap">{item.title}</h3>
            <p className="text-gray-600 text-center group-hover:text-gray-200">{item.description}</p>
          </Box>
        );
      })}
    </div>
  );
};

export default Services;
