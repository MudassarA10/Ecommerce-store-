import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ExploreProducts = ({ products, disabled = false }) => {
  return (
    <div className="px-5 sm:px-0 my-20 py-3 mx-auto container">
      <div className="sm:px-14">
        <div className="mb-8 flex flex-row gap-4 items-center md:text-xl  font-bold">
          <span className="bg-red-500 h-10 w-5 rounded"></span>
          <span className="text-red-500">Our Products</span>
        </div>

        <div className="group inline-block mb-14 cursor-pointer">
          <h2 className="relative text-2xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
            Explore Our Products
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`motion-safe:hover:animate-pulse text-sm md:text-base md:px-12 py-3 rounded px-6
            ${
              disabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] "
            }`}
          >
            View All Products
          </Link>
        </div>
      </div>
      <hr className="mx-40 border-gray-300 md:mt-16" />
    </div>
  );
};

export default ExploreProducts;
