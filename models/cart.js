const fs = require("fs");
const path = require("path");

const filepath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(filepath, (err, fileContent) => {
      let cart = { product: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.product.findIndex(
        (products) => products.id === id
      );
      const existingProduct = cart.product[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.product = [...cart.product];
        cart.product[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        console.log(...cart.product)
        cart.product = [...cart.product, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(filepath, JSON.stringify(cart), (err) => {
        if (err) console.log(err);
      });
    });
  }
  static deleteProduct(id, price) {
    fs.readFile(filepath, (err, fileContent) => {
      if (!err) {
        const updatedCart = { ...JSON.parse(fileContent) };
        const product = updatedCart.product.find((prod) => prod.id === id);
        if(!product){
          return;
        }
        const productQty = product.qty;
        updatedCart.product = updatedCart.product.filter(
          (prod) => prod.id !== prod.id
        );
        updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;
        fs.writeFile(filepath, JSON.stringify(updatedCart), (err) => {
          if (err) console.log(err);
        });
      }
    });
  }
  static getProducts(cb) {
    fs.readFile(filepath, (err, fileContent) => {
      const cart = { ...JSON.parse(fileContent) };
      if (err) {
        cb(null);
      }
      cb(cart);
    });
  }
};
