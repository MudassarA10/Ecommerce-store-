import { Box } from "@mui/material";
import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const statsData = [
  {
    icon: FiShoppingBag,
    value: "10.5k",
    description: "Active sellers on our platform daily worldwide.",
  },
  { 
    icon: FiDollarSign, 
    value: "33k", 
    description: "Monthly product sales processed successfully online." 
  },
  {
    icon: FiUsers,
    value: "45.5k",
    description: "Customers browsing and purchasing regularly worldwide.",
  },
  {
    icon: FiTrendingUp,
    value: "25k",
    description: "Annual gross sales reflecting our rapid growth.",
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 place-items-center">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Box
            key={index}
            className="flex max-w-xs gap-4 items-center justify-center flex-col group cursor-pointer bg-white px-4 py-8 rounded-lg border border-gray-200 transition duration-300 hover:bg-[#f73636] hover:shadow-xl"
          >
            <Box className="p-2 rounded-full bg-gray-300">
              <Box className="text-4xl invert p-2 rounded-full bg-white">
                <Icon className="text-4xl" />
              </Box>
            </Box>
            <h3 className="font-bold text-3xl group-hover:text-gray-100">{stat.value}</h3>
            <p className="text-center text-gray-600 group-hover:text-gray-200">{stat.description}</p>
          </Box>
        );
      })}
    </div>
  );
};

export default StatsCard;
