<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f430a36197347.57135ca19bbf5.gif"
    />
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} -
        {{ product.inventory }}
        <button
          @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
        >
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },

  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addProductToCart: "addProductToCart"
    })
    // addProductToCart(product) {
    //   this.$store.dispatch("addProductToCart", product);
    // }
  },

  computed: {
    ...mapState({
      products: state => state.products
    }),

    ...mapGetters({
      productIsInStock: "productIsInStock"
    })
  },

  // Everything in this hook is run as soon as the instance is created
  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  }
};
</script>
