<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import store from "@/store/index.js";
export default {
  computed: {
    products() {
      return store.getters.availableProducts;
    }
  },

  // Everything in this hook is run as soon as the instance is created
  created() {
    store.dispatch("fetchProducts");
  }
};
</script>
