 import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { productService } from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import toast from 'react-hot-toast';

const productSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  category: Yup.string().required('Category is required'),
  stock: Yup.number().integer('Stock must be an integer').min(0, 'Stock cannot be negative').required('Stock is required'),
});

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        if (data?.error) {
          throw new Error(data.error);
        }
        setProduct(data);
        setImagePreview(data.image?.url || '');
      } catch (error) {
        toast.error('Failed to fetch product');
        navigate('/admin/products');
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Normalize form values and original product values for accurate comparison
      const normalizedValues = {
        name: values.name.trim(),
        description: values.description.trim(),
        price: Number(values.price),
        category: values.category.trim(),
        stock: Number(values.stock),
      };

      const originalValues = {
        name: product.name.trim(),
        description: product.description.trim(),
        price: Number(product.price),
        category: product?.category?.trim(),
        stock: Number(product.stock),
      };

      const isSameData = JSON.stringify(normalizedValues) === JSON.stringify(originalValues);

      if (isSameData && !imageFile) {
        toast('No changes detected');
        setSubmitting(false);
        return;
      }

      let imageUrl = product.image;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const imageResponse = await productService.uploadImage(formData);
        imageUrl = imageResponse.url;
      }

      const productData = {
        ...normalizedValues,
        image: imageUrl,
      };

      await productService.updateProduct(id, productData);
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <p className="ml-4 text-gray-700">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Formik
            initialValues={{
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              stock: product.stock,
            }}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center space-x-6">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <Field
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <Field
                      name="price"
                      type="number"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.price && touched.price && (
                      <div className="text-red-600 text-sm mt-1">{errors.price}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Field
                      name="category"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.category && touched.category && (
                      <div className="text-red-600 text-sm mt-1">{errors.category}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <Field
                      name="stock"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.stock && touched.stock && (
                      <div className="text-red-600 text-sm mt-1">{errors.stock}</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/products')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Product'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
