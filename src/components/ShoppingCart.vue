<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
    </ul>
    <div>
      <p>total: {{ cartTotal | currency }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  }
}
</script>