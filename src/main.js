import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as Sentry from "@sentry/vue";
/**
 * Custom Libraries
 */
import VueGtag from 'vue-gtag'
import i18n from './i18n'

const app = createApp(App)

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// console.log(import.meta.env)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(
  VueGtag,
  {
    appName: 'JRuedaDev WebApp',
    pageTrackerScreenviewEnabled: true,
    config: { id: import.meta.env.VITE_GTAG_ID }
  },
  router
)

app.mount('#app')
