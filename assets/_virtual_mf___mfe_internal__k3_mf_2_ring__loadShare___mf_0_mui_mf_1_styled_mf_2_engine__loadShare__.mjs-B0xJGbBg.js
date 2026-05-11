import { e as emStyled } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_styled__loadShare__.mjs-CTKGR522.js';
import { d as __mf_1$3, e as __mf_9, b as __mf_2$2, f as __mf_11, s as serializeStyles, h as __mf_12 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-DfArSKTg.js';
import { g as __mf_31 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react__loadShare__.mjs-Cg0rfq73.js';
import { _ as __mf_1$2 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.mjs-fXKQsZNi.js';
import { c as createCache, S as StyleSheet } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_cache__loadShare__.mjs-D_qBeFsO.js';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

const cacheMap = /* @__PURE__ */ new Map();
const createEmotionCache = (options, CustomSheet) => {
  const cache = createCache(options);
  cache.sheet = new CustomSheet({
    key: cache.key,
    nonce: cache.sheet.nonce,
    container: cache.sheet.container,
    speedy: cache.sheet.isSpeedy,
    prepend: cache.sheet.prepend,
    insertionPoint: cache.sheet.insertionPoint
  });
  return cache;
};
let insertionPoint;
if (typeof document === "object") {
  insertionPoint = document.querySelector('[name="emotion-insertion-point"]');
  if (!insertionPoint) {
    insertionPoint = document.createElement("meta");
    insertionPoint.setAttribute("name", "emotion-insertion-point");
    insertionPoint.setAttribute("content", "");
    const head = document.querySelector("head");
    if (head) {
      head.prepend(insertionPoint);
    }
  }
}
function getCache(injectFirst, enableCssLayer) {
  if (injectFirst || enableCssLayer) {
    class MyStyleSheet extends StyleSheet {
      insert(rule, options) {
        if (this.key && this.key.endsWith("global")) {
          this.before = insertionPoint;
        }
        return super.insert(rule, options);
      }
    }
    const emotionCache = createEmotionCache({
      key: "css",
      insertionPoint: injectFirst ? insertionPoint : void 0
    }, MyStyleSheet);
    if (enableCssLayer) {
      const prevInsert = emotionCache.insert;
      emotionCache.insert = (...args) => {
        if (!args[1].styles.startsWith("@layer")) {
          args[1].styles = `@layer mui {${args[1].styles}}`;
        }
        return prevInsert(...args);
      };
    }
    return emotionCache;
  }
  return void 0;
}
function StyledEngineProvider(props) {
  const {
    injectFirst,
    enableCssLayer,
    children
  } = props;
  const cache = __mf_31(() => {
    const cacheKey = `${injectFirst}-${enableCssLayer}`;
    if (cacheMap.has(cacheKey)) {
      return cacheMap.get(cacheKey);
    }
    const fresh = getCache(injectFirst, enableCssLayer);
    cacheMap.set(cacheKey, fresh);
    return fresh;
  }, [injectFirst, enableCssLayer]);
  return cache ? /* @__PURE__ */ __mf_1$2(__mf_1$3, {
    value: cache,
    children
  }) : children;
}

function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles,
    defaultTheme = {}
  } = props;
  const globalStyles = typeof styles === "function" ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme : themeInput) : styles;
  return /* @__PURE__ */ __mf_1$2(__mf_9, {
    styles: globalStyles
  });
}

function styled(tag, options) {
  const stylesFactory = emStyled(tag, options);
  return stylesFactory;
}
function internal_mutateStyles(tag, processor) {
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
}
const wrapper = [];
function internal_serializeStyles(styles) {
  wrapper[0] = styles;
  return serializeStyles(wrapper);
}

const __mfPrebuildNamespace = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GlobalStyles,
  StyledEngineProvider,
  ThemeContext: __mf_2$2,
  css: __mf_11,
  default: styled,
  internal_mutateStyles,
  internal_serializeStyles,
  keyframes: __mf_12
}, Symbol.toStringTag, { value: 'Module' }));

const __mfPrebuildExports = __mfPrebuildNamespace;
    const __mf_0$1 = __mfPrebuildExports["GlobalStyles"];
    const __mf_1$1 = __mfPrebuildExports["StyledEngineProvider"];
    const __mf_2$1 = __mfPrebuildExports["ThemeContext"];
    const __mf_3$1 = __mfPrebuildExports["css"];
    const __mf_4$1 = __mfPrebuildExports["internal_mutateStyles"];
    const __mf_5$1 = __mfPrebuildExports["internal_serializeStyles"];
    const __mf_6$1 = __mfPrebuildExports["keyframes"];

const __mfLocalShare = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GlobalStyles: __mf_0$1,
  StyledEngineProvider: __mf_1$1,
  ThemeContext: __mf_2$1,
  css: __mf_3$1,
  default: __mfPrebuildExports,
  internal_mutateStyles: __mf_4$1,
  internal_serializeStyles: __mf_5$1,
  keyframes: __mf_6$1
}, Symbol.toStringTag, { value: 'Module' }));

const __mfCacheGlobalKey = "__mf_module_cache__";
globalThis[__mfCacheGlobalKey] ||= { share: {}, remote: {} };
globalThis[__mfCacheGlobalKey].share ||= {};
globalThis[__mfCacheGlobalKey].remote ||= {};
const __mfModuleCache = globalThis[__mfCacheGlobalKey];

    const __mfNormalizeShareModule = (mod) => {
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
    let exportModule = __mfModuleCache.share["@mui/styled-engine"];
    if (exportModule === undefined) {
      exportModule = __mfNormalizeShareModule(__mfLocalShare);
      __mfModuleCache.share["@mui/styled-engine"] = exportModule;
    }
    const __mfDefaultExport = (() => {
      let current = exportModule;
      for (let i = 0; i < 5; i++) {
        const defaultExport = current?.default;
        if (!defaultExport || typeof defaultExport !== "object") return defaultExport ?? current;
        current = defaultExport;
      }
      return current;
    })();
    const { GlobalStyles: __mf_0, StyledEngineProvider: __mf_1, ThemeContext: __mf_2, css: __mf_3, internal_mutateStyles: __mf_4, internal_serializeStyles: __mf_5, keyframes: __mf_6 } = exportModule;
  
const __moduleExports = exportModule;

const _virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_mui_mf_1_styled_mf_2_engine__loadShare__ = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  GlobalStyles: __mf_0,
  StyledEngineProvider: __mf_1,
  ThemeContext: __mf_2,
  css: __mf_3,
  default: __mfDefaultExport,
  internal_mutateStyles: __mf_4,
  internal_serializeStyles: __mf_5,
  keyframes: __mf_6
}, [__moduleExports]);

export { _virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_mui_mf_1_styled_mf_2_engine__loadShare__ as _, __mf_2 as a, __mf_0 as b, __mf_5 as c, __mfDefaultExport as d, __mf_4 as e, __mf_6 as f, __mf_3 as g, __mf_1 as h, __mfLocalShare as i };
