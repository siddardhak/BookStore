
const Product = require('../models/product');

  exports.postAddProduct = (req, res, next) => {
      const title = req.body.title;
      const price = req.body.price;
      const imageurl = req.body.image;
      const desc = req.body.description;
    const product = new Product(title,imageurl,desc,price);
    product.save();
    res.redirect('/');
  };

  exports.getAddProduct = (req, res, next) => {
    res.render('./admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

  exports.getAdminProducts = (req,res,next)=>{
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