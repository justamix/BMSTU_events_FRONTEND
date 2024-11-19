import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: "FRONTEND",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://192.168.56.1:8000"
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})