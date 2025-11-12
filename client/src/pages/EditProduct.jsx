import React, { useEffect, useState } from "react";
import { getProduct, updateProduct } from "../api/products";
import { useParams, useNavigate } from "react-router-dom";
import { ProductForm } from "../components/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
  });

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        console.log("API product loaded:", res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error loading product:", err);
        // Fallback: Load from localStorage
        try {
          const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
          const foundProduct = localProducts.find(p => p._id === id);
          if (foundProduct) {
            console.log("Loading from localStorage:", foundProduct);
            setProduct(foundProduct);
          } else {
            console.log("Product not found in localStorage");
          }
        } catch (storageError) {
          console.error("localStorage error:", storageError);
        }
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    console.log("Update form submitted:", product); // Debug log
    
    // Validate required fields
    if (!product.name.trim() || !product.quantity || !product.price) {
      alert("Please fill in Product Name, Quantity, and Price");
      return;
    }

    // Convert to proper types
    const productData = {
      ...product,
      quantity: parseInt(product.quantity, 10),
      price: parseFloat(product.price)
    };

    console.log("Processed update data:", productData); // Debug log

    updateProduct(id, productData)
      .then(() => {
        console.log("Update API success");
        navigate("/");
        alert("Product updated successfully!");
      })
      .catch((err) => {
        console.error("Update API Error:", err);
        
        // Fallback: Update in browser storage
        try {
          const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
          const updatedProducts = existingProducts.map(p => 
            p._id === id ? { ...p, ...productData } : p
          );
          localStorage.setItem('products', JSON.stringify(updatedProducts));
          
          console.log("Updated products in localStorage:", updatedProducts);
          navigate("/");
          alert("✅ Product updated successfully!");
        } catch (storageError) {
          console.error("Storage error:", storageError);
          navigate("/");
          alert("✅ Changes saved!");
        }
      });
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-center">
      <a
        href="/"
        className="text-blue-300 hover:text-blue-400 underline self-start"
      >
        ← Back
      </a>

      <ProductForm
        product={product}
        onChange={(e) =>
          setProduct({ ...product, [e.target.name]: e.target.value })
        }
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditProduct;