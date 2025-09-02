import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Apply_auto',
  version: '1.0.0',
  description: 'Chrome extension built with React, Vite, Tailwind v4, and crxjs',
  action: {
    default_popup: 'index.html',
  },
  background: {
    service_worker: 'src/background.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content.ts'],
      
    },
  ],
  permissions: ['storage', 'tabs', 'scripting'],
})
