/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // State is equivalent to data on a Vue instance
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },

  // Getters are equivalent to computed properties on a Vue instance
  // Use Getters when filtering or calculating a property on runtime
  // Getters are available on the store.getters object
  getters: {
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0);
    },

    cartProducts(state){
      return state.cart.map(cartItem => {
        const product = state.products.find(
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
    },

    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
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
    },

    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);
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
    }
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
        quantity: 1
      });
    },

    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    },

    emptyCart(state) {
      state.cart = [];
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    }
  },

  modules: {},
});
