const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');


exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('./shop/productList', {
      prods: products,
      pageTitle: 'Products',
      path: '/products',
    });
  }).catch(err => {
    console.log(err)
  })


};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productid
  Product.findByPk(productId).then(product => {
    res.render('./shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/product-detail'
    })
  }).catch(err => { console.log(err) })
}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('./shop/productList', {
      prods: products,
      pageTitle: 'Index Page',
      path: '/',
    });
  }).catch(err => {
    console.log(err)
  })


}

exports.getCart = (req, res, next) => {
  /*  Cart.getProducts(cart => {
      Product.fetchAll(products => {
        const cartProducts = []
        for (product of products) {
          const cartProductData = cart.product.find(prod => prod.id === product.id)
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty })
          }
        }
        res.render('./shop/cart', {
          pageTitle: 'Cart',
          path: '/cart',
          products: cartProducts
        });
      });
    }); */
  req.user.getCart().then(cart => {
    return cart.getProducts().then(products => {
      res.render('./shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: products
      });
    }).catch(err => {
      console.log(err)
    });
  }).catch(err => {
    console.log(err)
  })
}
exports.postCart = (req, res, next) => {
  const productId = req.body.productID;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: productId } })
  }).then(products => {
    let product;
    if (products.length > 0) {
      product = products[0]
    }
    if (product) {
      const oldQty = product.cartItem.quantity;
      newQuantity = oldQty + 1;
      return product;
    }
    return Product.findByPk(productId)
  }).then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });

  }).then(result => {
    res.redirect('/cart')
  }).catch(err => {
    console.log(err)
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] }).then(orders => {
    res.render('./shop/orders', {
      pageTitle: 'Orders',
      path: '/orders',
      orders: orders
    })
  }).catch(err => {
    console.log(err)
  })

}
exports.deleteCartItem = (req, res, next) => {
  const prodid = req.body.productid;
  req.user.getCart().then(cart => {
    return cart.getProducts({ where: { id: prodid } })
  }).then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  }).then(result => {
    res.redirect('/cart')
  })
    .catch(err => {
      console.log(err)
    })
}

exports.postOrder = (req, res, next) => {
  let fetchCart
  req.user.getCart().then(cart => {
    fetchCart = cart;
    return cart.getProducts();
  }).then(products => {
    return req.user.createOrder().then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity }
        console.log(product)
        return product;
      }))
    })
  }).catch(err => {
    console.log(err)
  }).then(result => {
    return fetchCart.setProducts(null);
  }).then(result => {
    res.redirect('/orders')
  })
    .catch(err => {
      console.log(err)
    })
}