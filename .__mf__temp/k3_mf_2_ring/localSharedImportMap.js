
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "@emotion/cache": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_emotion_mf_1_cache__prebuild__.js");
            return pkg;
        }
      ,
        "@emotion/react": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_emotion_mf_1_react__prebuild__.js");
            return pkg;
        }
      ,
        "@emotion/styled": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_emotion_mf_1_styled__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/material": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_mui_mf_1_material__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/styled-engine": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_mui_mf_1_styled_mf_2_engine__prebuild__.js");
            return pkg;
        }
      ,
        "@react-three/drei": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_react_mf_2_three_mf_1_drei__prebuild__.js");
            return pkg;
        }
      ,
        "@react-three/fiber": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild___mf_0_react_mf_2_three_mf_1_fiber__prebuild__.js");
            return pkg;
        }
      ,
        "k3-plugin-api": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__k3_mf_2_plugin_mf_2_api__prebuild__.js");
            return pkg;
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "three": async () => {
          let pkg = await import("__mf__virtual/k3_mf_2_ring__prebuild__three__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "@emotion/cache": {
            name: "@emotion/cache",
            version: "11.14.0",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@emotion/cache"}' must be provided by host`);
              }
              usedShared["@emotion/cache"].loaded = true
              const {"@emotion/cache": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@emotion/cache" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^11.14.0",
              
            }
          }
        ,
          "@emotion/react": {
            name: "@emotion/react",
            version: "11.10.0",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@emotion/react"}' must be provided by host`);
              }
              usedShared["@emotion/react"].loaded = true
              const {"@emotion/react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@emotion/react" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^11.10.0",
              
            }
          }
        ,
          "@emotion/styled": {
            name: "@emotion/styled",
            version: "11.10.5",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@emotion/styled"}' must be provided by host`);
              }
              usedShared["@emotion/styled"].loaded = true
              const {"@emotion/styled": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@emotion/styled" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^11.10.5",
              
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "7.1.1",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/material"}' must be provided by host`);
              }
              usedShared["@mui/material"].loaded = true
              const {"@mui/material": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/material" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^7.1.1",
              
            }
          }
        ,
          "@mui/styled-engine": {
            name: "@mui/styled-engine",
            version: "7.1.1",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/styled-engine"}' must be provided by host`);
              }
              usedShared["@mui/styled-engine"].loaded = true
              const {"@mui/styled-engine": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/styled-engine" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^7.1.1",
              
            }
          }
        ,
          "@react-three/drei": {
            name: "@react-three/drei",
            version: "10.1.2",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@react-three/drei"}' must be provided by host`);
              }
              usedShared["@react-three/drei"].loaded = true
              const {"@react-three/drei": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@react-three/drei" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^10.1.2",
              
            }
          }
        ,
          "@react-three/fiber": {
            name: "@react-three/fiber",
            version: "9.1.2",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@react-three/fiber"}' must be provided by host`);
              }
              usedShared["@react-three/fiber"].loaded = true
              const {"@react-three/fiber": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@react-three/fiber" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^9.1.2",
              
            }
          }
        ,
          "k3-plugin-api": {
            name: "k3-plugin-api",
            version: "1.4.5",
            scope: ["default"],
            loaded: false,
            from: "k3-ring",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"k3-plugin-api"}' must be provided by host`);
              }
              usedShared["k3-plugin-api"].loaded = true
              const {"k3-plugin-api": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "k3-plugin-api" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^1.4.5",
              
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
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "19.1.1",
              
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
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "19.1.1",
              
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
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"three"}' must be provided by host`);
              }
              usedShared["three"].loaded = true
              const {"three": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "three" === "react"
                ? (res?.default ?? res)
                : {...res}
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
              requiredVersion: "^0.177.0",
              
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      