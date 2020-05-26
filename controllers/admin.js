
const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.image;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
  }).then(result => {
    console.log('created product');
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  })
}


exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productid;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.image;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.imageUrl = updatedImage;
    product.price = updatedPrice,
      product.description = updatedDescription;
    product.save()
  }).then(result => {
    console.log(result)
  }).catch(err => {
    console.log(err)
  })
  return res.redirect('/admin/products')

}


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  console.log(editMode)
  if (!editMode) {
    return res.redirect('/admin/edit-product')
  }
  const prodId = req.params.productid;
  // you can also use Products.findByPK(prodId).then().catch()
  req.user.getProducts({ id: prodId }).then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/admin/products')
    }
    res.render('./admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => {
    console.log(err)
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
  // this is one way => Product.findAll().then(products => {
  req.user.getProducts().then(products => {
    res.render('./admin/products', {
      prods: products,
      pageTitle: 'Admin List',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }).catch(err => {
    console.log(err)
  });

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productid;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('Product Destoryed');
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  });
}