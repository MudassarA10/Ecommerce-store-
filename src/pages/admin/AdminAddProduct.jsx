import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { productService } from "../../services/api";
import { categoryService } from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import toast from "react-hot-toast";

const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  category_id: Yup.string().required("Category is required"),
  stock: Yup.number()
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
});

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // ✅ Function to clean up image URLs
  const cleanImageUrl = (url) => {
    if (!url) return null;
    return url.replace(/\\\//g, "/");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error("Invalid category data format", response);
          toast.error("Failed to load categories");
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNewCategorySubmit = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await categoryService.createCategory({
        name: newCategory,
      });
      const createdCategory = response;
      setCategories((prev) => [...prev, createdCategory]);
      setNewCategory("");
      toast.success("Category added successfully");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category_id", values.category_id);
      formData.append("stock", values.stock);

      if (values.image instanceof File) {
        formData.append("image", values.image);
      } else {
        throw new Error("Invalid image format");
      }

      const response = await productService.createProduct(formData);
      toast.success("Product created successfully");

      // Optional: Clean image URL from response
      const cleanUrl = cleanImageUrl(response?.image_path);
      console.log("Cleaned Image URL:", cleanUrl);

      navigate("/admin/products");
    } catch (error) {
      console.error("Product creation error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Add New Product
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              category_id: "",
              stock: "",
              image: null,
            }}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, setFieldValue }) => (
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
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
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
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </div>
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
                    className="w-full px-3 py-2 border rounded-md shadow-sm"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-600 text-sm mt-1">
                      {errors.description}
                    </div>
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
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.price && touched.price && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.price}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="flex space-x-2">
                      <Field
                        as="select"
                        name="category_id"
                        className="w-full px-3 py-2 border rounded-md shadow-sm"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    {errors.category_id && touched.category_id && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.category_id}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <Field
                      name="stock"
                      type="number"
                      className="w-full px-3 py-2 border rounded-md shadow-sm"
                    />
                    {errors.stock && touched.stock && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.stock}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="w-40 px-3 py-2 border rounded-md shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleNewCategorySubmit}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate("/admin/products")}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 disabled:opacity-50"
                    >
                      {isSubmitting ? "Creating..." : "Create Product"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
