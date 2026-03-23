import { g as getDefaultExportFromCjs } from './_commonjsHelpers-B85MJLTf.js';
import { a as index_cjs, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@emotion/cache", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^11.14.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_cache__loadShare__ = exportModule;

const createCache = /*@__PURE__*/getDefaultExportFromCjs(k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_cache__loadShare__);

export { createCache as c };
