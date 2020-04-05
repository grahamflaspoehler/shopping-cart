import shop from "@/api/shop.js";

export default {
  state: {
    items: []
  },

  getters: {
    availableProducts(state) {
      return state.items.filter(product => product.inventory > 0);
    },

    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
    }
  },

  mutations: {
    setProducts(state, products) {
      state.items = products;
    },

    decrementProductInventory(state, product) {
      product.inventory--;
    }
  },

  actions: {
    fetchProducts({ commit }) {
      return new Promise(resolve => {
        //FETCH PRODUCTS FROM API
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
  }
};
