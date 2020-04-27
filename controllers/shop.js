const Product = require('../models/product');
const Cart = require('../models/cart');


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
  Product.findById(productId,product=>{
    res.render('./shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path:'/product-detail'
    })
  });

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
  Cart.getProducts(cart=>{
    Product.fetchAll(products=>{
      const cartProducts=[]
      for(product of products){
        const cartProductData = cart.product.find(prod=>prod.id===product.id)
        if(cartProductData){
          cartProducts.push({productData:product,qty:cartProductData.qty})
        }
      }
      res.render('./shop/cart',{
        pageTitle:'Cart',
        path:'/cart',
        products:cartProducts
      });
    });
    });
}
exports.postCart = (req,res,next)=>{
  const productId = req.body.productID;
  Product.findById(productId,(product)=>{
    Cart.addProduct(productId,product.price)
  })
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
exports.deleteCartItem = (req,res,next)=>{
  const prodid = req.body.productid;
  Product.findById(prodid,(product)=>{
    Cart.deleteProduct(prodid,product.price)
  });
  res.redirect('/cart')

}
