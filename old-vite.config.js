import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    // Generates types only for your library source folder
    dts({ 
      include: ['lib/**/*.ts'],
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Multiple entry points: One for the web app, others for the library formats
      input: {
        // 1. The Web Application (looks for index.html at root)
        app: resolve(__dirname, 'index.html'),
        // 2. The Library (ESM format entry)
        lib: resolve(__dirname, 'lib/index.ts'),
      },
      output: {
        // Control how filenames are generated to keep dist/ organized
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'lib') return 'lib/index.js';
          return 'assets/[name]-[hash].js'; // Standard hashing for web app code
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Optional: If you also need a CommonJS build for the library target
        // you can configure an additional rollup output array block.
      }
    }
  }
});
