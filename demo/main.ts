import { ActivityIndicatorPlugin, Spinner } from '@vue-interface/activity-indicator';
import { createApp, h } from 'vue';
import App from './App.vue';

createApp(() => h(App)).use(ActivityIndicatorPlugin, {
    indicators: {
        Spinner
    }
}).mount('#app');