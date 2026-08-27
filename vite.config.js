import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appConfig = {
    build: {
        outDir: 'docs', // Outputs the web application here
        emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
        },
    },
}

const libConfig = {
    plugins: [
        dts({
            include: ['lib/**/*.ts'],
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    build: {
        outDir: 'dist', // Outputs the library binaries here
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            name: 'n2js-frameword',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
        },
    },
}

export default defineConfig(({ command }) => {
    const isLibBuild = process.env.BUILD_TARGET === 'lib';
    if (command === 'build' && isLibBuild) {
        return libConfig;
    }

    return appConfig;
});
