import { a as __vitePreload } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.mjs-f1z_Gfkw.js';









const __mfCacheGlobalKey = "__mf_module_cache__";
globalThis[__mfCacheGlobalKey] ||= { share: {}, remote: {} };
globalThis[__mfCacheGlobalKey].share ||= {};
globalThis[__mfCacheGlobalKey].remote ||= {};
const __mfModuleCache = globalThis[__mfCacheGlobalKey];

    let hostInitPromise;
    async function initHost() {
      if (!hostInitPromise) {
        hostInitPromise = (async () => {
          
          const remoteEntry = await __vitePreload(() => import('../remoteEntry.js'),true              ?[]:void 0);
          const runtime = await remoteEntry.init();
          const usedShared = {
      "react": {
            shareConfig: {
              singleton: true,
              requiredVersion: "19.1.1",
              
            }
          },
"react-dom": {
            shareConfig: {
              singleton: true,
              requiredVersion: "19.1.1",
              
            }
          },
"@emotion/cache": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.14.0",
              
            }
          },
"@emotion/react": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.10.0",
              
            }
          },
"@emotion/styled": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^11.10.5",
              
            }
          },
"@mui/material": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.1.1",
              
            }
          },
"@mui/styled-engine": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^7.1.1",
              
            }
          },
"@react-three/drei": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^10.1.2",
              
            }
          },
"@react-three/fiber": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^9.1.2",
              
            }
          },
"three": {
            shareConfig: {
              singleton: true,
              requiredVersion: "^0.177.0",
              
            }
          }
    };
          const __mfNormalizeRuntimeShare = (mod) => {
            let current = mod;
            for (let i = 0; i < 5; i++) {
              const defaultExport = current?.default;
              if (!defaultExport || typeof defaultExport !== "object") break;
              const namedValues = Object.keys(current).filter((key) => key !== "default").map((key) => current[key]);
              if (namedValues.length > 0 && namedValues.some((value) => value !== undefined)) break;
              current = defaultExport;
            }
            return current;
          };
          for (const [pkg, share] of Object.entries(usedShared)) {
            if (__mfModuleCache.share[pkg] !== undefined) {
              continue;
            }
            await runtime.loadShare(pkg, {
              customShareInfo: { shareConfig: share.shareConfig }
            }).then((factory) => {
              const mod = typeof factory === "function" ? factory() : factory;
              return Promise.resolve(mod).then((resolved) => {
                __mfModuleCache.share[pkg] = __mfNormalizeRuntimeShare(resolved);
              });
            });
          }
          const __mfRemotePreloads = [];
          await Promise.all(__mfRemotePreloads);
          return runtime;
        })();
      }
      return hostInitPromise;
    }
    hostInitPromise = initHost();

export { hostInitPromise, initHost };
