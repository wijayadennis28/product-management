<template>
  <v-container fluid class="home-container">
    <v-row justify="center" class="category-row">
      <!-- Vol. 1 -->
      <v-col cols="12" md="6" class="category-card">
        <div class="category-item" @click="goToMarketplace">
          <v-img
            src="@/assets/images/vol1.jpg"
            class="category-image"
            height="800px" 
          ></v-img>
          <div class="category-label">
            <h2>Vol. 1</h2>
          </div>
        </div>
      </v-col>

      <!-- Vol. 2 -->
      <v-col cols="12" md="6" class="category-card">
        <div class="category-item" @click="goToMarketplace">
          <v-img
            src="@/assets/images/vol2.jpg"
            class="category-image"
            height="800px" 
          ></v-img>
          <div class="category-label vol-2-label">
            <h2>Vol. 2</h2>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToMarketplace() {
      this.$router.push('/marketplace');
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* No scrolling */
}

#app {
  overflow: hidden;
}

.home-container {
  padding-top: 64px; /* Space for the navigation bar */
}

.category-row {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Add space between the two columns */
}

.category-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 800px; /* Fixed height for items */
}

.category-image {
  transition: transform 0.3s ease-in-out;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.category-item:hover .category-image {
  transform: scale(1.05);
}

.category-label {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.category-label h2 {
  font-size: 48px;
  font-weight: bold;
  color: black;
  transition: color 0.3s ease-in-out;
}

.category-item:hover .category-label h2 {
  color: #aaa393;
}
</style>
