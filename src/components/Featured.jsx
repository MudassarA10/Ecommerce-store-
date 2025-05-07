import { Link } from "react-router-dom";

const Featured = ({ products }) => {
  const ShopNow = () => (
    <button className="mb-4 md:mb-0 flex gap-2 underline underline-offset-8 py-2 focus:underline-offset-2 ease-in-out duration-300 transform hover:translate-x-4">
      <span>Shop Now</span>
      <svg
        className="mt-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 12H20M20 12L13 5M20 12L13 19"
          stroke="#FAFAFA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col px-5 sm:px-0 my-24 mx-auto container">
      <div className="sm:px-14">
        <div className="mb-8 flex flex-row gap-4 items-center md:text-xl  font-bold">
          <span className="bg-red-500 h-10 w-5 rounded"></span>
          <span className="text-red-500">Featured</span>
        </div>

        <div className="group inline-block mb-14 cursor-pointer">
          <h2 className="relative text-2xl md:text-4xl font-bold text-gray-700 transition-colors duration-300 group-hover:text-red-500 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-0 after:h-[3px] after:bg-red-500 after:transition-all after:duration-300 group-hover:after:w-full">
            Flash Sales
          </h2>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-8 justify-center  md:items-center">
        <div className="bg-black rounded md:pt-12 md:px-8 md:h-[600px] md:w-[570px]">
          <div className=" text-white relative flex gap-10  md:mt-10 items-center justify-center flex-col-reverse md:flex-row md:w-[511px] md:h-[511px] sm:h-[500px] h-[380px]">
            <div className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover">
              <Link
                to={`/product/${products[0]?.id}`}
                state={{ product: products[0] }}
              >
                <img
                  loading="lazy"
                  className="w-full h-full transition-transform duration-300 transform  hover:-translate-y-4  hover:scale-101 hover:motion-safe:animate-pulse opacity-50 hover:opacity-100"
                  src={products[0]?.image_path}
                  alt={products[0]?.name}
                />
              </Link>
            </div>
            <div className="flex transform flex-col gap-1 md:gap-4 mt-auto md:mr-auto  w-[270px] md:mb-8  items-center md:items-start justify-end">
              <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                {products[0]?.name}
              </h2>
              <p className=" text-center md:text-start text-sm ">
                {products[0]?.description}
              </p>
              <Link
                to={`/product/${products[0]?.id}`}
                state={{ product: products[0] }}
              >
                <ShopNow />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="bg-black rounded h-[284px] md:w-[570px]">
            <div className="text-white relative flex items-center justify-center flex-col-reverse md:flex-row w-full h-full">
              <div className="overflow-hidden absolute bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105 p-10">
                <Link
                  to={`/product/${products[1]?.id}`}
                  state={{ product: products[1] }}
                >
                  <img
                    loading="lazy"
                    className="w-full h-[40vh]  transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                    src={products[1]?.image_path}
                    alt={products[1]?.name}
                  />
                </Link>
              </div>
              <div className="flex transform flex-col gap-1 md:gap-4 mt-auto md:mr-auto md:pl-8 md:pb-4 items-center sm:items-start w-[300px]">
                <h2 className="text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                  {products[1]?.name}
                </h2>
                <p className="text-center md:text-start text-sm">
                  {products[1]?.description}
                </p>
                <Link
                  to={`/product/${products[1]?.id}`}
                  state={{ product: products[1] }}
                >
                  <ShopNow />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-black rounded md:px-6  h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-4 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105   ">
                  <Link
                    to={`/product/${products[2]?.id}`}
                    state={{ product: products[2] }}
                  >
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                      src={products[2]?.image_path}
                      alt={products[2]?.name}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px] items-center md:items-start md:justify-end">
                  <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                    {products[2]?.name}
                  </h2>
                  <p className=" text-center md:text-start text-sm ">
                    {products[2]?.description}
                  </p>
                  <Link
                    to={`/product/${products[2]?.id}`}
                    state={{ product: products[2] }}
                  >
                    <ShopNow />
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-black rounded  md:px-6 h-[284px] min-[400px]:max-sm:h-[450px] md:w-[270px]">
              <div className=" text-white relative flex md:gap-10 md:mt-10 items-center justify-center flex-col-reverse md:flex-row w-full h-full md:h-[221px] ">
                <div className="px-16 py-8 min-[400px]:px-auto sm:p-0 overflow-hidden absolute inset-0 z-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 transform hover:scale-105  ">
                  <Link
                    to={`/product/${products[3]?.id}`}
                    state={{ product: products[3] }}
                  >
                    <img
                      loading="lazy"
                      className="w-full h-full max-w-[400px] transition-transform duration-300 transform  hover:-translate-y-1 hover:scale-102 hover:motion-safe:animate-pulse object-cover opacity-50 hover:opacity-100"
                      src={products[3]?.image_path}
                      alt={products[3]?.name}
                    />
                  </Link>
                </div>
                <div className="flex transform flex-col gap-1 md:gap-2 mt-auto md:mr-auto md:pl-4 w-[270px]  items-center md:items-start md:justify-end">
                  <h2 className=" text-center md:text-start text-lg md:text-2xl font-semibold font-inter">
                    {products[3]?.name}
                  </h2>
                  <p className=" text-center md:text-start text-sm ">
                    {products[3]?.description}
                  </p>
                  <Link
                    to={`/product/${products[3]?.id}`}
                    state={{ product: products[3] }}
                  >
                    <ShopNow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
