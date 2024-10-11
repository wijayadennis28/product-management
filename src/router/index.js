import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/HomePage.vue';
import MarketplacePage from '@/views/MarketplacePage.vue';
import MarketplacePage2 from '@/views/MarketplacePage2.vue'; // Ensure this import is correct
import AddItem from '@/views/AddItem.vue'; // Ensure this import is correct

Vue.use(Router);

export default new Router({
  mode: 'history', // Ensures clean URLs
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/marketplace',
      name: 'Marketplace',
      component: MarketplacePage,
    },
    {
      path: '/marketplace2', // Adding the route for MarketplacePage2
      name: 'Marketplace2',
      component: MarketplacePage2,
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem,
    },
  ],
});
