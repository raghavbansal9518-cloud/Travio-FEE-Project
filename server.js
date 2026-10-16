import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleApiProxy } from './server/apiProxy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load .env into process.env without external dependencies
function loadEnvLocal() {
  const envPath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            const val = match[2].trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
    } catch (e) {
      // ignore
    }
  }
}

loadEnvLocal();

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  const handled = await handleApiProxy(req, res, process.env);
  if (!handled) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[Travio Secure Proxy] Running at http://localhost:${PORT}`);
  console.log(`[Travio Secure Proxy] Gemini Configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
  console.log(`[Travio Secure Proxy] Google Places Configured: ${Boolean(process.env.GOOGLE_PLACES_API_KEY)}`);
});
