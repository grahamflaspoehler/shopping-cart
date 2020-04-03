import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // State is equivalent to data on a Vue instance
  state: {
    products: []
  },

  // Getters are equivalent to computed properties on a Vue instance
  // Use Getters when filtering or calculating a property on runtime
  // Getters are available on the store.getters object
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    }
  },

  // Actions are equivalent to methods on a Vue instance
  actions: {
    fetchProducts(context) {
      return new Promise(resolve => {
        //FETCH PRODUCTS FROM API
        shop.getProducts(products => {
          context.commit("setProducts", products);
          resolve();
        });
      });
    }
  },

  // Mutations are responsible for single state changes
  // Don't update state here
  // Mutation methods take two args: 1) state and 2) payload
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  },

  modules: {}
});
