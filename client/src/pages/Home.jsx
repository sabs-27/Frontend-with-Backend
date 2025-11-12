import React, { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../api/products";
import { ProductForm } from "../components/ProductForm";
import { ProductCard } from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
    
    // Add sample data if localStorage is empty (recovery mode)
    const checkAndRestore = () => {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      if (existingProducts.length === 0) {
        console.log("No products found, checking for recovery...");
        // You can manually restore your products here
        const sampleProducts = [
          {
            _id: "soap_1",
            name: "SOAP",
            quantity: 2,
            price: 4,
            image: "https://m.media-amazon.com/images/I/81KPNa3UssL._AC_UF3..."
          }
          // Add more of your products here if needed
        ];
        
        // Uncomment the lines below to restore sample data
        // localStorage.setItem('products', JSON.stringify(sampleProducts));
        // setProducts(sampleProducts);
        // console.log("Sample products restored");
      }
    };
    
    setTimeout(checkAndRestore, 1000); // Check after initial load
    
    // Also listen for storage changes (when returning from edit page)
    const handleStorageChange = () => {
      console.log("Storage changed, reloading products");
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange); // Reload when window gets focus
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const loadProducts = () => {
    console.log("Loading products...");
    
    getProducts()
      .then((res) => {
        console.log("API products loaded:", res.data);
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
          // Only save to localStorage if we got data from API
          localStorage.setItem('products', JSON.stringify(res.data));
        } else {
          // If API returns empty, check localStorage first
          const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
          if (localProducts.length > 0) {
            console.log("API empty, keeping localStorage data:", localProducts);
            setProducts(localProducts);
          } else {
            setProducts([]);
          }
        }
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        // Fallback: Load from localStorage
        try {
          const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
          console.log("Loading from localStorage:", localProducts);
          setProducts(localProducts);
        } catch (storageError) {
          console.error("Storage error:", storageError);
          setProducts([]); // Set empty array on error
        }
      });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newProduct.name.trim() || !newProduct.quantity || !newProduct.price) {
      alert("Please fill in Product Name, Quantity, and Price");
      return;
    }

    console.log("Form submitted:", newProduct); // Debug log

    // Convert to proper types
    const productData = {
      ...newProduct,
      quantity: parseInt(newProduct.quantity, 10),
      price: parseFloat(newProduct.price),
      _id: Date.now().toString() // Temporary ID for demo
    };

    console.log("Processed product:", productData); // Debug log

    // Try API call first, fallback to local storage
    createProduct(productData)
      .then(() => {
        console.log("API success");
        setNewProduct({ name: "", quantity: "", price: "", image: "" });
        loadProducts();
        alert("Product created successfully!");
      })
      .catch((err) => {
        console.error("API Error:", err);
        // Fallback: Add to local state and localStorage
        console.log("Using fallback - adding to local storage");
        
        const newProducts = [...products, productData];
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
        
        setNewProduct({ name: "", quantity: "", price: "", image: "" });
        alert("✅ Product created successfully!");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    console.log("Deleting product:", id); // Debug log

    deleteProduct(id)
      .then(() => {
        console.log("Delete API success");
        loadProducts();
        alert("Product deleted successfully!");
      })
      .catch((err) => {
        console.error("Delete API Error:", err);
        // Fallback: Remove from local state and localStorage
        console.log("Using fallback - removing from local storage");
        
        const updatedProducts = products.filter(p => p._id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        
        alert("✅ Product deleted successfully!");
      });
  };

  // Recovery function to restore lost products
  const restoreSampleProducts = () => {
    const sampleProducts = [
      {
        _id: "laptop_" + Date.now(),
        name: "Premium Laptop",
        price: 1299.99,
        description: "High-performance laptop with 16GB RAM and 512GB SSD",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
      },
      {
        _id: "headphones_" + Date.now(),
        name: "Wireless Headphones", 
        price: 89.99,
        description: "Noise-cancelling Bluetooth headphones with 30hr battery",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
      },
      {
        _id: "watch_" + Date.now(),
        name: "Smart Watch",
        price: 249.99,
        description: "Fitness tracker with heart rate monitor and GPS",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
      }
    ];
    
    setProducts(sampleProducts);
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    console.log('Sample products restored:', sampleProducts.length);
    alert("✅ Sample products restored!");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Manager</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <ProductForm
          product={newProduct}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
          }
          onSubmit={handleCreate}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Products ({products.length})</h2>
            {products.length === 0 && (
              <button
                onClick={restoreSampleProducts}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                Restore Sample Products
              </button>
            )}
          </div>
          
          {products.length === 0 ? (
            <div className="bg-gray-100 p-8 rounded-lg text-center text-gray-500">
              No products yet. Create your first product!
              <br />
              <small className="text-xs mt-2 block">
                Note: Database connection may be needed for persistence
              </small>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;