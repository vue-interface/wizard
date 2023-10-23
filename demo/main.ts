import { ActivityIndicatorPlugin, Spinner } from '@vue-interface/activity-indicator';
import { createApp } from 'vue';
// import '@vue-interface/activity-indicator/dist/style.css';
// import '@vue-interface/btn/dist/style.css';
import '@vue-interface/btn-activity/dist/style.css';
import '@vue-interface/slide-deck/dist/style.css';
import '../index.css';
import App from './App.vue';

createApp(App)
    .use(ActivityIndicatorPlugin, {
        indicators: {
            Spinner
        }
    }).mount('#app');