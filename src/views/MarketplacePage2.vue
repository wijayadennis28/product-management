<template>
  <v-app>
    <v-app-bar app light color="#354C43" class="justify-center">
      <!-- Logo Section -->
      <v-toolbar-title>
        <img src="@/assets/obiru-logo.png" alt="Logo" @click="$router.push('/')" style="height: 50px; cursor: pointer;">
      </v-toolbar-title>

      <!-- Desktop Search Bar and Actions (visible on desktop) -->
      <v-spacer></v-spacer>
      <v-layout row class="justify-center hidden-sm-and-down">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search for items and brands"
          solo
          class="mx-4"
          hide-details
          outlined
          rounded
          style="width: 400px"
        ></v-text-field>
      </v-layout>

      <!-- Add New Item Button (Desktop) -->
      <v-btn color="green" class="mx-4 hidden-sm-and-down" @click="openAddItemDialog" outlined>Product List</v-btn>

      <!-- Mobile Search Icon (visible on mobile only) -->
      <v-btn icon class="mx-2 hidden-md-and-up" @click="toggleSearchBar" >
        <v-icon color="white" class="responsive-icon">fa-search</v-icon>  <!-- FontAwesome search icon -->
      </v-btn>

      <!-- Add New Item Button (Mobile) -->
      <v-btn color="green" class="mx-2 hidden-md-and-up" @click="openAddItemDialog" outlined>Product List</v-btn>
    </v-app-bar>

    <!-- Expanded Search Bar for Mobile -->
    <v-row class="mobile-search-row hidden-md-and-up" v-if="showMobileSearch">
      <v-col cols="12" class="p-2">
        <v-text-field
          v-model="search"
          append-icon="mdi-close"
          solo
          class="mx-4"
          hide-details
          rounded
          @click:append="closeSearchBar"
          label="Type keyword..."
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Marketplace Product List -->
    <v-container class="mt-40">
      <product-list
        :search="search"
        :products="products"
      />
    </v-container>
  </v-app>
</template>

<script>
import ProductList from '../components/ProductList.vue';

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      search: '',
      showMobileSearch: false,
      products: [
        { id: 1, name: 'Oversized Shirt', price: 250000, description: 'Comfortable Oversized Shirt.', image: 'oversized-shirt-vol2.jpg' },
        { id: 2, name: 'Low High Waisted Pants', price: 250000, description: 'Breathable Low High Waisted Pants.', image: 'long-high-waisted-pants-vol2.jpg' },
        { id: 3, name: 'Buttoned Shirt', price: 250000, description: 'Stylish Buttoned Shirt.', image: 'buttoned-shirt-vol2.jpg' },
      ],
    };
  },
  methods: {
    AddItem() {
      this.$router.push('/add-item');
    },
    toggleSearchBar() {
      this.showMobileSearch = !this.showMobileSearch;
    },
    closeSearchBar() {
      this.showMobileSearch = false;
    },
    openAddItemDialog() {
      this.addItemDialog = true;
    },
    addNewItem() {
      this.$router.push({ name: 'AddItem' });
    },
  },
};
</script>

<style scoped>
.add-product-btn {
  display: none; /* Hide the floating add button */
}

.responsive-icon {
  display: none; 
}

@media (max-width: 600px) {
  .responsive-icon {
    display: inline; 
  }
}
</style>
