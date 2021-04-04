(function () {
  async function createProduct(productData) {
    // Get a key for a new Post.
    var newProductKey = firebase.database().ref().child("products").push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/products/" + newProductKey] = productData;

    await firebase.database().ref().update(updates);

    return newProductKey;
  }

  async function fetchProducts() {
    var products = [];
    var data = await firebase
      .database()
      .ref("products")
      .once("value", (data) => data);
    data.forEach((item) => {
      const { key } = item;
      var product = {
        key,
        ...item.val(),
      };
      products.push(product);
    });

    return products;
  }

  async function removeProductByKey(key) {
    console.log("Deleted item key", key)
    var target = firebase.database().ref(`products/${key}`);

    return await target.remove();
  }

  window.removeProductByKey = removeProductByKey;
  window.createProduct = createProduct;
  window.fetchProducts = fetchProducts;
})();
