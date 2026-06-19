
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "@react-three/drei": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_react_mf_2_three_mf_1_drei__prebuild__.js")
          return pkg
        }
      ,
        "@react-three/fiber": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_react_mf_2_three_mf_1_fiber__prebuild__.js")
          return pkg
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__react__prebuild__.js")
          return pkg
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__react_mf_2_dom__prebuild__.js")
          return pkg
        }
      ,
        "three": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__three__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "@react-three/drei": {
            name: "@react-three/drei",
            version: "10.5.1",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["@react-three/drei"].loaded = true
              const {"@react-three/drei": pkgDynamicImport} = importMap 
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
              singleton: true,
              requiredVersion: "^10.1.2"
            }
          }
        ,
          "@react-three/fiber": {
            name: "@react-three/fiber",
            version: "9.2.0",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["@react-three/fiber"].loaded = true
              const {"@react-three/fiber": pkgDynamicImport} = importMap 
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
              singleton: true,
              requiredVersion: "^9.1.2"
            }
          }
        ,
          "react": {
            name: "react",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap 
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
              singleton: true,
              requiredVersion: "19.1.1"
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "19.1.1",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap 
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
              singleton: true,
              requiredVersion: "19.1.1"
            }
          }
        ,
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
              singleton: true,
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
      