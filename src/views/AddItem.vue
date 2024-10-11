<template>
  <v-app>
    <!-- Custom Navigation Bar -->
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
      <v-btn color="green" class="mx-4 hidden-sm-and-down" @click="openAddItemDialog" outlined>Add New Item</v-btn>

      <!-- Mobile Search Icon (visible on mobile only) -->
      <v-btn icon class="mx-2 hidden-md-and-up" @click="toggleSearchBar" >
        <v-icon color="white" class="responsive-icon">fa-search</v-icon>  <!-- FontAwesome search icon -->
      </v-btn>

      <!-- Add New Item Button (Mobile) -->
      <v-btn color="green" class="mx-2 hidden-md-and-up" @click="openAddItemDialog" outlined>Add Item</v-btn>
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

    <!-- Product List -->
    <v-container class="mt-20">
      <div class="space-y-6 mt-4">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex bg-white shadow-md rounded-lg overflow-hidden items-center"
        >
          <!-- Image -->
          <img
            v-if="product.image"
            :src="require(`@/assets/images/${product.image}`)"
            class="w-1/3 h-48 object-cover"
            alt="Product Image"
          />
          <img
            v-else
            src="@/assets/obiru-logo.png"
            class="w-1/3 h-48 object-cover"
            alt="Obiru Logo"
          />

          <!-- Content Area -->
          <div class="p-4 flex-1">
            <h2 class="font-bold text-xl">{{ product.name }}</h2>
            <p>{{ formatPrice(product.price) }}</p>
            <p>{{ product.description }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col p-4 space-y-2">
            <v-btn color="blue" @click="editProduct(product)">Edit</v-btn>
            <v-btn color="red" @click="confirmDelete(product.id)">Delete</v-btn>
          </div>
        </div>
      </div>
    </v-container>

    <!-- Add Item Dialog -->
    <v-dialog v-model="addItemDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Item</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="newProduct.name"
              :rules="[rules.required]"
              label="Product Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newProduct.price"
              :rules="[rules.required, rules.number]"
              label="Price"
              required
            ></v-text-field>
            <v-textarea
              v-model="newProduct.description"
              :rules="[rules.required]"
              label="Description"
              required
            ></v-textarea>
            <v-file-input
              v-model="newProduct.image"
              :rules="[rules.image]"
              label="Product Image (optional)"
              prepend-icon="fa-camera"
              accept="image/*"
              @change="onImageChange"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addItemDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="addItem" :disabled="!valid">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Product Dialog -->
    <v-dialog v-model="editItemDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="selectedProduct.name"
              :rules="[rules.required]"
              label="Product Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="selectedProduct.price"
              :rules="[rules.required, rules.number]"
              label="Price"
              required
            ></v-text-field>
            <v-textarea
              v-model="selectedProduct.description"
              :rules="[rules.required]"
              label="Description"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editItemDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="updateProduct" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="confirmDeleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="confirmDeleteDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteProduct">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      showMobileSearch: false,
      products: [
        { id: 1, name: 'V Neck Blouse', price: 250000, description: 'Comfortable v neck blouse.', image: 'vneck-blouse-vol1.jpg' },
        { id: 2, name: 'Slit Midi Skirt', price: 250000, description: 'Breathable midi skirt.', image: 'slit-midi-skirt-vol1.jpg' },
        { id: 3, name: 'Midi Skirt', price: 250000, description: 'Stylish midi skirt.', image: 'midi-skirt-vol1.jpg' },
        { id: 4, name: 'Oversized Shirt', price: 250000, description: 'Comfortable Oversized Shirt.', image: 'oversized-shirt-vol2.jpg' },
        { id: 5, name: 'Low High Waisted Pants', price: 250000, description: 'Breathable Low High Waisted Pants.', image: 'long-high-waisted-pants-vol2.jpg' },
        { id: 6, name: 'Buttoned Shirt', price: 250000, description: 'Stylish Buttoned Shirt.', image: 'buttoned-shirt-vol2.jpg' },
      ],
      addItemDialog: false,
      editItemDialog: false,
      confirmDeleteDialog: false,
      selectedProduct: {},
      productToDelete: null,
      newProduct: { name: '', price: '', description: '', image: '' },
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        number: value => !isNaN(value) || 'Must be a number.',
      }
    };
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
    toggleSearchBar() {
      this.showMobileSearch = !this.showMobileSearch;
    },
    closeSearchBar() {
      this.showMobileSearch = false;
    },
    openAddItemDialog() {
      this.addItemDialog = true;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newProduct.image = file.name;
      }
    },
    addItem() {
      if (this.$refs.form.validate()) {
        const newId = this.products.length + 1;
        const newProduct = { ...this.newProduct, id: newId };
        this.products.push(newProduct);
        this.newProduct = { name: '', price: '', description: '', image: '' };
        this.addItemDialog = false;
      }
    },
    editProduct(product) {
      this.selectedProduct = { ...product };
      this.editItemDialog = true;
    },
    updateProduct() {
      if (this.$refs.form.validate()) {
        const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
        if (index !== -1) {
          this.products.splice(index, 1, { ...this.selectedProduct });
        }
        this.editItemDialog = false;
      }
    },
    confirmDelete(productId) {
      this.productToDelete = productId;
      this.confirmDeleteDialog = true;
    },
    deleteProduct() {
      if (this.productToDelete) {
        this.products = this.products.filter(product => product.id !== this.productToDelete);
        this.confirmDeleteDialog = false;
        this.productToDelete = null;
      }
    },
  },
};
</script>

<style scoped>
.mobile-search-row {
  background-color: #354C43;
  position: absolute;
  top: 64px; 
  width: 100%;
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
