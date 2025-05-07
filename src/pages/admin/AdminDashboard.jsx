import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService,categoryService } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaBox, FaList, FaPlus } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const products = await productService.getAllProducts();
        const categories = await categoryService.getCategories();  
       
        
        setStats({
          totalProducts: products.total,
          totalCategories: categories.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaBox className="text-blue-500 text-3xl" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <FaList className="text-green-500 text-3xl" />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Manage Products</h3>
            <p className="text-gray-600">View, edit, and delete products</p>
          </Link>

          <Link
            to="/admin/products/add"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h3>
            <p className="text-gray-600">Create a new product listing</p>
          </Link>
        </div>
      </main>
    </div>
  );
}