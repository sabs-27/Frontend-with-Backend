import React from "react";

const ProductList = ({ products, onDelete }) => {
  return (
    <div>
      <h2>Products</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>${p.price}</td>
              <td>{p.image}</td>
              <td>
                <a href={`/edit/${p._id}`}>Edit</a>{" "}
                <button onClick={() => onDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;