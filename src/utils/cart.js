export default function getCart() {

    const cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        return [];
    }

    const cart = JSON.parse(cartString);

    return cart;
}


export function addToCart(product, qty) {
      try{
            const cart = getCart();

            qty = Number(qty);

            const existingProductIndex = cart.findIndex(
                  (item) => {
                        const result =
                        item.product.productId === product.productId;

                        return result;
                  }
            );


            // Product is not already in cart
            if (existingProductIndex === -1 && qty > 0) {

                  cart.push({
                        product: {
                        productId: product.productId,
                        name: product.name,
                        image: product.images[0],
                        price: product.price,
                        labelledPrice: product.labelledPrice
                        },

                        qty: qty
                  });
            }


            // Product already exists in cart
            if (existingProductIndex !== -1) {

                  cart[existingProductIndex].qty += qty;

                  // Remove product if quantity becomes 0 or less
                  if (cart[existingProductIndex].qty <= 0) {

                        cart.splice(existingProductIndex, 1);
                  }
            }


            const cartString = JSON.stringify(cart);

            localStorage.setItem("cart", cartString);
            return true
            
      }catch(error){
            console.error("Error adding product to cart:",error)
            return false
      }      
}


export function getTotal(cart) {

    let total = 0;

    cart.forEach((item) => {

        total += item.product.price * item.qty;

    });

    return total;
}