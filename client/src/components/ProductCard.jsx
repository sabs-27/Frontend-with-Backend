import React from "react";

export const ProductCard = ({ product, onDelete }) => {
  
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Delete button clicked for:", product._id); // Debug log
    onDelete(product._id);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full border hover:shadow-lg transition duration-200">
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600">Qty: {product.quantity}</p>
      <p className="text-gray-600 mb-3">Price: ${product.price}</p>
      {product.image && (
        <img
          src={product.image}
          alt="product"
          className="h-32 w-full object-cover rounded-md mb-3"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <div className="flex justify-between mt-3">
        <a
          className="px-3 py-1 bg-blue-300 text-white rounded-lg hover:bg-blue-400 no-underline"
          href={`/edit/${product._id}`}
          onClick={(e) => console.log("Edit clicked for:", product._id)} // Debug log
        >
          Edit
        </a>
        <button
          className="px-3 py-1 bg-red-300 text-white rounded-lg hover:bg-red-400"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};