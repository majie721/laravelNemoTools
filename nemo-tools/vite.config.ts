import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  server: {
    host:'0.0.0.0',
    port:3000,
    open:true,
    proxy: {
      // string shorthand
     // '/nemo': 'http://laravel9.com/nemo',
      // with options
      '/nemo': {
        target: 'http://demo.com/',
        changeOrigin: true
       // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve:{
    alias:[
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  },
})
