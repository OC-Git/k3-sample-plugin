
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "three": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__three__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "three": {
            name: "three",
            version: "0.177.0",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["three"].loaded = true
              const {"three": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: false,
              requiredVersion: "^0.177.0"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      