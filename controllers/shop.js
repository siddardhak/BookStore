const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('./shop/productList', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getProductDetails = (req,res,next)=>{
  const productId = req.params.productid
  console.log(Product.findById(productId,product=>{
    res.render('./shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path:'/product-detail'
    })
  }));

}

exports.getIndex = (req,res,next)=>{
  Product.fetchAll(products => {
    res.render('./shop/index', {
      prods: products,
      pageTitle: 'Index',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
}

exports.getCart = (req,res,next)=>{
  res.render('./shop/cart.ejs',{
    pageTitle:'Cart',
    path:'/cart'
  })
}
exports.postCart = (req,res,next)=>{
  const productId = req.body.productID
  console.log(productId)
}

exports.getCheckout = (req,res,next)=>{
  res.render('./shop/checkout',{
    pageTitle:'Checkout',
    path:'/checkout'
  })
}

exports.getOrders = (req,res,next)=>{
  res.render('./shop/orders',{
    pageTitle:'Orders',
    path:'/orders'
  })
}
