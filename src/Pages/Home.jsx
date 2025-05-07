import { useState, useEffect } from 'react';
import { productService } from '../services/api';
import HeroSection from '../components/HeroSection';
import ProductSlider from '../components/ProductSlider';
import toast from 'react-hot-toast';
import Featured from '../components/Featured';
import Services from '../components/Services';
import ExploreProducts from '../components/ExploreProducts';
import PromoBanner from '../components/PromoBanner';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        const productList = response.products?.data || []; // ✅ FIXED
        setProducts(productList);
        setLatestProducts(productList.slice(0, 4));
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const getRandomProducts = (arr = [], count = 4) => {
    if (!Array.isArray(arr) || arr.length === 0) return [];
    if (arr.length <= count) return arr;
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <HeroSection />
      <ProductSlider products={getRandomProducts(products)} /> 
      <PromoBanner products={products}/>
      <ExploreProducts products={getRandomProducts(products, 6)} /> 
      <Featured products={latestProducts} /> 
      <div className='container mx-auto px-8 mb-10'>
        <Services />
      </div>
    </div>
  );
}
