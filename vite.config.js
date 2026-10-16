import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiProxy } from './server/apiProxy.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load private environment variables from .env strictly on the local Node server
  const env = loadEnv(mode, process.cwd(), '');

  const travioLocalProxy = () => ({
    name: 'travio-local-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const handled = await handleApiProxy(req, res, env);
          if (handled) return;
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const handled = await handleApiProxy(req, res, env);
          if (handled) return;
        }
        next();
      });
    }
  });

  return {
    plugins: [react(), travioLocalProxy()],
    server: {
      port: 5173,
      host: true
    }
  };
});
