(function () {
  const databaseRef = firebase.database().ref();
  const storageRef = firebase.storage();

  async function createProduct(productData) {
    // Get a key for a new Post.
    var newProductKey = databaseRef.child("products").push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/products/" + newProductKey] = productData;

    await databaseRef.update(updates);
    await uploadImages(productData.images, newProductKey);

    return newProductKey;
  }

  async function fetchProducts() {
    var products = [];
    var data = await databaseRef
      .child("products")
      .once("value", (data) => data);
    data.forEach((item) => {
      const { key } = item;
      var product = {
        key,
        ...item.val(),
      };

      products.push(product);
      // if (!category) {
      //   return;
      // }

      // if (category && product.category === category) products.push(product);
    });

    return products;
  }

  async function removeProductByKey(key) {
    console.log("Deleted item key", key);
    var target = databaseRef.ref(`products/${key}`);

    return await target.remove();
  }

  async function uploadImages(files, productKey) {
    var promises = null;

    if (files instanceof FileList) {
      const filesList = Array.from(files);
      promises = filesList.map((file, index) => {
        const fragments = file.name.split(".");
        const ext = fragments[fragments.length - 1];
        const fileName = `image-${index}.${ext}`;

        return storageRef.ref(`images/${productKey}`).child(fileName).put(file);
      });
    }

    const results = await Promise.all(promises);

    return results;
  }

  // async function

  window.uploadImages = uploadImages;
  window.removeProductByKey = removeProductByKey;
  window.createProduct = createProduct;
  window.fetchProducts = fetchProducts;
})();
