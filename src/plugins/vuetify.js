import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css'; // FontAwesome CSS

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa', // Use FontAwesome icons
  },
});
