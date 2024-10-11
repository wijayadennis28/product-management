<template>
  <v-app>
    <!-- Your navigation bar here -->
    <v-app-bar app dark color="#354C43">
      <v-toolbar-title>
        <img src="@/assets/obiru-logo.png" alt="Logo" @click="$router.push('/')" style="height: 50px;">
      </v-toolbar-title>
    </v-app-bar>

    <!-- This is where the router will inject the correct component -->
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
