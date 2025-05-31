import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nmixx_rhythm_game/',  // GitHub 저장소 이름으로 설정
})
