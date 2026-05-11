import { a as __vitePreload } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.mjs-f1z_Gfkw.js';









const cssAssetMap = {};
    const injectedCssHrefs = new Set();
    let exposeLoadQueue = Promise.resolve();

    async function importExposedModule(loader) {
      const currentLoad = exposeLoadQueue.then(loader, loader);
      exposeLoadQueue = currentLoad.then(
        () => undefined,
        () => undefined
      );
      return currentLoad;
    }

    async function injectCssAssets(exposeKey) {
      if (typeof document === "undefined") {
        return;
      }

      // Replaced at build time with expose -> css asset paths.
      const cssAssets = cssAssetMap[exposeKey] || [];

      await Promise.all(
        cssAssets.map((cssAsset) => {
          const href = new URL(cssAsset, import.meta.url).href;

          // Same expose can be resolved multiple times in one page.
          if (injectedCssHrefs.has(href)) {
            return Promise.resolve();
          }
          injectedCssHrefs.add(href);

          const existingLink = document.querySelector(
            `link[rel="stylesheet"][data-mf-href="${href}"]`
          );
          if (existingLink) {
            return Promise.resolve();
          }

          return new Promise((resolve, reject) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.setAttribute("data-mf-href", href);
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`[Module Federation] Failed to load CSS asset: ${href}`));
            document.head.appendChild(link);
          });
        })
      );
    }

    const virtual_mfExposes___mfe_internal__k3Ring__remoteEntry_js = {
    
        "./Plugin": async () => {
          await injectCssAssets("./Plugin");
          const importModule = await importExposedModule(
            () => __vitePreload(() => import('./Plugin-BFpcMWpL.js'),true              ?[]:void 0)
          );
          const exportModule = {};
          Object.assign(exportModule, importModule);
          Object.defineProperty(exportModule, "__esModule", {
            value: true,
            enumerable: false
          });
          return exportModule
        }
      
  };

export { virtual_mfExposes___mfe_internal__k3Ring__remoteEntry_js as default };
