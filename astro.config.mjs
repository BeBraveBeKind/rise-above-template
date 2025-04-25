import { defineConfig } from 'astro/config';
const staticAdapter = () => ({
  name: 'mock-adapter',
  adapt() {
    console.warn('Static adapter not found. Using mock adapter for local dev.');
  }
});
export default defineConfig({ adapter: staticAdapter() });
