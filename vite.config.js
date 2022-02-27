import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { name } from './package.json';
import { pascalCase } from "change-case";
import { babel } from '@rollup/plugin-babel';

const filename = name.split('/')[1];

export default defineConfig({
    optimizeDeps: {
        exclude: [
            '@vue-interface/activity-indicator',
            '@vue-interface/form-control'
        ]
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: pascalCase(filename),
            fileName: (format) => `${filename}.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
            },
            plugins: [
                babel({
                    babelHelpers: 'bundled'
                })
            ]
        },
        watch: !process.env.NODE_ENV && {
            include: [
                './tailwindcss.js',
                './tailwindcss/**/*.js'
            ]
        }
    },
    plugins: [
        createVuePlugin()
    ],
});
