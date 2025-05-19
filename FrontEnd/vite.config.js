// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             if (id.includes('react')) return 'react';
//             if (id.includes('axios')) return 'axios';
//             if (id.includes('lodash')) return 'lodash';
//             return 'vendor';
//           }
//         },
//       },
//     },
//     chunkSizeWarningLimit: 900, // Optional: raise warning limit (default is 500)
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})