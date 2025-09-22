import { i as init_1, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './assets/k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';
import exposesMap from './assets/virtualExposes-BWScbeEb.js';
import { _ as __vitePreload } from './assets/preload-helper-B5tfdMne.js';

const importMap = {
      
        "three": async () => {
          let pkg = await __vitePreload(() => import('./assets/three.module-wdyv8Ec4.js'),true?[]:undefined);
          return pkg
        }
      
    };
      const usedShared = {
      
          "three": {
            name: "three",
            version: "0.177.0",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["three"].loaded = true;
              const {"three": pkgDynamicImport} = importMap; 
              const res = await pkgDynamicImport();
              const exportModule = {...res};
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              });
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^0.177.0"
            }
          }
        
    };
      const usedRemotes = [
      ];

const initTokens = {};
  const shareScopeName = "default";
  const mfName = "k3-ring";
  async function init(shared = {}, initScope = []) {
    const initRes = init_1({
      name: mfName,
      remotes: usedRemotes,
      shared: usedShared,
      plugins: [],
      shareStrategy: 'version-first'
    });
    // handling circular init calls
    var initToken = initTokens[shareScopeName];
    if (!initToken)
      initToken = initTokens[shareScopeName] = { from: mfName };
    if (initScope.indexOf(initToken) >= 0) return;
    initScope.push(initToken);
    initRes.initShareScopeMap('default', shared);
    try {
      await Promise.all(await initRes.initializeSharing('default', {
        strategy: 'version-first',
        from: "build",
        initScope
      }));
    } catch (e) {
      console.error(e);
    }
    k3_mf_2_ring__mf_v__runtimeInit__mf_v__.initResolve(initRes);
    return initRes
  }

  function getExposes(moduleName) {
    if (!(moduleName in exposesMap)) throw new Error(`Module ${moduleName} does not exist in container.`)
    return (exposesMap[moduleName])().then(res => () => res)
  }

export { getExposes as get, init };
