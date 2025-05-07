import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PromoBanner = ({ products }) => {
  const productList = Array.isArray(products) ? products : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(24 * 3600);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!productList.length) return;

    if (timeLeft <= 0) {
      const nextIndex = (currentIndex + 1) % productList.length;
      setCurrentIndex(nextIndex);
      setTimeLeft(24 * 3600); // Reset timer to 24 hours
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, productList, currentIndex]);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);
  const currentProduct = productList[currentIndex];
  if (!currentProduct) return null;
  const product = {
    id: currentProduct.id,
    name: currentProduct.name,
    description: currentProduct.description,
    image_path: currentProduct.image_path,
  };

  return (
  
      <div className="relative container  bg-black text-white flex flex-col md:flex-row items-center justify-between max-w-[74rem] mx-auto xl:rounded-lg shadow-lg overflow-hidden h-auto md:h-[450px] px-6 md:px-10 py-10 space-y-10 md:space-y-0">
   
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-green-400 font-semibold">Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            {currentProduct?.name}
          </h2>
          <p className="text-gray-300 mt-2 max-w-md mx-auto md:mx-0">
            {currentProduct?.description?.slice(0, 80)}...
          </p>

          <div className="flex justify-center md:justify-start items-center gap-2 sm:gap-4 mt-6">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((t, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-100 p-3 md:p-4 rounded-full w-16 md:w-20"
              >
                <span className="text-xl md:text-1xl font-bold text-black">{t.value}</span>
                <span className="text-xs md:text-sm text-black">{t.label}</span>
              </div>
            ))}
          </div>

          <button className="mt-6 bg-green-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition"
           onClick={() =>
            navigate(`/product/${product.id}`, { state: { product } })
          }
          >
            Buy Now!
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center cursor-pointer">
          <img
            src={currentProduct.image_path || "/placeholder.jpg"}
            alt={currentProduct?.name}
            className="w-[90%] md:w-[500px] h-[250px] md:h-[300px] object-contain transition-transform duration-500 hover:scale-110"
            onClick={() =>
              navigate(`/product/${product.id}`, { state: { product } })
            }
          />
        </div>
      </div>
    
  );
};

export default PromoBanner;
