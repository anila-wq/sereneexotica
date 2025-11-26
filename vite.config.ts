
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'react-hook-form@7.55.0': 'react-hook-form',
        'figma:asset/fe5a93e203aa683ae79a832416c0646eda144a00.png': path.resolve(__dirname, './src/assets/fe5a93e203aa683ae79a832416c0646eda144a00.png'),
        'figma:asset/eae075123418c2f6b24913ac633abc96778773bf.png': path.resolve(__dirname, './src/assets/eae075123418c2f6b24913ac633abc96778773bf.png'),
        'figma:asset/d7788d35b331724c9e1f531250267ac1472498e4.png': path.resolve(__dirname, './src/assets/d7788d35b331724c9e1f531250267ac1472498e4.png'),
        'figma:asset/d726ef5382533eec5ec0b0fb5d032a4a48add6a1.png': path.resolve(__dirname, './src/assets/d726ef5382533eec5ec0b0fb5d032a4a48add6a1.png'),
        'figma:asset/d683c1596a92dd1246855623fa6094159c0f42ca.png': path.resolve(__dirname, './src/assets/d683c1596a92dd1246855623fa6094159c0f42ca.png'),
        'figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png': path.resolve(__dirname, './src/assets/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png'),
        'figma:asset/c448b27b0a7e484978529def6d6f246f89740e41.png': path.resolve(__dirname, './src/assets/c448b27b0a7e484978529def6d6f246f89740e41.png'),
        'figma:asset/bf1f0cb769d6e9f362c867512752cffc588e2af8.png': path.resolve(__dirname, './src/assets/bf1f0cb769d6e9f362c867512752cffc588e2af8.png'),
        'figma:asset/bde6211a5a025c4912b2e13b6b6ac5d256dda9a4.png': path.resolve(__dirname, './src/assets/bde6211a5a025c4912b2e13b6b6ac5d256dda9a4.png'),
        'figma:asset/b345935fdb12c32a05716925bf0bc5258e86addd.png': path.resolve(__dirname, './src/assets/b345935fdb12c32a05716925bf0bc5258e86addd.png'),
        'figma:asset/aefd01755bcc94eb5e730f0e50889481a27bd42a.png': path.resolve(__dirname, './src/assets/aefd01755bcc94eb5e730f0e50889481a27bd42a.png'),
        'figma:asset/a5226a073fbf4a7dc7ab709262e39926a2fe2742.png': path.resolve(__dirname, './src/assets/a5226a073fbf4a7dc7ab709262e39926a2fe2742.png'),
        'figma:asset/96abbf551544da9b07d7cfad1093c6e25a450cac.png': path.resolve(__dirname, './src/assets/96abbf551544da9b07d7cfad1093c6e25a450cac.png'),
        'figma:asset/7bf553adee2ade1463374c3dae514556211be97d.png': path.resolve(__dirname, './src/assets/7bf553adee2ade1463374c3dae514556211be97d.png'),
        'figma:asset/767ad0369df8c45bb22ee76738d72d838e9a1ebc.png': path.resolve(__dirname, './src/assets/767ad0369df8c45bb22ee76738d72d838e9a1ebc.png'),
        'figma:asset/6c641de1bda39e1e2c9fc822ceba4ce8ddfb4ae1.png': path.resolve(__dirname, './src/assets/6c641de1bda39e1e2c9fc822ceba4ce8ddfb4ae1.png'),
        'figma:asset/6673a3afe1782cfafcc5eca35b4e5d72ca47d9eb.png': path.resolve(__dirname, './src/assets/6673a3afe1782cfafcc5eca35b4e5d72ca47d9eb.png'),
        'figma:asset/60c2606964035b83c3c9065a1a28e897d408353e.png': path.resolve(__dirname, './src/assets/60c2606964035b83c3c9065a1a28e897d408353e.png'),
        'figma:asset/5e215f73d8c86a180c868639e0588a44769c3f33.png': path.resolve(__dirname, './src/assets/5e215f73d8c86a180c868639e0588a44769c3f33.png'),
        'figma:asset/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png': path.resolve(__dirname, './src/assets/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png'),
        'figma:asset/491d2f06bbb98eadad1edf6a512b5777c9350945.png': path.resolve(__dirname, './src/assets/491d2f06bbb98eadad1edf6a512b5777c9350945.png'),
        'figma:asset/409037d364f014a1beaac42c0c22377f79224d4a.png': path.resolve(__dirname, './src/assets/409037d364f014a1beaac42c0c22377f79224d4a.png'),
        'figma:asset/3ab542868c810632f73afa78a4b94c5707a0ef4b.png': path.resolve(__dirname, './src/assets/3ab542868c810632f73afa78a4b94c5707a0ef4b.png'),
        'figma:asset/2f5a5f1bd9202e90357f53636c8004782754b141.png': path.resolve(__dirname, './src/assets/2f5a5f1bd9202e90357f53636c8004782754b141.png'),
        'figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png': path.resolve(__dirname, './src/assets/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png'),
        'figma:asset/2a038649db4a73a9b25f7b80ed4b59752d8bcd9d.png': path.resolve(__dirname, './src/assets/2a038649db4a73a9b25f7b80ed4b59752d8bcd9d.png'),
        'figma:asset/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png': path.resolve(__dirname, './src/assets/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png'),
        'figma:asset/0b042088bc4dfb7b2a86c50b13f785bda2f8e0c9.png': path.resolve(__dirname, './src/assets/0b042088bc4dfb7b2a86c50b13f785bda2f8e0c9.png'),
        'figma:asset/037d9f0f5c499a4f67800e54d42adc96ecc06e06.png': path.resolve(__dirname, './src/assets/037d9f0f5c499a4f67800e54d42adc96ecc06e06.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });