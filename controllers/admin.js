
const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageurl = req.body.image;
  const desc = req.body.description;
  const product = new Product(null, title, imageurl, desc, price);
  product.save();
  res.redirect('/');
};


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productid;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.image;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedDescription, updatedPrice)
  updatedProduct.save();
  res.redirect('/admin/products')

}


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  console.log(editMode)
  if (!editMode) {
    return res.redirect('/admin/edit-product')
  }
  const prodId = req.params.productid;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/admin/products')
    }
    res.render('./admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })

};

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('./admin/products', {
      prods: products,
      pageTitle: 'Admin List',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productid;
  Product.deleteProduct(prodId);
  res.redirect('/admin/products')
}