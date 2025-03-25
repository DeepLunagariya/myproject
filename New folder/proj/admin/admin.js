document.getElementById('addProductForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = {
      name: document.querySelector('input[name="name"]').value,
      description: document.querySelector('input[name="description"]').value,
      price: document.querySelector('input[name="price"]').value,
      category: document.querySelector('input[name="category"]').value,
    };
  
    try {
      const response = await fetch('/api/admin/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      alert(result.message);
      loadProducts(); // Reload product list
    } catch (error) {
      alert('Error adding product');
    }
  });
  
  async function loadProducts() {
    const response = await fetch('/api/admin/products');
    const products = await response.json();
  
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="editProduct('${product._id}')">Edit</button>
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  async function deleteProduct(productId) {
    try {
      const response = await fetch(`/api/admin/product/${productId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      alert(result.message);
      loadProducts(); // Reload product list
    } catch (error) {
      alert('Error deleting product');
    }
  }
  
  // Call loadProducts() to display the list on page load
  loadProducts();
  