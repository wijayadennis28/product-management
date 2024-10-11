<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="relative bg-white shadow-md rounded-lg overflow-hidden group"
      >
        <!-- Image with hover zoom effect -->
        <img
          v-if="product.image"
          :src="require(`@/assets/images/${product.image}`)"
          class="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
          alt="Product Image"
        />

        <!-- Content Area (always visible) -->
        <div class="p-4">
          <h2 class="font-bold text-xl">{{ product.name }}</h2>
          <p>{{ formatPrice(product.price) }}</p>
          <p>{{ product.description }}</p>

          <!-- Add to Cart Button (visible only on mobile) -->
          <button
            class="bg-[#354c43] text-white py-2 px-6 rounded-full text-lg mt-4 w-full md:hidden"
          >
            Add to Cart
          </button>
        </div>

        <!-- Translucent background and button on hover (visible only on desktop) -->
        <div class="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
          <button
            class="bg-[#354c43] text-white py-2 px-6 rounded-full text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    search: String,
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    formatPrice(price) {
      return `Rp ${price.toLocaleString()}`;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
