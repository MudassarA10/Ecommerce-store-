<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Get all products with pagination and search
    public function index(Request $request)
    {
        $pageSize = 10;
        $query = Product::query();
    
        if ($request->filled('keyword')) {
            $query->whereRaw("name ILIKE ?", ['%' . $request->keyword . '%']);
        }
    
        $products = $query->with('category')->paginate($pageSize);
        
    
        // Convert image paths to full URLs
        $products->getCollection()->transform(function ($product) {
            $product->image_url = $product->image_path;
            $product->category_name = $product->category ? $product->category->name : null;
            return $product;
        });
        
    
        return response()->json([
            'total' => Product::count(), 
            'products' => $products,
        ]); 
    }
    
    // Get all categories
    public function getCategories()
    {
        return response()->json(Category::all());
    }

    // Get a product by ID
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // Create a new product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock' => 'required|integer|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Ensure correct validation
        ]);
    
        // Store image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image_path'] = $path;
        
            // Optional: Store binary into DB
            $validated['image_blob'] = file_get_contents($request->file('image')->getRealPath());
        }
        
    
        // Create product
        $product = Product::create($validated);

        return response()->json($product, 201);
    }
    

   public function update(Request $request, $id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    $validatedData = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|nullable|string',
        'price' => 'sometimes|required|numeric',
        'category_id' => 'sometimes|required|integer|exists:categories,id',
        'stock' => 'sometimes|required|integer',
    ]);

    $product->update($validatedData);

    return response()->json([
        'message' => 'Product updated successfully',
        'product' => $product,
    ]);
}

    // Delete a product
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
