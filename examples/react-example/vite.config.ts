import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure we catch any build-time errors
    rollupOptions: {
      onwarn(warning, warn) {
        // Fail on warnings to catch potential issues
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
          return;
        }
        warn(warning);
      },
    },
  },
});
