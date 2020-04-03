import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // State is equivalent to data on a Vue instance
  state: {
    products: []
  },

  // Getters are equivalent to computed properties on a Vue instance
  getters: {
    productsCount() {
      //IMPLEMENT
    }
  },

  // Actions are equivalent to methods on a Vue instance
  actions: {
    getProducts() {
      //FETCH PRODUCTS FROM API
      //RUN setProducts() MUTATION
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
