import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { VitePWA as vitePWAPlugin } from 'vite-plugin-pwa';
import svgrPlugin from 'vite-plugin-svgr';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_PROXY_SERVER_URL,
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build',
    },
    plugins: [
      reactPlugin(),
      vitePWAPlugin({
        registerType: 'autoUpdate',
        workbox: {
          navigateFallbackDenylist: [new RegExp(`^${VITE_APP_API_ORIGIN_URL}`)],
        },
      }),
      svgrPlugin(),
    ],
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      proxy: {
        [VITE_APP_API_ORIGIN_URL]: {
          target: VITE_APP_PROXY_SERVER_URL,
          changeOrigin: true,
        },
      },
    },
  });
};

export default config;
