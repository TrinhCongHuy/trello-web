import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  esbuild: {
    loader: 'jsx',  // Thêm cấu hình này để Vite xử lý JSX trong các file .jsx
    include: [
      'src/**/*.js',
      'src/**/*.jsx'
    ]
  }
})
