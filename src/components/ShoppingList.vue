<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1f430a36197347.57135ca19bbf5.gif"
    />
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    }
  },

  // Everything in this hook is run as soon as the instance is created
  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  }
};
</script>
