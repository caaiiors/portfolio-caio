import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function downloadRoute(server) {
  server.middlewares.use((req, _res, next) => {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/download' || url.pathname === '/download/') {
      req.url = `/download.html${url.search}`;
    }
    next();
  });
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'download-route',
      configureServer: downloadRoute,
      configurePreviewServer: downloadRoute,
    },
  ],
});
