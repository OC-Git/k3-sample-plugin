import { a as index_cjs, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@emotion/react", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^11.10.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_react__loadShare__ = exportModule;

export { k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_react__loadShare__ as k };
