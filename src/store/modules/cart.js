import shop from "@/api/shop.js";

export default {
  state: {
    items: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0);
    }
  },

  mutations: {
    pushProductToCart(state, product) {
      state.items.push({
        id: product.id,
        quantity: 1
      });
    },

    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    emptyCart(state) {
      state.items = [];
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  },

  actions: {
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.items.find((item) => item.id === product.id);
        if (!cartItem) {
          commit("pushProductToCart", product);
        } else {
          commit("incrementCartItemQuantity", cartItem);
        }
        commit("decrementProductInventory", product);
      }
    },

    checkout({ state, commit }) {
      if (!state.items.length) {
        alert("Please add products to your cart");
        return;
      }

      shop.buyProducts(
        state.products,

        () => {
          commit("emptyCart" );
          commit("setCheckoutStatus", "success");
        },

        () => {
          commit("setCheckoutStatus", "failure");
        }
      );
    }
  }
}