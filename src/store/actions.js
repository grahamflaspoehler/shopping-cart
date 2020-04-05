import shop from "@/api/shop.js";

export default {
  fetchProducts(context) {
    return new Promise((resolve) => {
      //FETCH PRODUCTS FROM API
      shop.getProducts((products) => {
        context.commit("setProducts", products);
        resolve();
      });
    });
  },

  addProductToCart({ state, getters, commit }, product) {
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find((item) => item.id === product.id);
      if (!cartItem) {
        commit("pushProductToCart", product);
      } else {
        commit("incrementCartItemQuantity", cartItem);
      }
      commit("decrementProductInventory", product);
    }
  },

  checkout({ state, commit }) {
    if (!state.cart.length) {
      alert("Please add products to your cart");
      return;
    }

    shop.buyProducts(
      state.products,

      () => {
        commit("emptyCart");
        commit("setCheckoutStatus", "success");
      },

      () => {
        commit("setCheckoutStatus", "failure");
      }
    );
  },
};
