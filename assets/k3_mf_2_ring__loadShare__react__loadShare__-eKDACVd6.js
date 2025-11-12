import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';
import { a as index_cjs, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';

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

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("react", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "19.1.1"
    }}}));
    const exportModule = await res.then(factory => factory());
    var k3_mf_2_ring__loadShare__react__loadShare__ = exportModule;

const React = /*@__PURE__*/getDefaultExportFromCjs(k3_mf_2_ring__loadShare__react__loadShare__);

const React$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: React
}, [k3_mf_2_ring__loadShare__react__loadShare__]);

export { React$1 as R, React as a, k3_mf_2_ring__loadShare__react__loadShare__ as k };
