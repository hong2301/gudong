import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia'
import piniapluginPersistedstate from 'pinia-plugin-persistedstate'
import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const pinia = createPinia();
  pinia.use(piniapluginPersistedstate);
  const app = createSSRApp(App);
  app.use(uviewPlus)
  app.use(pinia)
  return {
    app,
  };
}
