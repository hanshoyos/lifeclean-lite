import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lifeclean-lite/', // 👈 This is the fix
  plugins: [react()],
});
