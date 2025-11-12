export const ProductForm = ({ product, onSubmit, onChange }) => {
  
  const handleSubmit = (e) => {
    console.log("Form submit triggered"); // Debug log
    console.log("Product data:", product); // Debug log
    onSubmit(e);
  };

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value); // Debug log
    onChange(e);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-xl max-w-lg w-full border">
      <h2 className="text-xl font-semibold mb-4">
        {product._id ? "Edit Product" : "Create Product"}
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name || ""}
          onChange={handleInputChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity || ""}
          onChange={handleInputChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          min="0"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price || ""}
          onChange={handleInputChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          min="0"
          step="0.01"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL (optional)"
          value={product.image || ""}
          onChange={handleInputChange}
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 w-full cursor-pointer"
          onClick={() => console.log("Button clicked!")} // Debug log
        >
          {product._id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;