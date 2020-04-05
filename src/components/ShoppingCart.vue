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
    <button @click="checkout">Check out</button>
    <p>{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),

    ...mapGetters({
      products: "cartProducts",
      cartTotal: "cartTotal"
    })
    // products() {
    //   return this.$store.getters.cartProducts;
    // },
    // cartTotal() {
    //   return this.$store.getters.cartTotal;
    // }
  },

  methods: {
    ...mapActions({
      checkout: "checkout"
    })
  }
};
</script>
