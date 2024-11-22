import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: "/",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://192.168.1.22:8000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})