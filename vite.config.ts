import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 关键配置：映射到 src 目录
      // '~': path.resolve(__dirname, './src'),
      // 或者用 @ 符号
      '@': path.resolve(__dirname, './src'),
    },
  },
})