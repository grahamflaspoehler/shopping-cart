import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // State is equivalent to data on a Vue instance
  state: {
    products: [],
    cart: [],
  },

  // Getters are equivalent to computed properties on a Vue instance
  // Use Getters when filtering or calculating a property on runtime
  // Getters are available on the store.getters object
  getters: {
    availableProducts(state) {
      return state.products.filter((product) => product.inventory > 0);
    },
  },

  // Actions are equivalent to methods on a Vue instance
  actions: {
    fetchProducts(context) {
      return new Promise((resolve) => {
        //FETCH PRODUCTS FROM API
        shop.getProducts((products) => {
          context.commit("setProducts", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          item => item.id === product.id
        );
        if (!cartItem) {
          context.commit("pushProductToCart", product);
        } else {
          context.commit("incrementCartItemQuantity", cartItem);
        }
        context.commit("decrementProductInventory", product);
      }
    },
  },

  // Mutations are responsible for single state changes
  // Don't update state here
  // Mutation methods take two args: 1) state and 2) payload
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    pushProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        quantity: 1,
      });
    },

    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },
  },

  modules: {},
});
