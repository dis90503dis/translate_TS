// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/T14%20Gen%203/Desktop/healthy-food/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/T14%20Gen%203/Desktop/healthy-food/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/T14%20Gen%203/Desktop/healthy-food/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chd104/g3/front/" : "/",
  build: {
    outDir: "front"
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @import "./src/assets/scss/main.scss";
                `
      }
    }
  }
  // server:{
  //   host:'10.1.18.184'
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRGVza3RvcFxcXFxoZWFsdGh5LWZvb2RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFQxNCBHZW4gM1xcXFxEZXNrdG9wXFxcXGhlYWx0aHktZm9vZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVDE0JTIwR2VuJTIwMy9EZXNrdG9wL2hlYWx0aHktZm9vZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICAgID8gJy9jaGQxMDQvZzMvZnJvbnQvJ1xyXG4gICAgOiAnLycsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Zyb250J1xyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuXHJcbiAgICB9XHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXHJcbiAgICAgICAgICAgICAgICAgICAgQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zY3NzL21haW4uc2Nzc1wiO1xyXG4gICAgICAgICAgICAgICAgYCxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIHNlcnZlcjp7XHJcbiAgLy8gICBob3N0OicxMC4xLjE4LjE4NCdcclxuICAvLyB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVCxTQUFTLGVBQWUsV0FBVztBQUV4VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIK0ssSUFBTSwyQ0FBMkM7QUFNaFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUMzQixzQkFDQTtBQUFBLEVBQ0osT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBRXREO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFJRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
