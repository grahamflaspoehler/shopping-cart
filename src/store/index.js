/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import actions from "@/store/actions.js";
import cart from "@/store/modules/cart.js";
import products from "@/store/modules/products.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products
  },
  // State is equivalent to data on a Vue instance
  state: {},

  // Getters are equivalent to computed properties on a Vue instance
  // Use Getters when filtering or calculating a property on runtime
  // Getters are available on the store.getters object
  getters: {},

  // Actions are equivalent to methods on a Vue instance
  actions,

  // Mutations are responsible for single state changes
  // Don't update state here
  // Mutation methods take two args: 1) state and 2) payload
  mutations: {}
});
