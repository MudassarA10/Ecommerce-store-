import { useState, useEffect } from "react";
import { productService } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productService.getAllProducts();
        const productsData = response.products.data; // Accessing the data array

        const uniqueCategories = [
          ...new Set(
            productsData.map((product) => product.category_name || "Unknown")
          ),
        ];

        setProducts(productsData);
        setCategories(uniqueCategories);
      } catch (error) {
        toast.error("Failed to load products", { position: "text-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productTitle = product?.name || "";
    const matchesSearch = productTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const productCategory = product?.category_name || "Unknown";
    const matchesCategory =
      selectedCategory === "all" || productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
       
        <div className="group inline-block mb-4 cursor-pointer">
            <h2 className="relative text-3xl md:text-5xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
            Our Products            </h2>
          </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our collection of high-quality products
        </p>
      </div>

      <div className="mb-12 space-y-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 border-2 border-gray-200 rounded-full transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-red-500 text-white shadow-xl transform scale-105"
                : "bg-white text-gray-700 hover:bg-red-500 hover:text-white shadow-xl"
            }`}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 border-2 border-gray-200 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-red-500 text-white shadow-xl transform scale-105"
                  : "bg-white text-gray-700 hover:text-white hover:bg-red-500 shadow-xl"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
