import { Link } from "react-router-dom";

const categories = [
  { name: "Women's Fashion", path: "/products" },
  { name: "Men's Fashion", path: "/products" },
  { name: "Technology", path: "/products" },
  { name: "Home & Lifestyle", path: "/products" },
  { name: "Medicine", path: "/products" },
  { name: "Sports & Outdoor", path: "/products" },
  { name: "Baby's & Toys", path: "/products" },
  { name: "Groceries & Pets", path: "/products" },
  { name: "Health & Beauty", path: "/products" },
];

const HeroSection = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:px-20 xl:container xl:mx-auto h-auto xl:h-[80vh] justify-center xl:pt-14 gap-6 xl:gap-14">
      {/* Left Sidebar */}
      <div className="w-full xl:w-48 flex-shrink-0 hidden xl:block border-r-2 border-gray-300 xl:h-[24rem]">
        <nav className="py-4">
          <ul className="space-y-3 text-lg font-medium">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={category.path}
                  className="relative group flex items-center space-x-1 text-gray-600 hover:text-red-500 ease-in-out duration-300 transform hover:translate-x-4"
                >
                  <span className="relative font-normal group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Main Banner Section */}
      <div className="xl:my-5  w-full h-[60vh] sm:h-[50vh] md:h-[55vh] xl:w-[80%] xl:h-[55vh] xl:rounded-md bg-[url('/src/assets/Hero-banner.jpg')] bg-no-repeat bg-cover bg-center">
        <div className="items-center text-center sm:items-start  sm:text-left px-6 sm:px-10 py-8 flex flex-col h-full justify-center gap-4 md:gap-6 xl:gap-3">
          <h1 className="text-3xl sm:text-3xl md:text-5xl xl:text-4xl font-extrabold tracking-tight text-white">
            <span className="block">Welcome to ShopCart</span>
            <span className="block text-blue-400">Discover Amazing Deals</span>
          </h1>
          <p className="max-w-sm xl:max-w-md text-md md:text-lg text-gray-300">
            Shop the latest trends and find your perfect style with our curated
            collection.
          </p>
          <Link
            to="/products"
            className="text-lg sm:text-lg w-28 font-semibold text-blue-400 underline underline-offset-4 ease-in-out duration-300 transform hover:translate-x-4"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
