import { importShared } from '../__federation_fn_import-gP0yUJUV.js';
import { s as suspend, p as preload, c as clear } from '../index-CfUZxAxk.js';
import { j as jsxRuntimeExports } from '../jsx-runtime-CvJTHeKY.js';
import { g as getDefaultExportFromCjs } from '../_commonjsHelpers-B85MJLTf.js';
import { r as requireReact } from '../index-DQGM2Mpm.js';

var constants = {exports: {}};

var reactReconcilerConstants_production_min = {};

/**
 * @license React
 * react-reconciler-constants.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactReconcilerConstants_production_min;

function requireReactReconcilerConstants_production_min () {
	if (hasRequiredReactReconcilerConstants_production_min) return reactReconcilerConstants_production_min;
	hasRequiredReactReconcilerConstants_production_min = 1;
reactReconcilerConstants_production_min.ConcurrentRoot=1;reactReconcilerConstants_production_min.ContinuousEventPriority=4;reactReconcilerConstants_production_min.DefaultEventPriority=16;reactReconcilerConstants_production_min.DiscreteEventPriority=1;reactReconcilerConstants_production_min.IdleEventPriority=536870912;reactReconcilerConstants_production_min.LegacyRoot=0;
	return reactReconcilerConstants_production_min;
}

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants.exports;
	hasRequiredConstants = 1;
	{
	  constants.exports = requireReactReconcilerConstants_production_min();
	}
	return constants.exports;
}

var constantsExports = requireConstants();

const {useReducer,useRef,useDebugValue,useEffect,useLayoutEffect} = await importShared('react');


function createStore$1(createState) {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
    console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
    let currentSlice = selector(state);
    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener(currentSlice = nextSlice, previousSlice);
      }
    }
    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };
  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}

const isSSR = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
const useIsomorphicLayoutEffect$1 = isSSR ? useEffect : useLayoutEffect;
function create(createState) {
  const api = typeof createState === "function" ? createStore$1(createState) : createState;
  const useStore = (selector = api.getState, equalityFn = Object.is) => {
    const [, forceUpdate] = useReducer((c) => c + 1, 0);
    const state = api.getState();
    const stateRef = useRef(state);
    const selectorRef = useRef(selector);
    const equalityFnRef = useRef(equalityFn);
    const erroredRef = useRef(false);
    const currentSliceRef = useRef();
    if (currentSliceRef.current === void 0) {
      currentSliceRef.current = selector(state);
    }
    let newStateSlice;
    let hasNewStateSlice = false;
    if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }
    useIsomorphicLayoutEffect$1(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }
      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      erroredRef.current = false;
    });
    const stateBeforeSubscriptionRef = useRef(state);
    useIsomorphicLayoutEffect$1(() => {
      const listener = () => {
        try {
          const nextState = api.getState();
          const nextStateSlice = selectorRef.current(nextState);
          if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
            stateRef.current = nextState;
            currentSliceRef.current = nextStateSlice;
            forceUpdate();
          }
        } catch (error) {
          erroredRef.current = true;
          forceUpdate();
        }
      };
      const unsubscribe = api.subscribe(listener);
      if (api.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }
      return unsubscribe;
    }, []);
    const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
    useDebugValue(sliceToReturn);
    return sliceToReturn;
  };
  Object.assign(useStore, api);
  useStore[Symbol.iterator] = function() {
    console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
    const items = [useStore, api];
    return {
      next() {
        const done = items.length <= 0;
        return { value: items.shift(), done };
      }
    };
  };
  return useStore;
}

var reactReconciler = {exports: {}};

var scheduler = {exports: {}};

var scheduler_production_min = {};

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredScheduler_production_min;

function requireScheduler_production_min () {
	if (hasRequiredScheduler_production_min) return scheduler_production_min;
	hasRequiredScheduler_production_min = 1;
	(function (exports) {
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
		function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}var r=[],t=[],u=1,v=null,y=3,z=false,A=false,B=false,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
		"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t);}}function H(a){B=false;G(a);if(!A)if(null!==h(r))A=true,I(J);else {var b=h(t);null!==b&&K(H,b.startTime-a);}}
		function J(a,b){A=false;B&&(B=false,E(L),L=-1);z=true;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b);}else k(r);v=h(r);}if(null!==v)var w=!0;else {var m=h(t);null!==m&&K(H,m.startTime-b);w=!1;}return w}finally{v=null,y=c,z=false;}}var N=false,O=null,L=-1,P=5,Q=-1;
		function M(){return exports.unstable_now()-Q<P?false:true}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=true;try{b=O(!0,a);}finally{b?S():(N=false,O=null);}}else N=false;}var S;if("function"===typeof F)S=function(){F(R);};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null);};}else S=function(){D(R,0);};function I(a){O=a;N||(N=true,S());}function K(a,b){L=D(function(){a(exports.unstable_now());},b);}
		exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){A||z||(A=true,I(J));};
		exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5;};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y;}var c=y;y=b;try{return a()}finally{y=c;}};exports.unstable_pauseExecution=function(){};
		exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=y;y=a;try{return b()}finally{y=c;}};
		exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=true,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=true,I(J)));return a};
		exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c;}}}; 
	} (scheduler_production_min));
	return scheduler_production_min;
}

var hasRequiredScheduler;

function requireScheduler () {
	if (hasRequiredScheduler) return scheduler.exports;
	hasRequiredScheduler = 1;
	{
	  scheduler.exports = requireScheduler_production_min();
	}
	return scheduler.exports;
}

/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var reactReconciler_production_min;
var hasRequiredReactReconciler_production_min;

function requireReactReconciler_production_min () {
	if (hasRequiredReactReconciler_production_min) return reactReconciler_production_min;
	hasRequiredReactReconciler_production_min = 1;
	reactReconciler_production_min = function $$$reconciler($$$hostConfig) {
	    var exports = {};
var aa=requireReact(),ba=requireScheduler(),ca=Object.assign;function n(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
	var ea=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fa=Symbol.for("react.element"),ha=Symbol.for("react.portal"),ia=Symbol.for("react.fragment"),ja=Symbol.for("react.strict_mode"),ka=Symbol.for("react.profiler"),la=Symbol.for("react.provider"),ma=Symbol.for("react.context"),na=Symbol.for("react.forward_ref"),oa=Symbol.for("react.suspense"),pa=Symbol.for("react.suspense_list"),qa=Symbol.for("react.memo"),ra=Symbol.for("react.lazy");	var sa=Symbol.for("react.offscreen");var ta=Symbol.iterator;function ua(a){if(null===a||"object"!==typeof a)return null;a=ta&&a[ta]||a["@@iterator"];return "function"===typeof a?a:null}
	function va(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ia:return "Fragment";case ha:return "Portal";case ka:return "Profiler";case ja:return "StrictMode";case oa:return "Suspense";case pa:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case ma:return (a.displayName||"Context")+".Consumer";case la:return (a._context.displayName||"Context")+".Provider";case na:var b=a.render;a=a.displayName;a||(a=b.displayName||
	b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case qa:return b=a.displayName||null,null!==b?b:va(a.type)||"Memo";case ra:b=a._payload;a=a._init;try{return va(a(b))}catch(c){}}return null}
	function xa(a){var b=a.type;switch(a.tag){case 24:return "Cache";case 9:return (b.displayName||"Context")+".Consumer";case 10:return (b._context.displayName||"Context")+".Provider";case 18:return "DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return "Fragment";case 5:return b;case 4:return "Portal";case 3:return "Root";case 6:return "Text";case 16:return va(b);case 8:return b===ja?"StrictMode":"Mode";case 22:return "Offscreen";
	case 12:return "Profiler";case 21:return "Scope";case 13:return "Suspense";case 19:return "SuspenseList";case 25:return "TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function ya(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function za(a){if(ya(a)!==a)throw Error(n(188));}
	function Aa(a){var b=a.alternate;if(!b){b=ya(a);if(null===b)throw Error(n(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return za(e),a;if(f===d)return za(e),b;f=f.sibling;}throw Error(n(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=false,h=e.child;h;){if(h===c){g=true;c=e;d=f;break}if(h===d){g=true;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
	c){g=true;c=f;d=e;break}if(h===d){g=true;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(n(189));}}if(c.alternate!==d)throw Error(n(190));}if(3!==c.tag)throw Error(n(188));return c.stateNode.current===c?a:b}function Ba(a){a=Aa(a);return null!==a?Ca(a):null}function Ca(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Ca(a);if(null!==b)return b;a=a.sibling;}return null}
	function Da(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){if(4!==a.tag){var b=Da(a);if(null!==b)return b}a=a.sibling;}return null}
	var Ea=Array.isArray,Fa=$$$hostConfig.getPublicInstance,Ga=$$$hostConfig.getRootHostContext,Ha=$$$hostConfig.getChildHostContext,Ia=$$$hostConfig.prepareForCommit,Ja=$$$hostConfig.resetAfterCommit,Ka=$$$hostConfig.createInstance,La=$$$hostConfig.appendInitialChild,Ma=$$$hostConfig.finalizeInitialChildren,Na=$$$hostConfig.prepareUpdate,Oa=$$$hostConfig.shouldSetTextContent,Pa=$$$hostConfig.createTextInstance,Qa=$$$hostConfig.scheduleTimeout,Ra=$$$hostConfig.cancelTimeout,Sa=$$$hostConfig.noTimeout,
	Ta=$$$hostConfig.isPrimaryRenderer,Ua=$$$hostConfig.supportsMutation,Va=$$$hostConfig.supportsPersistence,p=$$$hostConfig.supportsHydration,Wa=$$$hostConfig.getInstanceFromNode,Xa=$$$hostConfig.preparePortalMount,Ya=$$$hostConfig.getCurrentEventPriority,Za=$$$hostConfig.detachDeletedInstance,$a=$$$hostConfig.supportsMicrotasks,ab=$$$hostConfig.scheduleMicrotask,bb=$$$hostConfig.supportsTestSelectors,cb=$$$hostConfig.findFiberRoot,db=$$$hostConfig.getBoundingRect,eb=$$$hostConfig.getTextContent,fb=
	$$$hostConfig.isHiddenSubtree,gb=$$$hostConfig.matchAccessibilityRole,hb=$$$hostConfig.setFocusIfFocusable,ib=$$$hostConfig.setupIntersectionObserver,jb=$$$hostConfig.appendChild,kb=$$$hostConfig.appendChildToContainer,lb=$$$hostConfig.commitTextUpdate,mb=$$$hostConfig.commitMount,nb=$$$hostConfig.commitUpdate,ob=$$$hostConfig.insertBefore,pb=$$$hostConfig.insertInContainerBefore,qb=$$$hostConfig.removeChild,rb=$$$hostConfig.removeChildFromContainer,sb=$$$hostConfig.resetTextContent,tb=$$$hostConfig.hideInstance,
	ub=$$$hostConfig.hideTextInstance,vb=$$$hostConfig.unhideInstance,wb=$$$hostConfig.unhideTextInstance,xb=$$$hostConfig.clearContainer,yb=$$$hostConfig.cloneInstance,zb=$$$hostConfig.createContainerChildSet,Ab=$$$hostConfig.appendChildToContainerChildSet,Bb=$$$hostConfig.finalizeContainerChildren,Cb=$$$hostConfig.replaceContainerChildren,Db=$$$hostConfig.cloneHiddenInstance,Eb=$$$hostConfig.cloneHiddenTextInstance,Fb=$$$hostConfig.canHydrateInstance,Gb=$$$hostConfig.canHydrateTextInstance,Hb=$$$hostConfig.canHydrateSuspenseInstance,
	Ib=$$$hostConfig.isSuspenseInstancePending,Jb=$$$hostConfig.isSuspenseInstanceFallback,Kb=$$$hostConfig.registerSuspenseInstanceRetry,Lb=$$$hostConfig.getNextHydratableSibling,Mb=$$$hostConfig.getFirstHydratableChild,Nb=$$$hostConfig.getFirstHydratableChildWithinContainer,Ob=$$$hostConfig.getFirstHydratableChildWithinSuspenseInstance,Pb=$$$hostConfig.hydrateInstance,Qb=$$$hostConfig.hydrateTextInstance,Rb=$$$hostConfig.hydrateSuspenseInstance,Sb=$$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,
	Tb=$$$hostConfig.commitHydratedContainer,Ub=$$$hostConfig.commitHydratedSuspenseInstance,Vb=$$$hostConfig.clearSuspenseBoundary,Wb=$$$hostConfig.clearSuspenseBoundaryFromContainer,Xb=$$$hostConfig.shouldDeleteUnhydratedTailInstances,Yb=$$$hostConfig.didNotMatchHydratedContainerTextInstance,Zb=$$$hostConfig.didNotMatchHydratedTextInstance,$b;function ac(a){if(void 0===$b)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);$b=b&&b[1]||"";}return "\n"+$b+a}var bc=false;
	function cc(a,b){if(!a||bc)return "";bc=true;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(l){var d=l;}Reflect.construct(a,[],b);}else {try{b.call();}catch(l){d=l;}a.call(b.prototype);}else {try{throw Error();}catch(l){d=l;}a();}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
	f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{bc=false,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?ac(a):""}var dc=Object.prototype.hasOwnProperty,ec=[],fc=-1;function gc(a){return {current:a}}
	function x(a){0>fc||(a.current=ec[fc],ec[fc]=null,fc--);}function y(a,b){fc++;ec[fc]=a.current;a.current=b;}var hc={},A=gc(hc),B=gc(false),ic=hc;function jc(a,b){var c=a.type.contextTypes;if(!c)return hc;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
	function C(a){a=a.childContextTypes;return null!==a&&void 0!==a}function kc(){x(B);x(A);}function lc(a,b,c){if(A.current!==hc)throw Error(n(168));y(A,b);y(B,c);}function mc(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(n(108,xa(a)||"Unknown",e));return ca({},c,d)}
	function nc(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||hc;ic=A.current;y(A,a);y(B,B.current);return  true}function oc(a,b,c){var d=a.stateNode;if(!d)throw Error(n(169));c?(a=mc(a,b,ic),d.__reactInternalMemoizedMergedChildContext=a,x(B),x(A),y(A,a)):x(B);y(B,c);}var qc=Math.clz32?Math.clz32:pc,rc=Math.log,sc=Math.LN2;function pc(a){a>>>=0;return 0===a?32:31-(rc(a)/sc|0)|0}var tc=64,uc=4194304;
	function vc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
	default:return a}}function wc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=vc(h):(f&=g,0!==f&&(d=vc(f)));}else g=c&~e,0!==g?d=vc(g):0!==f&&(d=vc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-qc(b),e=1<<c,d|=a[c],b&=~e;return d}
	function xc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return  -1;case 134217728:case 268435456:case 536870912:case 1073741824:return  -1;default:return  -1}}
	function yc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-qc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=xc(h,b);}else k<=b&&(a.expiredLanes|=h);f&=~h;}}function zc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Ac(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}function Bc(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-qc(b);a[b]=c;}
	function Cc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-qc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f;}}function Dc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-qc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e;}}var D=0;function Ec(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}
	var Fc=ba.unstable_scheduleCallback,Gc=ba.unstable_cancelCallback,Hc=ba.unstable_shouldYield,Ic=ba.unstable_requestPaint,E=ba.unstable_now,Jc=ba.unstable_ImmediatePriority,Kc=ba.unstable_UserBlockingPriority,Lc=ba.unstable_NormalPriority,Mc=ba.unstable_IdlePriority,Nc=null,Oc=null;function Pc(a){if(Oc&&"function"===typeof Oc.onCommitFiberRoot)try{Oc.onCommitFiberRoot(Nc,a,void 0,128===(a.current.flags&128));}catch(b){}}function Qc(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}
	var Rc="function"===typeof Object.is?Object.is:Qc,Sc=null,Tc=false,Uc=false;function Vc(a){null===Sc?Sc=[a]:Sc.push(a);}function Wc(a){Tc=true;Vc(a);}function Xc(){if(!Uc&&null!==Sc){Uc=true;var a=0,b=D;try{var c=Sc;for(D=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}Sc=null;Tc=!1;}catch(e){throw null!==Sc&&(Sc=Sc.slice(a+1)),Fc(Jc,Xc),e;}finally{D=b,Uc=false;}}return null}var Yc=ea.ReactCurrentBatchConfig;
	function Zc(a,b){if(Rc(a,b))return  true;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return  false;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return  false;for(d=0;d<c.length;d++){var e=c[d];if(!dc.call(b,e)||!Rc(a[e],b[e]))return  false}return  true}
	function $c(a){switch(a.tag){case 5:return ac(a.type);case 16:return ac("Lazy");case 13:return ac("Suspense");case 19:return ac("SuspenseList");case 0:case 2:case 15:return a=cc(a.type,false),a;case 11:return a=cc(a.type.render,false),a;case 1:return a=cc(a.type,true),a;default:return ""}}function ad(a,b){if(a&&a.defaultProps){b=ca({},b);a=a.defaultProps;for(var c in a) void 0===b[c]&&(b[c]=a[c]);return b}return b}var bd=gc(null),cd=null,dd=null,ed=null;function fd(){ed=dd=cd=null;}
	function gd(a,b,c){Ta?(y(bd,b._currentValue),b._currentValue=c):(y(bd,b._currentValue2),b._currentValue2=c);}function hd(a){var b=bd.current;x(bd);Ta?a._currentValue=b:a._currentValue2=b;}function id(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return;}}
	function jd(a,b){cd=a;ed=dd=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(kd=true),a.firstContext=null);}function ld(a){var b=Ta?a._currentValue:a._currentValue2;if(ed!==a)if(a={context:a,memoizedValue:b,next:null},null===dd){if(null===cd)throw Error(n(308));dd=a;cd.dependencies={lanes:0,firstContext:a};}else dd=dd.next=a;return b}var md=null,nd=false;
	function od(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};}function pd(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function qd(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
	function rd(a,b){var c=a.updateQueue;null!==c&&(c=c.shared,null!==F&&0!==(a.mode&1)&&0===(G&2)?(a=c.interleaved,null===a?(b.next=b,null===md?md=[c]:md.push(c)):(b.next=a.next,a.next=b),c.interleaved=b):(a=c.pending,null===a?b.next=b:(b.next=a.next,a.next=b),c.pending=b));}function sd(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Dc(a,c);}}
	function td(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
	b;c.lastBaseUpdate=b;}
	function ud(a,b,c,d){var e=a.updateQueue;nd=false;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k));}if(null!==f){var v=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,z=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:z,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
	next:null});a:{var q=a,N=h;r=b;z=c;switch(N.tag){case 1:q=N.payload;if("function"===typeof q){v=q.call(z,v,r);break a}v=q;break a;case 3:q.flags=q.flags&-65537|128;case 0:q=N.payload;r="function"===typeof q?q.call(z,v,r):q;if(null===r||void 0===r)break a;v=ca({},v,r);break a;case 2:nd=true;}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h));}else z={eventTime:z,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=z,k=v):m=m.next=z,g|=
	r;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null;}while(1);null===m&&(k=v);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);vd|=g;a.lanes=g;a.memoizedState=v;}}
	function wd(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(n(191,e));e.call(d);}}}var xd=(new aa.Component).refs;function yd(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:ca({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
	var Bd={isMounted:function(a){return (a=a._reactInternals)?ya(a)===a:false},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=H(),e=zd(a),f=qd(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);rd(a,f);b=Ad(a,e,d);null!==b&&sd(b,a,e);},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=H(),e=zd(a),f=qd(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);rd(a,f);b=Ad(a,e,d);null!==b&&sd(b,a,e);},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=H(),d=zd(a),e=qd(c,
	d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);rd(a,e);b=Ad(a,d,c);null!==b&&sd(b,a,d);}};function Cd(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Zc(c,d)||!Zc(e,f):true}
	function Dd(a,b,c){var d=false,e=hc;var f=b.contextType;"object"===typeof f&&null!==f?f=ld(f):(e=C(b)?ic:A.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?jc(a,e):hc);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Bd;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
	function Ed(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Bd.enqueueReplaceState(b,b.state,null);}
	function Fd(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=xd;od(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=ld(f):(f=C(b)?ic:A.current,e.context=jc(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(yd(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
	"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Bd.enqueueReplaceState(e,e.state,null),ud(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308);}var Gd=[],Hd=0,Id=null,Jd=0,Kd=[],Ld=0,Md=null,Nd=1,Od="";function Pd(a,b){Gd[Hd++]=Jd;Gd[Hd++]=Id;Id=a;Jd=b;}
	function Qd(a,b,c){Kd[Ld++]=Nd;Kd[Ld++]=Od;Kd[Ld++]=Md;Md=a;var d=Nd;a=Od;var e=32-qc(d)-1;d&=~(1<<e);c+=1;var f=32-qc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;Nd=1<<32-qc(b)+e|c<<e|d;Od=f+a;}else Nd=1<<f|c<<e|d,Od=a;}function Rd(a){null!==a.return&&(Pd(a,1),Qd(a,1,0));}function Sd(a){for(;a===Id;)Id=Gd[--Hd],Gd[Hd]=null,Jd=Gd[--Hd],Gd[Hd]=null;for(;a===Md;)Md=Kd[--Ld],Kd[Ld]=null,Od=Kd[--Ld],Kd[Ld]=null,Nd=Kd[--Ld],Kd[Ld]=null;}var Td=null,Ud=null,I=false,Vd=false,Wd=null;
	function Xd(a,b){var c=Yd(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c);}
	function Zd(a,b){switch(a.tag){case 5:return b=Fb(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,Td=a,Ud=Mb(b),true):false;case 6:return b=Gb(b,a.pendingProps),null!==b?(a.stateNode=b,Td=a,Ud=null,true):false;case 13:b=Hb(b);if(null!==b){var c=null!==Md?{id:Nd,overflow:Od}:null;a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824};c=Yd(18,null,null,0);c.stateNode=b;c.return=a;a.child=c;Td=a;Ud=null;return  true}return  false;default:return  false}}function $d(a){return 0!==(a.mode&1)&&0===(a.flags&128)}
	function ae(a){if(I){var b=Ud;if(b){var c=b;if(!Zd(a,b)){if($d(a))throw Error(n(418));b=Lb(c);var d=Td;b&&Zd(a,b)?Xd(d,c):(a.flags=a.flags&-4097|2,I=false,Td=a);}}else {if($d(a))throw Error(n(418));a.flags=a.flags&-4097|2;I=false;Td=a;}}}function be(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;Td=a;}
	function ce(a){if(!p||a!==Td)return  false;if(!I)return be(a),I=true,false;if(3!==a.tag&&(5!==a.tag||Xb(a.type)&&!Oa(a.type,a.memoizedProps))){var b=Ud;if(b){if($d(a)){for(a=Ud;a;)a=Lb(a);throw Error(n(418));}for(;b;)Xd(a,b),b=Lb(b);}}be(a);if(13===a.tag){if(!p)throw Error(n(316));a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(n(317));Ud=Sb(a);}else Ud=Td?Lb(a.stateNode):null;return  true}function de(){p&&(Ud=Td=null,Vd=I=false);}function ee(a){null===Wd?Wd=[a]:Wd.push(a);}
	function fe(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(n(309));var d=c.stateNode;}if(!d)throw Error(n(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===xd&&(b=e.refs={});null===a?delete b[f]:b[f]=a;};b._stringRef=f;return b}if("string"!==typeof a)throw Error(n(284));if(!c._owner)throw Error(n(290,a));}return a}
	function ge(a,b){a=Object.prototype.toString.call(b);throw Error(n(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function he(a){var b=a._init;return b(a._payload)}
	function ie(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c);}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=je(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
	null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=ke(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ia)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===ra&&he(f)===b.type))return d=e(b,c.props),d.ref=fe(a,b,c),d.return=a,d;d=le(c.type,c.key,c.props,null,a.mode,d);d.ref=fe(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
	b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=me(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=ne(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function v(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=ke(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case fa:return c=le(b.type,b.key,b.props,null,a.mode,c),
	c.ref=fe(a,null,b),c.return=a,c;case ha:return b=me(b,a.mode,c),b.return=a,b;case ra:var d=b._init;return v(a,d(b._payload),c)}if(Ea(b)||ua(b))return b=ne(b,a.mode,c,null),b.return=a,b;ge(a,b);}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case fa:return c.key===e?k(a,b,c,d):null;case ha:return c.key===e?l(a,b,c,d):null;case ra:return e=c._init,r(a,
	b,e(c._payload),d)}if(Ea(c)||ua(c))return null!==e?null:m(a,b,c,d,null);ge(a,c);}return null}function z(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case fa:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case ha:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case ra:var f=d._init;return z(a,b,c,f(d._payload),e)}if(Ea(d)||ua(d))return a=a.get(c)||null,m(b,a,d,e,null);ge(b,d);}return null}
	function q(e,g,h,k){for(var l=null,m=null,w=g,u=g=0,t=null;null!==w&&u<h.length;u++){w.index>u?(t=w,w=null):t=w.sibling;var q=r(e,w,h[u],k);if(null===q){null===w&&(w=t);break}a&&w&&null===q.alternate&&b(e,w);g=f(q,g,u);null===m?l=q:m.sibling=q;m=q;w=t;}if(u===h.length)return c(e,w),I&&Pd(e,u),l;if(null===w){for(;u<h.length;u++)w=v(e,h[u],k),null!==w&&(g=f(w,g,u),null===m?l=w:m.sibling=w,m=w);I&&Pd(e,u);return l}for(w=d(e,w);u<h.length;u++)t=z(w,e,u,h[u],k),null!==t&&(a&&null!==t.alternate&&w.delete(null===
	t.key?u:t.key),g=f(t,g,u),null===m?l=t:m.sibling=t,m=t);a&&w.forEach(function(a){return b(e,a)});I&&Pd(e,u);return l}function N(e,g,h,k){var l=ua(h);if("function"!==typeof l)throw Error(n(150));h=l.call(h);if(null==h)throw Error(n(151));for(var w=l=null,m=g,u=g=0,q=null,t=h.next();null!==m&&!t.done;u++,t=h.next()){m.index>u?(q=m,m=null):q=m.sibling;var V=r(e,m,t.value,k);if(null===V){null===m&&(m=q);break}a&&m&&null===V.alternate&&b(e,m);g=f(V,g,u);null===w?l=V:w.sibling=V;w=V;m=q;}if(t.done)return c(e,
	m),I&&Pd(e,u),l;if(null===m){for(;!t.done;u++,t=h.next())t=v(e,t.value,k),null!==t&&(g=f(t,g,u),null===w?l=t:w.sibling=t,w=t);I&&Pd(e,u);return l}for(m=d(e,m);!t.done;u++,t=h.next())t=z(m,e,u,t.value,k),null!==t&&(a&&null!==t.alternate&&m.delete(null===t.key?u:t.key),g=f(t,g,u),null===w?l=t:w.sibling=t,w=t);a&&m.forEach(function(a){return b(e,a)});I&&Pd(e,u);return l}function da(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ia&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==
	f){switch(f.$$typeof){case fa:a:{for(var k=f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ia){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===ra&&he(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=fe(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling;}f.type===ia?(d=ne(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=le(f.type,f.key,f.props,null,a.mode,h),h.ref=fe(a,d,f),h.return=
	a,a=h);}return g(a);case ha:a:{for(l=f.key;null!==d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=me(f,a.mode,h);d.return=a;a=d;}return g(a);case ra:return l=f._init,da(a,d,l(f._payload),h)}if(Ea(f))return q(a,d,f,h);if(ua(f))return N(a,d,f,h);ge(a,f);}return "string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&
	6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=ke(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return da}var oe=ie(true),pe=ie(false),qe={},re=gc(qe),se=gc(qe),te=gc(qe);function ue(a){if(a===qe)throw Error(n(174));return a}function ve(a,b){y(te,b);y(se,a);y(re,qe);a=Ga(b);x(re);y(re,a);}function we(){x(re);x(se);x(te);}function xe(a){var b=ue(te.current),c=ue(re.current);b=Ha(c,a.type,b);c!==b&&(y(se,a),y(re,b));}function ye(a){se.current===a&&(x(re),x(se));}var J=gc(0);
	function ze(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||Ib(c)||Jb(c)))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var Ae=[];
	function Be(){for(var a=0;a<Ae.length;a++){var b=Ae[a];Ta?b._workInProgressVersionPrimary=null:b._workInProgressVersionSecondary=null;}Ae.length=0;}var Ce=ea.ReactCurrentDispatcher,De=ea.ReactCurrentBatchConfig,Ee=0,K=null,L=null,M=null,Fe=false,Ge=false,He=0,Ie=0;function O(){throw Error(n(321));}function Je(a,b){if(null===b)return  false;for(var c=0;c<b.length&&c<a.length;c++)if(!Rc(a[c],b[c]))return  false;return  true}
	function Ke(a,b,c,d,e,f){Ee=f;K=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Ce.current=null===a||null===a.memoizedState?Le:Me;a=c(d,e);if(Ge){f=0;do{Ge=false;He=0;if(25<=f)throw Error(n(301));f+=1;M=L=null;b.updateQueue=null;Ce.current=Ne;a=c(d,e);}while(Ge)}Ce.current=Oe;b=null!==L&&null!==L.next;Ee=0;M=L=K=null;Fe=false;if(b)throw Error(n(300));return a}function Pe(){var a=0!==He;He=0;return a}
	function Qe(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===M?K.memoizedState=M=a:M=M.next=a;return M}function Re(){if(null===L){var a=K.alternate;a=null!==a?a.memoizedState:null;}else a=L.next;var b=null===M?K.memoizedState:M.next;if(null!==b)M=b,L=a;else {if(null===a)throw Error(n(310));L=a;a={memoizedState:L.memoizedState,baseState:L.baseState,baseQueue:L.baseQueue,queue:L.queue,next:null};null===M?K.memoizedState=M=a:M=M.next=a;}return M}
	function Se(a,b){return "function"===typeof b?b(a):b}
	function Te(a){var b=Re(),c=b.queue;if(null===c)throw Error(n(311));c.lastRenderedReducer=a;var d=L,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Ee&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else {var v={lane:m,action:l.action,hasEagerState:l.hasEagerState,
	eagerState:l.eagerState,next:null};null===k?(h=k=v,g=d):k=k.next=v;K.lanes|=m;vd|=m;}l=l.next;}while(null!==l&&l!==f);null===k?g=d:k.next=h;Rc(d,b.memoizedState)||(kd=true);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d;}a=c.interleaved;if(null!==a){e=a;do f=e.lane,K.lanes|=f,vd|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return [b.memoizedState,c.dispatch]}
	function Ue(a){var b=Re(),c=b.queue;if(null===c)throw Error(n(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);Rc(f,b.memoizedState)||(kd=true);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}function Ve(){}
	function We(a,b){var c=K,d=Re(),e=b(),f=!Rc(d.memoizedState,e);f&&(d.memoizedState=e,kd=true);d=d.queue;Xe(Ye.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==M&&M.memoizedState.tag&1){c.flags|=2048;Ze(9,$e.bind(null,c,d,e,b),void 0,null);if(null===F)throw Error(n(349));0!==(Ee&30)||af(c,b,e);}return e}function af(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=K.updateQueue;null===b?(b={lastEffect:null,stores:null},K.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a));}
	function $e(a,b,c,d){b.value=c;b.getSnapshot=d;bf(b)&&Ad(a,1,-1);}function Ye(a,b,c){return c(function(){bf(b)&&Ad(a,1,-1);})}function bf(a){var b=a.getSnapshot;a=a.value;try{var c=b();return !Rc(a,c)}catch(d){return  true}}function cf(a){var b=Qe();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Se,lastRenderedState:a};b.queue=a;a=a.dispatch=df.bind(null,K,a);return [b.memoizedState,a]}
	function Ze(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=K.updateQueue;null===b?(b={lastEffect:null,stores:null},K.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ef(){return Re().memoizedState}function ff(a,b,c,d){var e=Qe();K.flags|=a;e.memoizedState=Ze(1|b,c,void 0,void 0===d?null:d);}
	function gf(a,b,c,d){var e=Re();d=void 0===d?null:d;var f=void 0;if(null!==L){var g=L.memoizedState;f=g.destroy;if(null!==d&&Je(d,g.deps)){e.memoizedState=Ze(b,c,f,d);return}}K.flags|=a;e.memoizedState=Ze(1|b,c,f,d);}function hf(a,b){return ff(8390656,8,a,b)}function Xe(a,b){return gf(2048,8,a,b)}function jf(a,b){return gf(4,2,a,b)}function kf(a,b){return gf(4,4,a,b)}
	function lf(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function mf(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return gf(4,4,lf.bind(null,b,a),c)}function nf(){}function of(a,b){var c=Re();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Je(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
	function pf(a,b){var c=Re();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Je(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function qf(a,b){var c=D;D=0!==c&&4>c?c:4;a(true);var d=De.transition;De.transition={};try{a(!1),b();}finally{D=c,De.transition=d;}}function rf(){return Re().memoizedState}function sf(a,b,c){var d=zd(a);c={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};tf(a)?uf(b,c):(vf(a,b,c),c=H(),a=Ad(a,d,c),null!==a&&wf(a,b,d));}
	function df(a,b,c){var d=zd(a),e={lane:d,action:c,hasEagerState:false,eagerState:null,next:null};if(tf(a))uf(b,e);else {vf(a,b,e);var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(Rc(h,g))return}catch(k){}finally{}c=H();a=Ad(a,d,c);null!==a&&wf(a,b,d);}}function tf(a){var b=a.alternate;return a===K||null!==b&&b===K}
	function uf(a,b){Ge=Fe=true;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}function vf(a,b,c){null!==F&&0!==(a.mode&1)&&0===(G&2)?(a=b.interleaved,null===a?(c.next=c,null===md?md=[b]:md.push(b)):(c.next=a.next,a.next=c),b.interleaved=c):(a=b.pending,null===a?c.next=c:(c.next=a.next,a.next=c),b.pending=c);}function wf(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Dc(a,c);}}
	var Oe={readContext:ld,useCallback:O,useContext:O,useEffect:O,useImperativeHandle:O,useInsertionEffect:O,useLayoutEffect:O,useMemo:O,useReducer:O,useRef:O,useState:O,useDebugValue:O,useDeferredValue:O,useTransition:O,useMutableSource:O,useSyncExternalStore:O,useId:O,unstable_isNewReconciler:false},Le={readContext:ld,useCallback:function(a,b){Qe().memoizedState=[a,void 0===b?null:b];return a},useContext:ld,useEffect:hf,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ff(4194308,
	4,lf.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ff(4194308,4,a,b)},useInsertionEffect:function(a,b){return ff(4,2,a,b)},useMemo:function(a,b){var c=Qe();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Qe();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=sf.bind(null,K,a);return [d.memoizedState,a]},useRef:function(a){var b=
	Qe();a={current:a};return b.memoizedState=a},useState:cf,useDebugValue:nf,useDeferredValue:function(a){var b=cf(a),c=b[0],d=b[1];hf(function(){var b=De.transition;De.transition={};try{d(a);}finally{De.transition=b;}},[a]);return c},useTransition:function(){var a=cf(false),b=a[0];a=qf.bind(null,a[1]);Qe().memoizedState=a;return [b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=K,e=Qe();if(I){if(void 0===c)throw Error(n(407));c=c();}else {c=b();if(null===F)throw Error(n(349));
	0!==(Ee&30)||af(d,b,c);}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;hf(Ye.bind(null,d,f,a),[a]);d.flags|=2048;Ze(9,$e.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Qe(),b=F.identifierPrefix;if(I){var c=Od;var d=Nd;c=(d&~(1<<32-qc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=He++;0<c&&(b+="H"+c.toString(32));b+=":";}else c=Ie++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:false},Me={readContext:ld,useCallback:of,useContext:ld,useEffect:Xe,useImperativeHandle:mf,
	useInsertionEffect:jf,useLayoutEffect:kf,useMemo:pf,useReducer:Te,useRef:ef,useState:function(){return Te(Se)},useDebugValue:nf,useDeferredValue:function(a){var b=Te(Se),c=b[0],d=b[1];Xe(function(){var b=De.transition;De.transition={};try{d(a);}finally{De.transition=b;}},[a]);return c},useTransition:function(){var a=Te(Se)[0],b=Re().memoizedState;return [a,b]},useMutableSource:Ve,useSyncExternalStore:We,useId:rf,unstable_isNewReconciler:false},Ne={readContext:ld,useCallback:of,useContext:ld,useEffect:Xe,
	useImperativeHandle:mf,useInsertionEffect:jf,useLayoutEffect:kf,useMemo:pf,useReducer:Ue,useRef:ef,useState:function(){return Ue(Se)},useDebugValue:nf,useDeferredValue:function(a){var b=Ue(Se),c=b[0],d=b[1];Xe(function(){var b=De.transition;De.transition={};try{d(a);}finally{De.transition=b;}},[a]);return c},useTransition:function(){var a=Ue(Se)[0],b=Re().memoizedState;return [a,b]},useMutableSource:Ve,useSyncExternalStore:We,useId:rf,unstable_isNewReconciler:false};
	function xf(a,b){try{var c="",d=b;do c+=$c(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e}}function yf(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var zf="function"===typeof WeakMap?WeakMap:Map;function Af(a,b,c){c=qd(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Bf||(Bf=true,Cf=d);yf(a,b);};return c}
	function Df(a,b,c){c=qd(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){yf(a,b);};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){yf(a,b);"function"!==typeof d&&(null===Ef?Ef=new Set([this]):Ef.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}
	function Ff(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new zf;var e=new Set;d.set(b,e);}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Gf.bind(null,a,b,c),b.then(a,a));}function Hf(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?true:false:true;if(b)return a;a=a.return;}while(null!==a);return null}
	function If(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=qd(-1,1),b.tag=2,rd(c,b))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}function Jf(a){a.flags|=4;}function Kf(a,b){if(null!==a&&a.child===b.child)return  true;if(0!==(b.flags&16))return  false;for(a=b.child;null!==a;){if(0!==(a.flags&12854)||0!==(a.subtreeFlags&12854))return  false;a=a.sibling;}return  true}var Lf,Mf,Nf,Of;
	if(Ua)Lf=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)La(a,c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}},Mf=function(){},Nf=function(a,b,c,d,e){a=a.memoizedProps;if(a!==d){var f=b.stateNode,g=ue(re.current);c=Na(f,c,a,d,e,g);(b.updateQueue=c)&&Jf(b);}},Of=function(a,b,c,d){c!==d&&Jf(b);};else if(Va){Lf=function(a,
	b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Db(f,e.type,e.memoizedProps,e));La(a,f);}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Eb(f,e.memoizedProps,e)),La(a,f);else if(4!==e.tag)if(22===e.tag&&null!==e.memoizedState)f=e.child,null!==f&&(f.return=e),Lf(a,e,true,true);else if(null!==e.child){e.child.return=e;e=e.child;continue}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}};var Pf=function(a,
	b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Db(f,e.type,e.memoizedProps,e));Ab(a,f);}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Eb(f,e.memoizedProps,e)),Ab(a,f);else if(4!==e.tag)if(22===e.tag&&null!==e.memoizedState)f=e.child,null!==f&&(f.return=e),Pf(a,e,true,true);else if(null!==e.child){e.child.return=e;e=e.child;continue}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}};Mf=function(a,b){var c=
	b.stateNode;if(!Kf(a,b)){a=c.containerInfo;var d=zb(a);Pf(d,b,false,false);c.pendingChildren=d;Jf(b);Bb(a,d);}};Nf=function(a,b,c,d,e){var f=a.stateNode,g=a.memoizedProps;if((a=Kf(a,b))&&g===d)b.stateNode=f;else {var h=b.stateNode,k=ue(re.current),l=null;g!==d&&(l=Na(h,c,g,d,e,k));a&&null===l?b.stateNode=f:(f=yb(f,l,c,g,d,b,a,h),Ma(f,c,d,e,k)&&Jf(b),b.stateNode=f,a?Jf(b):Lf(f,b,false,false));}};Of=function(a,b,c,d){c!==d?(a=ue(te.current),c=ue(re.current),b.stateNode=Pa(d,a,c,b),Jf(b)):b.stateNode=a.stateNode;};}else Mf=
	function(){},Nf=function(){},Of=function(){};function Qf(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
	function P(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
	function Rf(a,b,c){var d=b.pendingProps;Sd(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return P(b),null;case 1:return C(b.type)&&kc(),P(b),null;case 3:d=b.stateNode;we();x(B);x(A);Be();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)ce(b)?Jf(b):null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==Wd&&(Sf(Wd),Wd=null));Mf(a,b);P(b);return null;case 5:ye(b);c=ue(te.current);var e=
	b.type;if(null!==a&&null!=b.stateNode)Nf(a,b,e,d,c),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else {if(!d){if(null===b.stateNode)throw Error(n(166));P(b);return null}a=ue(re.current);if(ce(b)){if(!p)throw Error(n(175));a=Pb(b.stateNode,b.type,b.memoizedProps,c,a,b,!Vd);b.updateQueue=a;null!==a&&Jf(b);}else {var f=Ka(e,d,c,a,b);Lf(f,b,false,false);b.stateNode=f;Ma(f,e,d,c,a)&&Jf(b);}null!==b.ref&&(b.flags|=512,b.flags|=2097152);}P(b);return null;case 6:if(a&&null!=b.stateNode)Of(a,b,a.memoizedProps,d);else {if("string"!==
	typeof d&&null===b.stateNode)throw Error(n(166));a=ue(te.current);c=ue(re.current);if(ce(b)){if(!p)throw Error(n(176));a=b.stateNode;d=b.memoizedProps;if(c=Qb(a,d,b,!Vd))if(e=Td,null!==e)switch(f=0!==(e.mode&1),e.tag){case 3:Yb(e.stateNode.containerInfo,a,d,f);break;case 5:Zb(e.type,e.memoizedProps,e.stateNode,a,d,f);}c&&Jf(b);}else b.stateNode=Pa(d,a,c,b);}P(b);return null;case 13:x(J);d=b.memoizedState;if(I&&null!==Ud&&0!==(b.mode&1)&&0===(b.flags&128)){for(a=Ud;a;)a=Lb(a);de();b.flags|=98560;return b}if(null!==
	d&&null!==d.dehydrated){d=ce(b);if(null===a){if(!d)throw Error(n(318));if(!p)throw Error(n(344));a=b.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(n(317));Rb(a,b);}else de(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;P(b);return null}null!==Wd&&(Sf(Wd),Wd=null);if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;c=false;null===a?ce(b):c=null!==a.memoizedState;d&&!c&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(J.current&1)?0===Q&&(Q=3):Tf()));null!==b.updateQueue&&(b.flags|=
	4);P(b);return null;case 4:return we(),Mf(a,b),null===a&&Xa(b.stateNode.containerInfo),P(b),null;case 10:return hd(b.type._context),P(b),null;case 17:return C(b.type)&&kc(),P(b),null;case 19:x(J);e=b.memoizedState;if(null===e)return P(b),null;d=0!==(b.flags&128);f=e.rendering;if(null===f)if(d)Qf(e,false);else {if(0!==Q||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){f=ze(a);if(null!==f){b.flags|=128;Qf(e,false);a=f.updateQueue;null!==a&&(b.updateQueue=a,b.flags|=4);b.subtreeFlags=0;a=c;for(d=b.child;null!==
	d;)c=d,e=a,c.flags&=14680066,f=c.alternate,null===f?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=f.childLanes,c.lanes=f.lanes,c.child=f.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=f.memoizedProps,c.memoizedState=f.memoizedState,c.updateQueue=f.updateQueue,c.type=f.type,e=f.dependencies,c.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),d=d.sibling;
	y(J,J.current&1|2);return b.child}a=a.sibling;}null!==e.tail&&E()>Uf&&(b.flags|=128,d=true,Qf(e,false),b.lanes=4194304);}else {if(!d)if(a=ze(f),null!==a){if(b.flags|=128,d=true,a=a.updateQueue,null!==a&&(b.updateQueue=a,b.flags|=4),Qf(e,true),null===e.tail&&"hidden"===e.tailMode&&!f.alternate&&!I)return P(b),null}else 2*E()-e.renderingStartTime>Uf&&1073741824!==c&&(b.flags|=128,d=true,Qf(e,false),b.lanes=4194304);e.isBackwards?(f.sibling=b.child,b.child=f):(a=e.last,null!==a?a.sibling=f:b.child=f,e.last=f);}if(null!==
	e.tail)return b=e.tail,e.rendering=b,e.tail=b.sibling,e.renderingStartTime=E(),b.sibling=null,a=J.current,y(J,d?a&1|2:a&1),b;P(b);return null;case 22:case 23:return Vf(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(Wf&1073741824)&&(P(b),Ua&&b.subtreeFlags&6&&(b.flags|=8192)):P(b),null;case 24:return null;case 25:return null}throw Error(n(156,b.tag));}var Xf=ea.ReactCurrentOwner,kd=false;
	function R(a,b,c,d){b.child=null===a?pe(b,null,c,d):oe(b,a.child,c,d);}function Yf(a,b,c,d,e){c=c.render;var f=b.ref;jd(b,e);d=Ke(a,b,c,d,f,e);c=Pe();if(null!==a&&!kd)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zf(a,b,e);I&&c&&Rd(b);b.flags|=1;R(a,b,d,e);return b.child}
	function $f(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!ag(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bg(a,b,f,d,e);a=le(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Zc;if(c(g,d)&&a.ref===b.ref)return Zf(a,b,e)}b.flags|=1;a=je(f,d);a.ref=b.ref;a.return=b;return b.child=a}
	function bg(a,b,c,d,e){if(null!==a&&Zc(a.memoizedProps,d)&&a.ref===b.ref)if(kd=false,0!==(a.lanes&e))0!==(a.flags&131072)&&(kd=true);else return b.lanes=a.lanes,Zf(a,b,e);return cg(a,b,c,d,e)}
	function dg(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null},y(eg,Wf),Wf|=c;else if(0!==(c&1073741824))b.memoizedState={baseLanes:0,cachePool:null},d=null!==f?f.baseLanes:c,y(eg,Wf),Wf|=d;else return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null},b.updateQueue=null,y(eg,Wf),Wf|=a,null;else null!==f?(d=f.baseLanes|c,b.memoizedState=null):
	d=c,y(eg,Wf),Wf|=d;R(a,b,e,c);return b.child}function fg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152;}function cg(a,b,c,d,e){var f=C(c)?ic:A.current;f=jc(b,f);jd(b,e);c=Ke(a,b,c,d,f,e);d=Pe();if(null!==a&&!kd)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zf(a,b,e);I&&d&&Rd(b);b.flags|=1;R(a,b,c,e);return b.child}
	function gg(a,b,c,d,e){if(C(c)){var f=true;nc(b);}else f=false;jd(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),Dd(b,c,d),Fd(b,c,d,e),d=true;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=ld(l):(l=C(c)?ic:A.current,l=jc(b,l));var m=c.getDerivedStateFromProps,v="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;v||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==
	typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Ed(b,g,d,l);nd=false;var r=b.memoizedState;g.state=r;ud(b,d,g,e);k=b.memoizedState;h!==d||r!==k||B.current||nd?("function"===typeof m&&(yd(b,c,m,d),k=b.memoizedState),(h=nd||Cd(b,c,h,d,r,k,l))?(v||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&
	(b.flags|=4194308)):("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=false);}else {g=b.stateNode;pd(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:ad(b.type,h);g.props=l;v=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=ld(k):(k=C(c)?ic:A.current,k=jc(b,k));var z=c.getDerivedStateFromProps;(m="function"===typeof z||"function"===
	typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==v||r!==k)&&Ed(b,g,d,k);nd=false;r=b.memoizedState;g.state=r;ud(b,d,g,e);var q=b.memoizedState;h!==v||r!==q||B.current||nd?("function"===typeof z&&(yd(b,c,z,d),q=b.memoizedState),(l=nd||Cd(b,c,l,d,r,q,k)||false)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,
	q,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,q,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=q),g.props=d,g.state=q,g.context=k,d=l):("function"!==
	typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=false);}return hg(a,b,c,d,f,e)}
	function hg(a,b,c,d,e,f){fg(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&oc(b,c,false),Zf(a,b,f);d=b.stateNode;Xf.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=oe(b,a.child,null,f),b.child=oe(b,null,h,f)):R(a,b,h,f);b.memoizedState=d.state;e&&oc(b,c,true);return b.child}function ig(a){var b=a.stateNode;b.pendingContext?lc(a,b.pendingContext,b.pendingContext!==b.context):b.context&&lc(a,b.context,false);ve(a,b.containerInfo);}
	function jg(a,b,c,d,e){de();ee(e);b.flags|=256;R(a,b,c,d);return b.child}var kg={dehydrated:null,treeContext:null,retryLane:0};function lg(a){return {baseLanes:a,cachePool:null}}
	function mg(a,b,c){var d=b.pendingProps,e=J.current,f=false,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?false:0!==(e&2));if(h)f=true,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;y(J,e&1);if(null===a){ae(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:Jb(a)?b.lanes=8:b.lanes=1073741824,null;e=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,e={mode:"hidden",children:e},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=e):
	f=ng(e,d,0,null),a=ne(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=lg(c),b.memoizedState=kg,a):og(b,e)}e=a.memoizedState;if(null!==e){h=e.dehydrated;if(null!==h){if(g){if(b.flags&256)return b.flags&=-257,pg(a,b,c,Error(n(422)));if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=ng({mode:"visible",children:d.children},e,0,null);f=ne(f,e,c,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&oe(b,a.child,
	null,c);b.child.memoizedState=lg(c);b.memoizedState=kg;return f}if(0===(b.mode&1))b=pg(a,b,c,null);else if(Jb(h))b=pg(a,b,c,Error(n(419)));else if(d=0!==(c&a.childLanes),kd||d){d=F;if(null!==d){switch(c&-c){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=
	268435456;break;default:f=0;}d=0!==(f&(d.suspendedLanes|c))?0:f;0!==d&&d!==e.retryLane&&(e.retryLane=d,Ad(a,d,-1));}Tf();b=pg(a,b,c,Error(n(421)));}else Ib(h)?(b.flags|=128,b.child=a.child,b=qg.bind(null,a),Kb(h,b),b=null):(c=e.treeContext,p&&(Ud=Ob(h),Td=b,I=true,Wd=null,Vd=false,null!==c&&(Kd[Ld++]=Nd,Kd[Ld++]=Od,Kd[Ld++]=Md,Nd=c.id,Od=c.overflow,Md=b)),b=og(b,b.pendingProps.children),b.flags|=4096);return b}if(f)return d=rg(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=
	null===e?lg(c):{baseLanes:e.baseLanes|c,cachePool:null},f.childLanes=a.childLanes&~c,b.memoizedState=kg,d;c=sg(a,b,d.children,c);b.memoizedState=null;return c}if(f)return d=rg(a,b,d.children,d.fallback,c),f=b.child,e=a.child.memoizedState,f.memoizedState=null===e?lg(c):{baseLanes:e.baseLanes|c,cachePool:null},f.childLanes=a.childLanes&~c,b.memoizedState=kg,d;c=sg(a,b,d.children,c);b.memoizedState=null;return c}
	function og(a,b){b=ng({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sg(a,b,c,d){var e=a.child;a=e.sibling;c=je(e,{mode:"visible",children:c});0===(b.mode&1)&&(c.lanes=d);c.return=b;c.sibling=null;null!==a&&(d=b.deletions,null===d?(b.deletions=[a],b.flags|=16):d.push(a));return b.child=c}
	function rg(a,b,c,d,e){var f=b.mode;a=a.child;var g=a.sibling,h={mode:"hidden",children:c};0===(f&1)&&b.child!==a?(c=b.child,c.childLanes=0,c.pendingProps=h,b.deletions=null):(c=je(a,h),c.subtreeFlags=a.subtreeFlags&14680064);null!==g?d=je(g,d):(d=ne(d,f,e,null),d.flags|=2);d.return=b;c.return=b;c.sibling=d;b.child=c;return d}function pg(a,b,c,d){null!==d&&ee(d);oe(b,a.child,null,c);a=og(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
	function tg(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);id(a.return,b,c);}function ug(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e);}
	function vg(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;R(a,b,d.children,c);d=J.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else {if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&tg(a,c,b);else if(19===a.tag)tg(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}y(J,d);if(0===(b.mode&1))b.memoizedState=
	null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ze(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);ug(b,false,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ze(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}ug(b,true,c,null,f);break;case "together":ug(b,false,null,null,void 0);break;default:b.memoizedState=null;}return b.child}
	function Zf(a,b,c){null!==a&&(b.dependencies=a.dependencies);vd|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(n(153));if(null!==b.child){a=b.child;c=je(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=je(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}
	function wg(a,b,c){switch(b.tag){case 3:ig(b);de();break;case 5:xe(b);break;case 1:C(b.type)&&nc(b);break;case 4:ve(b,b.stateNode.containerInfo);break;case 10:gd(b,b.type._context,b.memoizedProps.value);break;case 13:var d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return y(J,J.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return mg(a,b,c);y(J,J.current&1);a=Zf(a,b,c);return null!==a?a.sibling:null}y(J,J.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return vg(a,
	b,c);b.flags|=128;}var e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);y(J,J.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dg(a,b,c)}return Zf(a,b,c)}
	function xg(a,b){Sd(b);switch(b.tag){case 1:return C(b.type)&&kc(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return we(),x(B),x(A),Be(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return ye(b),null;case 13:x(J);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(n(340));de();}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return x(J),null;case 4:return we(),null;case 10:return hd(b.type._context),null;case 22:case 23:return Vf(),
	null;case 24:return null;default:return null}}var yg=false,zg=false,Ag="function"===typeof WeakSet?WeakSet:Set,S=null;function Bg(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null);}catch(d){T(a,b,d);}else c.current=null;}function Cg(a,b,c){try{c();}catch(d){T(a,b,d);}}var Dg=false;
	function Eg(a,b){Ia(a.containerInfo);for(S=b;null!==S;)if(a=S,b=a.child,0!==(a.subtreeFlags&1028)&&null!==b)b.return=a,S=b;else for(;null!==S;){a=S;try{var c=a.alternate;if(0!==(a.flags&1024))switch(a.tag){case 0:case 11:case 15:break;case 1:if(null!==c){var d=c.memoizedProps,e=c.memoizedState,f=a.stateNode,g=f.getSnapshotBeforeUpdate(a.elementType===a.type?d:ad(a.type,d),e);f.__reactInternalSnapshotBeforeUpdate=g;}break;case 3:Ua&&xb(a.stateNode.containerInfo);break;case 5:case 6:case 4:case 17:break;
	default:throw Error(n(163));}}catch(h){T(a,a.return,h);}b=a.sibling;if(null!==b){b.return=a.return;S=b;break}S=a.return;}c=Dg;Dg=false;return c}function Fg(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Cg(b,c,f);}e=e.next;}while(e!==d)}}function Gg(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d();}c=c.next;}while(c!==b)}}
	function Hg(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=Fa(c);break;default:a=c;}"function"===typeof b?b(a):b.current=a;}}
	function Ig(a,b,c){if(Oc&&"function"===typeof Oc.onCommitFiberUnmount)try{Oc.onCommitFiberUnmount(Nc,b);}catch(g){}switch(b.tag){case 0:case 11:case 14:case 15:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var d=a=a.next;do{var e=d,f=e.destroy;e=e.tag;void 0!==f&&(0!==(e&2)?Cg(b,c,f):0!==(e&4)&&Cg(b,c,f));d=d.next;}while(d!==a)}break;case 1:Bg(b,c);a=b.stateNode;if("function"===typeof a.componentWillUnmount)try{a.props=b.memoizedProps,a.state=b.memoizedState,a.componentWillUnmount();}catch(g){T(b,
	c,g);}break;case 5:Bg(b,c);break;case 4:Ua?Jg(a,b,c):Va&&Va&&(b=b.stateNode.containerInfo,c=zb(b),Cb(b,c));}}function Kg(a,b,c){for(var d=b;;)if(Ig(a,d,c),null===d.child||Ua&&4===d.tag){if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;}d.sibling.return=d.return;d=d.sibling;}else d.child.return=d,d=d.child;}
	function Lg(a){var b=a.alternate;null!==b&&(a.alternate=null,Lg(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&Za(b));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null;}function Mg(a){return 5===a.tag||3===a.tag||4===a.tag}
	function Ng(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Mg(a.return))return null;a=a.return;}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child;}if(!(a.flags&2))return a.stateNode}}
	function Og(a){if(Ua){a:{for(var b=a.return;null!==b;){if(Mg(b))break a;b=b.return;}throw Error(n(160));}var c=b;switch(c.tag){case 5:b=c.stateNode;c.flags&32&&(sb(b),c.flags&=-33);c=Ng(a);Pg(a,c,b);break;case 3:case 4:b=c.stateNode.containerInfo;c=Ng(a);Qg(a,c,b);break;default:throw Error(n(161));}}}function Qg(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?pb(c,a,b):kb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Qg(a,b,c),a=a.sibling;null!==a;)Qg(a,b,c),a=a.sibling;}
	function Pg(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?ob(c,a,b):jb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Pg(a,b,c),a=a.sibling;null!==a;)Pg(a,b,c),a=a.sibling;}
	function Jg(a,b,c){for(var d=b,e=false,f,g;;){if(!e){e=d.return;a:for(;;){if(null===e)throw Error(n(160));f=e.stateNode;switch(e.tag){case 5:g=false;break a;case 3:f=f.containerInfo;g=true;break a;case 4:f=f.containerInfo;g=true;break a}e=e.return;}e=true;}if(5===d.tag||6===d.tag)Kg(a,d,c),g?rb(f,d.stateNode):qb(f,d.stateNode);else if(18===d.tag)g?Wb(f,d.stateNode):Vb(f,d.stateNode);else if(4===d.tag){if(null!==d.child){f=d.stateNode.containerInfo;g=true;d.child.return=d;d=d.child;continue}}else if(Ig(a,d,c),null!==
	d.child){d.child.return=d;d=d.child;continue}if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;4===d.tag&&(e=false);}d.sibling.return=d.return;d=d.sibling;}}
	function Rg(a,b){if(Ua){switch(b.tag){case 0:case 11:case 14:case 15:Fg(3,b,b.return);Gg(3,b);Fg(5,b,b.return);return;case 1:return;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&nb(c,f,e,a,d,b);}return;case 6:if(null===b.stateNode)throw Error(n(162));c=b.memoizedProps;lb(b.stateNode,null!==a?a.memoizedProps:c,c);return;case 3:p&&null!==a&&a.memoizedState.isDehydrated&&Tb(b.stateNode.containerInfo);return;
	case 12:return;case 13:Sg(b);return;case 19:Sg(b);return;case 17:return}throw Error(n(163));}switch(b.tag){case 0:case 11:case 14:case 15:Fg(3,b,b.return);Gg(3,b);Fg(5,b,b.return);return;case 12:return;case 13:Sg(b);return;case 19:Sg(b);return;case 3:p&&null!==a&&a.memoizedState.isDehydrated&&Tb(b.stateNode.containerInfo);break;case 22:case 23:return}a:if(Va){switch(b.tag){case 1:case 5:case 6:break a;case 3:case 4:b=b.stateNode;Cb(b.containerInfo,b.pendingChildren);break a}throw Error(n(163));}}
	function Sg(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ag);b.forEach(function(b){var d=Tg.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
	function Ug(a,b){for(S=b;null!==S;){b=S;var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a;Ua?Jg(f,e,b):Kg(f,e,b);var g=e.alternate;null!==g&&(g.return=null);e.return=null;}catch(wa){T(e,b,wa);}}c=b.child;if(0!==(b.subtreeFlags&12854)&&null!==c)c.return=b,S=c;else for(;null!==S;){b=S;try{var h=b.flags;h&32&&Ua&&sb(b.stateNode);if(h&512){var k=b.alternate;if(null!==k){var l=k.ref;null!==l&&("function"===typeof l?l(null):l.current=null);}}if(h&8192)switch(b.tag){case 13:if(null!==
	b.memoizedState){var m=b.alternate;if(null===m||null===m.memoizedState)Vg=E();}break;case 22:var v=null!==b.memoizedState,r=b.alternate,z=null!==r&&null!==r.memoizedState;c=b;if(Ua)a:if(d=c,e=v,f=null,Ua)for(var q=d;;){if(5===q.tag){if(null===f){f=q;var N=q.stateNode;e?tb(N):vb(q.stateNode,q.memoizedProps);}}else if(6===q.tag){if(null===f){var da=q.stateNode;e?ub(da):wb(da,q.memoizedProps);}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===d)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===
	d)break;for(;null===q.sibling;){if(null===q.return||q.return===d)break a;f===q&&(f=null);q=q.return;}f===q&&(f=null);q.sibling.return=q.return;q=q.sibling;}if(v&&!z&&0!==(c.mode&1)){S=c;for(var t=c.child;null!==t;){for(c=S=t;null!==S;){d=S;var w=d.child;switch(d.tag){case 0:case 11:case 14:case 15:Fg(4,d,d.return);break;case 1:Bg(d,d.return);var u=d.stateNode;if("function"===typeof u.componentWillUnmount){var V=d.return;try{u.props=d.memoizedProps,u.state=d.memoizedState,u.componentWillUnmount();}catch(wa){T(d,
	V,wa);}}break;case 5:Bg(d,d.return);break;case 22:if(null!==d.memoizedState){Wg(c);continue}}null!==w?(w.return=d,S=w):Wg(c);}t=t.sibling;}}}switch(h&4102){case 2:Og(b);b.flags&=-3;break;case 6:Og(b);b.flags&=-3;Rg(b.alternate,b);break;case 4096:b.flags&=-4097;break;case 4100:b.flags&=-4097;Rg(b.alternate,b);break;case 4:Rg(b.alternate,b);}}catch(wa){T(b,b.return,wa);}c=b.sibling;if(null!==c){c.return=b.return;S=c;break}S=b.return;}}}function Xg(a,b,c){S=a;Yg(a);}
	function Yg(a,b,c){for(var d=0!==(a.mode&1);null!==S;){var e=S,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||yg;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||zg;h=yg;var l=zg;yg=g;if((zg=k)&&!l)for(S=e;null!==S;)g=S,k=g.child,22===g.tag&&null!==g.memoizedState?Zg(e):null!==k?(k.return=g,S=k):Zg(e);for(;null!==f;)S=f,Yg(f),f=f.sibling;S=e;yg=h;zg=l;}$g(a);}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,S=f):$g(a);}}
	function $g(a){for(;null!==S;){var b=S;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:zg||Gg(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!zg)if(null===c)d.componentDidMount();else {var e=b.elementType===b.type?c.memoizedProps:ad(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate);}var f=b.updateQueue;null!==f&&wd(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
	Fa(b.child.stateNode);break;case 1:c=b.child.stateNode;}wd(b,g,c);}break;case 5:var h=b.stateNode;null===c&&b.flags&4&&mb(h,b.type,b.memoizedProps,b);break;case 6:break;case 4:break;case 12:break;case 13:if(p&&null===b.memoizedState){var k=b.alternate;if(null!==k){var l=k.memoizedState;if(null!==l){var m=l.dehydrated;null!==m&&Ub(m);}}}break;case 19:case 17:case 21:case 22:case 23:break;default:throw Error(n(163));}zg||b.flags&512&&Hg(b);}catch(v){T(b,b.return,v);}}if(b===a){S=null;break}c=b.sibling;if(null!==
	c){c.return=b.return;S=c;break}S=b.return;}}function Wg(a){for(;null!==S;){var b=S;if(b===a){S=null;break}var c=b.sibling;if(null!==c){c.return=b.return;S=c;break}S=b.return;}}
	function Zg(a){for(;null!==S;){var b=S;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Gg(4,b);}catch(k){T(b,c,k);}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount();}catch(k){T(b,e,k);}}var f=b.return;try{Hg(b);}catch(k){T(b,f,k);}break;case 5:var g=b.return;try{Hg(b);}catch(k){T(b,g,k);}}}catch(k){T(b,b.return,k);}if(b===a){S=null;break}var h=b.sibling;if(null!==h){h.return=b.return;S=h;break}S=b.return;}}
	var ah=0,bh=1,ch=2,dh=3,eh=4;if("function"===typeof Symbol&&Symbol.for){var fh=Symbol.for;ah=fh("selector.component");bh=fh("selector.has_pseudo_class");ch=fh("selector.role");dh=fh("selector.test_id");eh=fh("selector.text");}function gh(a){var b=Wa(a);if(null!=b){if("string"!==typeof b.memoizedProps["data-testname"])throw Error(n(364));return b}a=cb(a);if(null===a)throw Error(n(362));return a.stateNode.current}
	function hh(a,b){switch(b.$$typeof){case ah:if(a.type===b.value)return  true;break;case bh:a:{b=b.value;a=[a,0];for(var c=0;c<a.length;){var d=a[c++],e=a[c++],f=b[e];if(5!==d.tag||!fb(d)){for(;null!=f&&hh(d,f);)e++,f=b[e];if(e===b.length){b=true;break a}else for(d=d.child;null!==d;)a.push(d,e),d=d.sibling;}}b=false;}return b;case ch:if(5===a.tag&&gb(a.stateNode,b.value))return  true;break;case eh:if(5===a.tag||6===a.tag)if(a=eb(a),null!==a&&0<=a.indexOf(b.value))return  true;break;case dh:if(5===a.tag&&(a=a.memoizedProps["data-testname"],
	"string"===typeof a&&a.toLowerCase()===b.value.toLowerCase()))return  true;break;default:throw Error(n(365));}return  false}function ih(a){switch(a.$$typeof){case ah:return "<"+(va(a.value)||"Unknown")+">";case bh:return ":has("+(ih(a)||"")+")";case ch:return '[role="'+a.value+'"]';case eh:return '"'+a.value+'"';case dh:return '[data-testname="'+a.value+'"]';default:throw Error(n(365));}}
	function jh(a,b){var c=[];a=[a,0];for(var d=0;d<a.length;){var e=a[d++],f=a[d++],g=b[f];if(5!==e.tag||!fb(e)){for(;null!=g&&hh(e,g);)f++,g=b[f];if(f===b.length)c.push(e);else for(e=e.child;null!==e;)a.push(e,f),e=e.sibling;}}return c}function kh(a,b){if(!bb)throw Error(n(363));a=gh(a);a=jh(a,b);b=[];a=Array.from(a);for(var c=0;c<a.length;){var d=a[c++];if(5===d.tag)fb(d)||b.push(d.stateNode);else for(d=d.child;null!==d;)a.push(d),d=d.sibling;}return b}
	var lh=Math.ceil,mh=ea.ReactCurrentDispatcher,nh=ea.ReactCurrentOwner,U=ea.ReactCurrentBatchConfig,G=0,F=null,W=null,X=0,Wf=0,eg=gc(0),Q=0,oh=null,vd=0,ph=0,qh=0,rh=null,Y=null,Vg=0,Uf=Infinity;function sh(){Uf=E()+500;}var Bf=false,Cf=null,Ef=null,th=false,uh=null,vh=0,wh=0,xh=null,yh=-1,zh=0;function H(){return 0!==(G&6)?E():-1!==yh?yh:yh=E()}
	function zd(a){if(0===(a.mode&1))return 1;if(0!==(G&2)&&0!==X)return X&-X;if(null!==Yc.transition)return 0===zh&&(a=tc,tc<<=1,0===(tc&4194240)&&(tc=64),zh=a),zh;a=D;return 0!==a?a:Ya()}function Ad(a,b,c){if(50<wh)throw wh=0,xh=null,Error(n(185));var d=Ah(a,b);if(null===d)return null;Bc(d,b,c);if(0===(G&2)||d!==F)d===F&&(0===(G&2)&&(ph|=b),4===Q&&Bh(d,X)),Z(d,c),1===b&&0===G&&0===(a.mode&1)&&(sh(),Tc&&Xc());return d}
	function Ah(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}
	function Z(a,b){var c=a.callbackNode;yc(a,b);var d=wc(a,a===F?X:0);if(0===d)null!==c&&Gc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Gc(c);if(1===b)0===a.tag?Wc(Ch.bind(null,a)):Vc(Ch.bind(null,a)),$a?ab(function(){0===G&&Xc();}):Fc(Jc,Xc),c=null;else {switch(Ec(d)){case 1:c=Jc;break;case 4:c=Kc;break;case 16:c=Lc;break;case 536870912:c=Mc;break;default:c=Lc;}c=Dh(c,Eh.bind(null,a));}a.callbackPriority=b;a.callbackNode=c;}}
	function Eh(a,b){yh=-1;zh=0;if(0!==(G&6))throw Error(n(327));var c=a.callbackNode;if(Fh()&&a.callbackNode!==c)return null;var d=wc(a,a===F?X:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Gh(a,d);else {b=d;var e=G;G|=2;var f=Hh();if(F!==a||X!==b)sh(),Ih(a,b);do try{Jh();break}catch(h){Kh(a,h);}while(1);fd();mh.current=f;G=e;null!==W?b=0:(F=null,X=0,b=Q);}if(0!==b){2===b&&(e=zc(a),0!==e&&(d=e,b=Lh(a,e)));if(1===b)throw c=oh,Ih(a,0),Bh(a,d),Z(a,E()),c;if(6===b)Bh(a,d);else {e=a.current.alternate;
	if(0===(d&30)&&!Mh(e)&&(b=Gh(a,d),2===b&&(f=zc(a),0!==f&&(d=f,b=Lh(a,f))),1===b))throw c=oh,Ih(a,0),Bh(a,d),Z(a,E()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(n(345));case 2:Nh(a,Y);break;case 3:Bh(a,d);if((d&130023424)===d&&(b=Vg+500-E(),10<b)){if(0!==wc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){H();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Qa(Nh.bind(null,a,Y),b);break}Nh(a,Y);break;case 4:Bh(a,d);if((d&4194240)===d)break;b=a.eventTimes;for(e=-1;0<
	d;){var g=31-qc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f;}d=e;d=E()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lh(d/1960))-d;if(10<d){a.timeoutHandle=Qa(Nh.bind(null,a,Y),d);break}Nh(a,Y);break;case 5:Nh(a,Y);break;default:throw Error(n(329));}}}Z(a,E());return a.callbackNode===c?Eh.bind(null,a):null}function Lh(a,b){var c=rh;a.current.memoizedState.isDehydrated&&(Ih(a,b).flags|=256);a=Gh(a,b);2!==a&&(b=Y,Y=c,null!==b&&Sf(b));return a}
	function Sf(a){null===Y?Y=a:Y.push.apply(Y,a);}function Mh(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!Rc(f(),e))return !1}catch(g){return  false}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else {if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return  true;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return  true}
	function Bh(a,b){b&=~qh;b&=~ph;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-qc(b),d=1<<c;a[c]=-1;b&=~d;}}function Ch(a){if(0!==(G&6))throw Error(n(327));Fh();var b=wc(a,0);if(0===(b&1))return Z(a,E()),null;var c=Gh(a,b);if(0!==a.tag&&2===c){var d=zc(a);0!==d&&(b=d,c=Lh(a,d));}if(1===c)throw c=oh,Ih(a,0),Bh(a,b),Z(a,E()),c;if(6===c)throw Error(n(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Nh(a,Y);Z(a,E());return null}
	function Oh(a){null!==uh&&0===uh.tag&&0===(G&6)&&Fh();var b=G;G|=1;var c=U.transition,d=D;try{if(U.transition=null,D=1,a)return a()}finally{D=d,U.transition=c,G=b,0===(G&6)&&Xc();}}function Vf(){Wf=eg.current;x(eg);}
	function Ih(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;c!==Sa&&(a.timeoutHandle=Sa,Ra(c));if(null!==W)for(c=W.return;null!==c;){var d=c;Sd(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&kc();break;case 3:we();x(B);x(A);Be();break;case 5:ye(d);break;case 4:we();break;case 13:x(J);break;case 19:x(J);break;case 10:hd(d.type._context);break;case 22:case 23:Vf();}c=c.return;}F=a;W=a=je(a.current,null);X=Wf=b;Q=0;oh=null;qh=ph=vd=0;Y=rh=null;if(null!==md){for(b=
	0;b<md.length;b++)if(c=md[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g;}c.pending=d;}md=null;}return a}
	function Kh(a,b){do{var c=W;try{fd();Ce.current=Oe;if(Fe){for(var d=K.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}Fe=!1;}Ee=0;M=L=K=null;Ge=!1;He=0;nh.current=null;if(null===c||null===c.return){Q=1;oh=b;W=null;break}a:{var f=a,g=c.return,h=c,k=b;b=X;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,v=m.tag;if(0===(m.mode&1)&&(0===v||11===v||15===v)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
	m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null);}var z=Hf(g);if(null!==z){z.flags&=-257;If(z,g,h,f,b);z.mode&1&&Ff(f,l,b);b=z;k=l;var q=b.updateQueue;if(null===q){var N=new Set;N.add(k);b.updateQueue=N;}else q.add(k);break a}else {if(0===(b&1)){Ff(f,l,b);Tf();break a}k=Error(n(426));}}else if(I&&h.mode&1){var da=Hf(g);if(null!==da){0===(da.flags&65536)&&(da.flags|=256);If(da,g,h,f,b);ee(k);break a}}f=k;4!==Q&&(Q=2);null===rh?rh=[f]:rh.push(f);k=xf(k,h);h=g;do{switch(h.tag){case 3:h.flags|=
	65536;b&=-b;h.lanes|=b;var t=Af(h,k,b);td(h,t);break a;case 1:f=k;var w=h.type,u=h.stateNode;if(0===(h.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ef||!Ef.has(u)))){h.flags|=65536;b&=-b;h.lanes|=b;var V=Df(h,f,b);td(h,V);break a}}h=h.return;}while(null!==h)}Ph(c);}catch(wa){b=wa;W===c&&null!==c&&(W=c=c.return);continue}break}while(1)}function Hh(){var a=mh.current;mh.current=Oe;return null===a?Oe:a}
	function Tf(){if(0===Q||3===Q||2===Q)Q=4;null===F||0===(vd&268435455)&&0===(ph&268435455)||Bh(F,X);}function Gh(a,b){var c=G;G|=2;var d=Hh();F===a&&X===b||Ih(a,b);do try{Qh();break}catch(e){Kh(a,e);}while(1);fd();G=c;mh.current=d;if(null!==W)throw Error(n(261));F=null;X=0;return Q}function Qh(){for(;null!==W;)Rh(W);}function Jh(){for(;null!==W&&!Hc();)Rh(W);}function Rh(a){var b=Sh(a.alternate,a,Wf);a.memoizedProps=a.pendingProps;null===b?Ph(a):W=b;nh.current=null;}
	function Ph(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Rf(c,b,Wf),null!==c){W=c;return}}else {c=xg(c,b);if(null!==c){c.flags&=32767;W=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else {Q=6;W=null;return}}b=b.sibling;if(null!==b){W=b;return}W=b=a;}while(null!==b);0===Q&&(Q=5);}function Nh(a,b){var c=D,d=U.transition;try{U.transition=null,D=1,Th(a,b,c);}finally{U.transition=d,D=c;}return null}
	function Th(a,b,c){do Fh();while(null!==uh);if(0!==(G&6))throw Error(n(327));var d=a.finishedWork,e=a.finishedLanes;if(null===d)return null;a.finishedWork=null;a.finishedLanes=0;if(d===a.current)throw Error(n(177));a.callbackNode=null;a.callbackPriority=0;var f=d.lanes|d.childLanes;Cc(a,f);a===F&&(W=F=null,X=0);0===(d.subtreeFlags&2064)&&0===(d.flags&2064)||th||(th=true,Dh(Lc,function(){Fh();return null}));f=0!==(d.flags&15990);if(0!==(d.subtreeFlags&15990)||f){f=U.transition;U.transition=null;var g=
	D;D=1;var h=G;G|=4;nh.current=null;Eg(a,d);Ug(a,d);Ja(a.containerInfo);a.current=d;Xg(d);Ic();G=h;D=g;U.transition=f;}else a.current=d;th&&(th=false,uh=a,vh=e);f=a.pendingLanes;0===f&&(Ef=null);Pc(d.stateNode);Z(a,E());if(null!==b)for(c=a.onRecoverableError,d=0;d<b.length;d++)c(b[d]);if(Bf)throw Bf=false,a=Cf,Cf=null,a;0!==(vh&1)&&0!==a.tag&&Fh();f=a.pendingLanes;0!==(f&1)?a===xh?wh++:(wh=0,xh=a):wh=0;Xc();return null}
	function Fh(){if(null!==uh){var a=Ec(vh),b=U.transition,c=D;try{U.transition=null;D=16>a?16:a;if(null===uh)var d=!1;else {a=uh;uh=null;vh=0;if(0!==(G&6))throw Error(n(331));var e=G;G|=4;for(S=a.current;null!==S;){var f=S,g=f.child;if(0!==(S.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(S=l;null!==S;){var m=S;switch(m.tag){case 0:case 11:case 15:Fg(8,m,f);}var v=m.child;if(null!==v)v.return=m,S=v;else for(;null!==S;){m=S;var r=m.sibling,z=m.return;Lg(m);if(m===
	l){S=null;break}if(null!==r){r.return=z;S=r;break}S=z;}}}var q=f.alternate;if(null!==q){var N=q.child;if(null!==N){q.child=null;do{var da=N.sibling;N.sibling=null;N=da;}while(null!==N)}}S=f;}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,S=g;else b:for(;null!==S;){f=S;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Fg(9,f,f.return);}var t=f.sibling;if(null!==t){t.return=f.return;S=t;break b}S=f.return;}}var w=a.current;for(S=w;null!==S;){g=S;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
	u)u.return=g,S=u;else b:for(g=w;null!==S;){h=S;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Gg(9,h);}}catch(wa){T(h,h.return,wa);}if(h===g){S=null;break b}var V=h.sibling;if(null!==V){V.return=h.return;S=V;break b}S=h.return;}}G=e;Xc();if(Oc&&"function"===typeof Oc.onPostCommitFiberRoot)try{Oc.onPostCommitFiberRoot(Nc,a);}catch(wa){}d=!0;}return d}finally{D=c,U.transition=b;}}return  false}function Uh(a,b,c){b=xf(c,b);b=Af(a,b,1);rd(a,b);b=H();a=Ah(a,1);null!==a&&(Bc(a,1,b),Z(a,b));}
	function T(a,b,c){if(3===a.tag)Uh(a,a,c);else for(;null!==b;){if(3===b.tag){Uh(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ef||!Ef.has(d))){a=xf(c,a);a=Df(b,a,1);rd(b,a);a=H();b=Ah(b,1);null!==b&&(Bc(b,1,a),Z(b,a));break}}b=b.return;}}
	function Gf(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=H();a.pingedLanes|=a.suspendedLanes&c;F===a&&(X&c)===c&&(4===Q||3===Q&&(X&130023424)===X&&500>E()-Vg?Ih(a,0):qh|=c);Z(a,b);}function Vh(a,b){0===b&&(0===(a.mode&1)?b=1:(b=uc,uc<<=1,0===(uc&130023424)&&(uc=4194304)));var c=H();a=Ah(a,b);null!==a&&(Bc(a,b,c),Z(a,c));}function qg(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Vh(a,c);}
	function Tg(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(n(314));}null!==d&&d.delete(b);Vh(a,c);}var Sh;
	Sh=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||B.current)kd=true;else {if(0===(a.lanes&c)&&0===(b.flags&128))return kd=false,wg(a,b,c);kd=0!==(a.flags&131072)?true:false;}else kd=false,I&&0!==(b.flags&1048576)&&Qd(b,Jd,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;var e=jc(b,A.current);jd(b,c);e=Ke(null,b,d,a,e,c);var f=Pe();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?
	(b.tag=1,b.memoizedState=null,b.updateQueue=null,C(d)?(f=true,nc(b)):f=false,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,od(b),e.updater=Bd,b.stateNode=e,e._reactInternals=b,Fd(b,d,a,c),b=hg(null,b,d,true,f,c)):(b.tag=0,I&&f&&Rd(b),R(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Wh(d);a=ad(d,a);switch(e){case 0:b=cg(null,b,d,a,c);break a;case 1:b=gg(null,b,d,
	a,c);break a;case 11:b=Yf(null,b,d,a,c);break a;case 14:b=$f(null,b,d,ad(d.type,a),c);break a}throw Error(n(306,d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ad(d,e),cg(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ad(d,e),gg(a,b,d,e,c);case 3:a:{ig(b);if(null===a)throw Error(n(387));d=b.pendingProps;f=b.memoizedState;e=f.element;pd(a,b);ud(b,d,null,c);var g=b.memoizedState;d=g.element;if(p&&f.isDehydrated)if(f={element:d,isDehydrated:false,
	cache:g.cache,transitions:g.transitions},b.updateQueue.baseState=f,b.memoizedState=f,b.flags&256){e=Error(n(423));b=jg(a,b,d,c,e);break a}else if(d!==e){e=Error(n(424));b=jg(a,b,d,c,e);break a}else for(p&&(Ud=Nb(b.stateNode.containerInfo),Td=b,I=true,Wd=null,Vd=false),c=pe(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else {de();if(d===e){b=Zf(a,b,c);break a}R(a,b,d,c);}b=b.child;}return b;case 5:return xe(b),null===a&&ae(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,
	Oa(d,e)?g=null:null!==f&&Oa(d,f)&&(b.flags|=32),fg(a,b),R(a,b,g,c),b.child;case 6:return null===a&&ae(b),null;case 13:return mg(a,b,c);case 4:return ve(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=oe(b,null,d,c):R(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ad(d,e),Yf(a,b,d,e,c);case 7:return R(a,b,b.pendingProps,c),b.child;case 8:return R(a,b,b.pendingProps.children,c),b.child;case 12:return R(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=
	b.type._context;e=b.pendingProps;f=b.memoizedProps;g=e.value;gd(b,d,g);if(null!==f)if(Rc(f.value,g)){if(f.children===e.children&&!B.current){b=Zf(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=qd(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k;}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=
	c);id(f.return,c,b);h.lanes|=c;break}k=k.next;}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(n(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);id(g,c,b);g=f.sibling;}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return;}f=g;}R(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,d=b.pendingProps.children,jd(b,c),e=ld(e),d=d(e),b.flags|=
	1,R(a,b,d,c),b.child;case 14:return d=b.type,e=ad(d,b.pendingProps),e=ad(d.type,e),$f(a,b,d,e,c);case 15:return bg(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:ad(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2),b.tag=1,C(d)?(a=true,nc(b)):a=false,jd(b,c),Dd(b,d,e),Fd(b,d,e,c),hg(null,b,d,true,a,c);case 19:return vg(a,b,c);case 22:return dg(a,b,c)}throw Error(n(156,b.tag));};function Dh(a,b){return Fc(a,b)}
	function Xh(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null;}function Yd(a,b,c,d){return new Xh(a,b,c,d)}function ag(a){a=a.prototype;return !(!a||!a.isReactComponent)}
	function Wh(a){if("function"===typeof a)return ag(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===na)return 11;if(a===qa)return 14}return 2}
	function je(a,b){var c=a.alternate;null===c?(c=Yd(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
	c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
	function le(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)ag(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ia:return ne(c.children,e,f,b);case ja:g=8;e|=8;break;case ka:return a=Yd(12,c,b,e|2),a.elementType=ka,a.lanes=f,a;case oa:return a=Yd(13,c,b,e),a.elementType=oa,a.lanes=f,a;case pa:return a=Yd(19,c,b,e),a.elementType=pa,a.lanes=f,a;case sa:return ng(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case la:g=10;break a;case ma:g=9;break a;case na:g=11;
	break a;case qa:g=14;break a;case ra:g=16;d=null;break a}throw Error(n(130,null==a?a:typeof a,""));}b=Yd(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function ne(a,b,c,d){a=Yd(7,a,d,b);a.lanes=c;return a}function ng(a,b,c,d){a=Yd(22,a,d,b);a.elementType=sa;a.lanes=c;a.stateNode={};return a}function ke(a,b,c){a=Yd(6,a,null,b);a.lanes=c;return a}
	function me(a,b,c){b=Yd(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function Yh(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=Sa;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=Ac(0);this.expirationTimes=Ac(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Ac(0);this.identifierPrefix=d;this.onRecoverableError=e;p&&(this.mutableSourceEagerHydrationData=
	null);}function Zh(a,b,c,d,e,f,g,h,k){a=new Yh(a,b,c,h,k);1===b?(b=1,true===f&&(b|=8)):b=0;f=Yd(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null};od(f);return a}
	function $h(a){if(!a)return hc;a=a._reactInternals;a:{if(ya(a)!==a||1!==a.tag)throw Error(n(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(C(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return;}while(null!==b);throw Error(n(171));}if(1===a.tag){var c=a.type;if(C(c))return mc(a,c,b)}return b}
	function ai(a){var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(n(188));a=Object.keys(a).join(",");throw Error(n(268,a));}a=Ba(b);return null===a?null:a.stateNode}function bi(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function ci(a,b){bi(a,b);(a=a.alternate)&&bi(a,b);}function di(a){a=Ba(a);return null===a?null:a.stateNode}function ei(){return null}
	exports.attemptContinuousHydration=function(a){if(13===a.tag){var b=H();Ad(a,134217728,b);ci(a,134217728);}};exports.attemptHydrationAtCurrentPriority=function(a){if(13===a.tag){var b=H(),c=zd(a);Ad(a,c,b);ci(a,c);}};exports.attemptSynchronousHydration=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=vc(b.pendingLanes);0!==c&&(Dc(b,c|1),Z(b,E()),0===(G&6)&&(sh(),Xc()));}break;case 13:var d=H();Oh(function(){return Ad(a,1,d)});ci(a,1);}};
	exports.batchedUpdates=function(a,b){var c=G;G|=1;try{return a(b)}finally{G=c,0===G&&(sh(),Tc&&Xc());}};exports.createComponentSelector=function(a){return {$$typeof:ah,value:a}};exports.createContainer=function(a,b,c,d,e,f,g){return Zh(a,b,false,null,c,d,e,f,g)};exports.createHasPseudoClassSelector=function(a){return {$$typeof:bh,value:a}};
	exports.createHydrationContainer=function(a,b,c,d,e,f,g,h,k){a=Zh(c,d,true,a,e,f,g,h,k);a.context=$h(null);c=a.current;d=H();e=zd(c);f=qd(d,e);f.callback=void 0!==b&&null!==b?b:null;rd(c,f);a.current.lanes=e;Bc(a,e,d);Z(a,d);return a};exports.createPortal=function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:ha,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}};exports.createRoleSelector=function(a){return {$$typeof:ch,value:a}};
	exports.createTestNameSelector=function(a){return {$$typeof:dh,value:a}};exports.createTextSelector=function(a){return {$$typeof:eh,value:a}};exports.deferredUpdates=function(a){var b=D,c=U.transition;try{return U.transition=null,D=16,a()}finally{D=b,U.transition=c;}};exports.discreteUpdates=function(a,b,c,d,e){var f=D,g=U.transition;try{return U.transition=null,D=1,a(b,c,d,e)}finally{D=f,U.transition=g,0===G&&sh();}};exports.findAllNodes=kh;
	exports.findBoundingRects=function(a,b){if(!bb)throw Error(n(363));b=kh(a,b);a=[];for(var c=0;c<b.length;c++)a.push(db(b[c]));for(b=a.length-1;0<b;b--){c=a[b];for(var d=c.x,e=d+c.width,f=c.y,g=f+c.height,h=b-1;0<=h;h--)if(b!==h){var k=a[h],l=k.x,m=l+k.width,v=k.y,r=v+k.height;if(d>=l&&f>=v&&e<=m&&g<=r){a.splice(b,1);break}else if(!(d!==l||c.width!==k.width||r<f||v>g)){v>f&&(k.height+=v-f,k.y=f);r<g&&(k.height=g-v);a.splice(b,1);break}else if(!(f!==v||c.height!==k.height||m<d||l>e)){l>d&&(k.width+=
	l-d,k.x=d);m<e&&(k.width=e-l);a.splice(b,1);break}}}return a};exports.findHostInstance=ai;exports.findHostInstanceWithNoPortals=function(a){a=Aa(a);a=null!==a?Da(a):null;return null===a?null:a.stateNode};exports.findHostInstanceWithWarning=function(a){return ai(a)};exports.flushControlled=function(a){var b=G;G|=1;var c=U.transition,d=D;try{U.transition=null,D=1,a();}finally{D=d,U.transition=c,G=b,0===G&&(sh(),Xc());}};exports.flushPassiveEffects=Fh;exports.flushSync=Oh;
	exports.focusWithin=function(a,b){if(!bb)throw Error(n(363));a=gh(a);b=jh(a,b);b=Array.from(b);for(a=0;a<b.length;){var c=b[a++];if(!fb(c)){if(5===c.tag&&hb(c.stateNode))return  true;for(c=c.child;null!==c;)b.push(c),c=c.sibling;}}return  false};exports.getCurrentUpdatePriority=function(){return D};
	exports.getFindAllNodesFailureDescription=function(a,b){if(!bb)throw Error(n(363));var c=0,d=[];a=[gh(a),0];for(var e=0;e<a.length;){var f=a[e++],g=a[e++],h=b[g];if(5!==f.tag||!fb(f))if(hh(f,h)&&(d.push(ih(h)),g++,g>c&&(c=g)),g<b.length)for(f=f.child;null!==f;)a.push(f,g),f=f.sibling;}if(c<b.length){for(a=[];c<b.length;c++)a.push(ih(b[c]));return "findAllNodes was able to match part of the selector:\n  "+(d.join(" > ")+"\n\nNo matching component was found for:\n  ")+a.join(" > ")}return null};
	exports.getPublicRootInstance=function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return Fa(a.child.stateNode);default:return a.child.stateNode}};
	exports.injectIntoDevTools=function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ea.ReactCurrentDispatcher,findHostInstanceByFiber:di,findFiberByHostInstance:a.findFiberByHostInstance||
	ei,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.0.0-fc46dba67-20220329"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=false;else {var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=true;else {try{Nc=b.inject(a),Oc=b;}catch(c){}a=b.checkDCE?true:false;}}return a};exports.isAlreadyRendering=function(){return  false};
	exports.observeVisibleRects=function(a,b,c,d){if(!bb)throw Error(n(363));a=kh(a,b);var e=ib(a,c,d).disconnect;return {disconnect:function(){e();}}};exports.registerMutableSourceForHydration=function(a,b){var c=b._getVersion;c=c(b._source);null==a.mutableSourceEagerHydrationData?a.mutableSourceEagerHydrationData=[b,c]:a.mutableSourceEagerHydrationData.push(b,c);};exports.runWithPriority=function(a,b){var c=D;try{return D=a,b()}finally{D=c;}};exports.shouldError=function(){return null};
	exports.shouldSuspend=function(){return  false};exports.updateContainer=function(a,b,c,d){var e=b.current,f=H(),g=zd(e);c=$h(c);null===b.context?b.context=c:b.pendingContext=c;b=qd(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);rd(e,b);a=Ad(e,g,f);null!==a&&sd(a,e,g);return g};

	    return exports;
	};
	return reactReconciler_production_min;
}

var hasRequiredReactReconciler;

function requireReactReconciler () {
	if (hasRequiredReactReconciler) return reactReconciler.exports;
	hasRequiredReactReconciler = 1;
	{
	  reactReconciler.exports = requireReactReconciler_production_min();
	}
	return reactReconciler.exports;
}

var reactReconcilerExports = requireReactReconciler();
const Reconciler = /*@__PURE__*/getDefaultExportFromCjs(reactReconcilerExports);

var schedulerExports = requireScheduler();

const THREE$1 = await importShared('three');

const React$2 = await importShared('react');
var threeTypes = /* @__PURE__ */ Object.freeze({
  __proto__: null
});
const catalogue = {};
const extend = (objects) => void Object.assign(catalogue, objects);
function createRenderer(_roots, _getEventPriority) {
  function createInstance(type, {
    args = [],
    attach: attach2,
    ...props
  }, root) {
    let name = `${type[0].toUpperCase()}${type.slice(1)}`;
    let instance;
    if (type === "primitive") {
      if (props.object === void 0) throw new Error("R3F: Primitives without 'object' are invalid!");
      const object = props.object;
      instance = prepare(object, {
        type,
        root,
        attach: attach2,
        primitive: true
      });
    } else {
      const target = catalogue[name];
      if (!target) {
        throw new Error(`R3F: ${name} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
      }
      if (!Array.isArray(args)) throw new Error("R3F: The args prop must be an array!");
      instance = prepare(new target(...args), {
        type,
        root,
        attach: attach2,
        // Save args in case we need to reconstruct later for HMR
        memoizedProps: {
          args
        }
      });
    }
    if (instance.__r3f.attach === void 0) {
      if (instance.isBufferGeometry) instance.__r3f.attach = "geometry";
      else if (instance.isMaterial) instance.__r3f.attach = "material";
    }
    if (name !== "inject") applyProps$1(instance, props);
    return instance;
  }
  function appendChild(parentInstance, child) {
    let added = false;
    if (child) {
      var _child$__r3f, _parentInstance$__r3f;
      if ((_child$__r3f = child.__r3f) != null && _child$__r3f.attach) {
        attach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        parentInstance.add(child);
        added = true;
      }
      if (!added) (_parentInstance$__r3f = parentInstance.__r3f) == null ? void 0 : _parentInstance$__r3f.objects.push(child);
      if (!child.__r3f) prepare(child, {});
      child.__r3f.parent = parentInstance;
      updateInstance(child);
      invalidateInstance(child);
    }
  }
  function insertBefore(parentInstance, child, beforeChild) {
    let added = false;
    if (child) {
      var _child$__r3f2, _parentInstance$__r3f2;
      if ((_child$__r3f2 = child.__r3f) != null && _child$__r3f2.attach) {
        attach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        child.parent = parentInstance;
        child.dispatchEvent({
          type: "added"
        });
        parentInstance.dispatchEvent({
          type: "childadded",
          child
        });
        const restSiblings = parentInstance.children.filter((sibling) => sibling !== child);
        const index = restSiblings.indexOf(beforeChild);
        parentInstance.children = [...restSiblings.slice(0, index), child, ...restSiblings.slice(index)];
        added = true;
      }
      if (!added) (_parentInstance$__r3f2 = parentInstance.__r3f) == null ? void 0 : _parentInstance$__r3f2.objects.push(child);
      if (!child.__r3f) prepare(child, {});
      child.__r3f.parent = parentInstance;
      updateInstance(child);
      invalidateInstance(child);
    }
  }
  function removeRecursive(array, parent, dispose2 = false) {
    if (array) [...array].forEach((child) => removeChild(parent, child, dispose2));
  }
  function removeChild(parentInstance, child, dispose2) {
    if (child) {
      var _parentInstance$__r3f3, _child$__r3f3, _child$__r3f5;
      if (child.__r3f) child.__r3f.parent = null;
      if ((_parentInstance$__r3f3 = parentInstance.__r3f) != null && _parentInstance$__r3f3.objects) parentInstance.__r3f.objects = parentInstance.__r3f.objects.filter((x) => x !== child);
      if ((_child$__r3f3 = child.__r3f) != null && _child$__r3f3.attach) {
        detach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        var _child$__r3f4;
        parentInstance.remove(child);
        if ((_child$__r3f4 = child.__r3f) != null && _child$__r3f4.root) {
          removeInteractivity(findInitialRoot(child), child);
        }
      }
      const isPrimitive = (_child$__r3f5 = child.__r3f) == null ? void 0 : _child$__r3f5.primitive;
      const shouldDispose = !isPrimitive && (dispose2 === void 0 ? child.dispose !== null : dispose2);
      if (!isPrimitive) {
        var _child$__r3f6;
        removeRecursive((_child$__r3f6 = child.__r3f) == null ? void 0 : _child$__r3f6.objects, child, shouldDispose);
        removeRecursive(child.children, child, shouldDispose);
      }
      delete child.__r3f;
      if (shouldDispose && child.dispose && child.type !== "Scene") {
        const callback = () => {
          try {
            child.dispose();
          } catch (e) {
          }
        };
        if (typeof IS_REACT_ACT_ENVIRONMENT === "undefined") {
          schedulerExports.unstable_scheduleCallback(schedulerExports.unstable_IdlePriority, callback);
        } else {
          callback();
        }
      }
      invalidateInstance(parentInstance);
    }
  }
  function switchInstance(instance, type, newProps, fiber) {
    var _instance$__r3f;
    const parent = (_instance$__r3f = instance.__r3f) == null ? void 0 : _instance$__r3f.parent;
    if (!parent) return;
    const newInstance = createInstance(type, newProps, instance.__r3f.root);
    if (instance.children) {
      for (const child of instance.children) {
        if (child.__r3f) appendChild(newInstance, child);
      }
      instance.children = instance.children.filter((child) => !child.__r3f);
    }
    instance.__r3f.objects.forEach((child) => appendChild(newInstance, child));
    instance.__r3f.objects = [];
    if (!instance.__r3f.autoRemovedBeforeAppend) {
      removeChild(parent, instance);
    }
    if (newInstance.parent) {
      newInstance.__r3f.autoRemovedBeforeAppend = true;
    }
    appendChild(parent, newInstance);
    if (newInstance.raycast && newInstance.__r3f.eventCount) {
      const rootState = findInitialRoot(newInstance).getState();
      rootState.internal.interaction.push(newInstance);
    }
    [fiber, fiber.alternate].forEach((fiber2) => {
      if (fiber2 !== null) {
        fiber2.stateNode = newInstance;
        if (fiber2.ref) {
          if (typeof fiber2.ref === "function") fiber2.ref(newInstance);
          else fiber2.ref.current = newInstance;
        }
      }
    });
  }
  const handleTextInstance = () => {
  };
  const reconciler2 = Reconciler({
    createInstance,
    removeChild,
    appendChild,
    appendInitialChild: appendChild,
    insertBefore,
    supportsMutation: true,
    isPrimaryRenderer: false,
    supportsPersistence: false,
    supportsHydration: false,
    noTimeout: -1,
    appendChildToContainer: (container, child) => {
      if (!child) return;
      const scene = container.getState().scene;
      if (!scene.__r3f) return;
      scene.__r3f.root = container;
      appendChild(scene, child);
    },
    removeChildFromContainer: (container, child) => {
      if (!child) return;
      removeChild(container.getState().scene, child);
    },
    insertInContainerBefore: (container, child, beforeChild) => {
      if (!child || !beforeChild) return;
      const scene = container.getState().scene;
      if (!scene.__r3f) return;
      insertBefore(scene, child, beforeChild);
    },
    getRootHostContext: () => null,
    getChildHostContext: (parentHostContext) => parentHostContext,
    finalizeInitialChildren(instance) {
      var _instance$__r3f2;
      const localState = (_instance$__r3f2 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f2 : {};
      return Boolean(localState.handlers);
    },
    prepareUpdate(instance, _type, oldProps, newProps) {
      var _instance$__r3f3;
      const localState = (_instance$__r3f3 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f3 : {};
      if (localState.primitive && newProps.object && newProps.object !== instance) {
        return [true];
      } else {
        const {
          args: argsNew = [],
          children: cN,
          ...restNew
        } = newProps;
        const {
          args: argsOld = [],
          children: cO,
          ...restOld
        } = oldProps;
        if (!Array.isArray(argsNew)) throw new Error("R3F: the args prop must be an array!");
        if (argsNew.some((value, index) => value !== argsOld[index])) return [true];
        const diff = diffProps(instance, restNew, restOld, true);
        if (diff.changes.length) return [false, diff];
        return null;
      }
    },
    commitUpdate(instance, [reconstruct, diff], type, _oldProps, newProps, fiber) {
      if (reconstruct) switchInstance(instance, type, newProps, fiber);
      else applyProps$1(instance, diff);
    },
    commitMount(instance, _type, _props, _int) {
      var _instance$__r3f4;
      const localState = (_instance$__r3f4 = instance.__r3f) != null ? _instance$__r3f4 : {};
      if (instance.raycast && localState.handlers && localState.eventCount) {
        findInitialRoot(instance).getState().internal.interaction.push(instance);
      }
    },
    getPublicInstance: (instance) => instance,
    prepareForCommit: () => null,
    preparePortalMount: (container) => prepare(container.getState().scene),
    resetAfterCommit: () => {
    },
    shouldSetTextContent: () => false,
    clearContainer: () => false,
    hideInstance(instance) {
      var _instance$__r3f5;
      const {
        attach: type,
        parent
      } = (_instance$__r3f5 = instance.__r3f) != null ? _instance$__r3f5 : {};
      if (type && parent) detach(parent, instance, type);
      if (instance.isObject3D) instance.visible = false;
      invalidateInstance(instance);
    },
    unhideInstance(instance, props) {
      var _instance$__r3f6;
      const {
        attach: type,
        parent
      } = (_instance$__r3f6 = instance.__r3f) != null ? _instance$__r3f6 : {};
      if (type && parent) attach(parent, instance, type);
      if (instance.isObject3D && props.visible == null || props.visible) instance.visible = true;
      invalidateInstance(instance);
    },
    createTextInstance: handleTextInstance,
    hideTextInstance: handleTextInstance,
    unhideTextInstance: handleTextInstance,
    // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r916356874
    // @ts-expect-error
    getCurrentEventPriority: () => _getEventPriority ? _getEventPriority() : constantsExports.DefaultEventPriority,
    beforeActiveInstanceBlur: () => {
    },
    afterActiveInstanceBlur: () => {
    },
    detachDeletedInstance: () => {
    },
    now: typeof performance !== "undefined" && is.fun(performance.now) ? performance.now : is.fun(Date.now) ? Date.now : () => 0,
    // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r920883503
    scheduleTimeout: is.fun(setTimeout) ? setTimeout : void 0,
    cancelTimeout: is.fun(clearTimeout) ? clearTimeout : void 0
  });
  return {
    reconciler: reconciler2,
    applyProps: applyProps$1
  };
}
var _window$document, _window$navigator;
const hasColorSpace = (object) => "colorSpace" in object || "outputColorSpace" in object;
const getColorManagement = () => {
  var _ColorManagement;
  return (_ColorManagement = catalogue.ColorManagement) != null ? _ColorManagement : null;
};
const isOrthographicCamera = (def) => def && def.isOrthographicCamera;
const isRef = (obj) => obj && obj.hasOwnProperty("current");
const useIsomorphicLayoutEffect = typeof window !== "undefined" && ((_window$document = window.document) != null && _window$document.createElement || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative") ? React$2.useLayoutEffect : React$2.useEffect;
function useMutableCallback(fn) {
  const ref = React$2.useRef(fn);
  useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn]);
  return ref;
}
function Block({
  set
}) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null));
    return () => set(false);
  }, [set]);
  return null;
}
class ErrorBoundary extends React$2.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: false
    };
  }
  componentDidCatch(err) {
    this.props.set(err);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
ErrorBoundary.getDerivedStateFromError = () => ({
  error: true
});
const DEFAULT = "__default";
const DEFAULTS = /* @__PURE__ */ new Map();
const isDiffSet = (def) => def && !!def.memoized && !!def.changes;
function calculateDpr(dpr) {
  var _window$devicePixelRa;
  const target = typeof window !== "undefined" ? (_window$devicePixelRa = window.devicePixelRatio) != null ? _window$devicePixelRa : 2 : 1;
  return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], target), dpr[1]) : dpr;
}
const getRootState = (obj) => {
  var _r3f;
  return (_r3f = obj.__r3f) == null ? void 0 : _r3f.root.getState();
};
function findInitialRoot(child) {
  let root = child.__r3f.root;
  while (root.getState().previousRoot) root = root.getState().previousRoot;
  return root;
}
const is = {
  obj: (a) => a === Object(a) && !is.arr(a) && typeof a !== "function",
  fun: (a) => typeof a === "function",
  str: (a) => typeof a === "string",
  num: (a) => typeof a === "number",
  boo: (a) => typeof a === "boolean",
  und: (a) => a === void 0,
  arr: (a) => Array.isArray(a),
  equ(a, b, {
    arrays = "shallow",
    objects = "reference",
    strict = true
  } = {}) {
    if (typeof a !== typeof b || !!a !== !!b) return false;
    if (is.str(a) || is.num(a) || is.boo(a)) return a === b;
    const isObj = is.obj(a);
    if (isObj && objects === "reference") return a === b;
    const isArr = is.arr(a);
    if (isArr && arrays === "reference") return a === b;
    if ((isArr || isObj) && a === b) return true;
    let i2;
    for (i2 in a) if (!(i2 in b)) return false;
    if (isObj && arrays === "shallow" && objects === "shallow") {
      for (i2 in strict ? b : a) if (!is.equ(a[i2], b[i2], {
        strict,
        objects: "reference"
      })) return false;
    } else {
      for (i2 in strict ? b : a) if (a[i2] !== b[i2]) return false;
    }
    if (is.und(i2)) {
      if (isArr && a.length === 0 && b.length === 0) return true;
      if (isObj && Object.keys(a).length === 0 && Object.keys(b).length === 0) return true;
      if (a !== b) return false;
    }
    return true;
  }
};
function buildGraph(object) {
  const data = {
    nodes: {},
    materials: {}
  };
  if (object) {
    object.traverse((obj) => {
      if (obj.name) data.nodes[obj.name] = obj;
      if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material;
    });
  }
  return data;
}
function dispose(obj) {
  if (obj.dispose && obj.type !== "Scene") obj.dispose();
  for (const p in obj) {
    p.dispose == null ? void 0 : p.dispose();
    delete obj[p];
  }
}
function prepare(object, state) {
  const instance = object;
  instance.__r3f = {
    type: "",
    root: null,
    previousAttach: null,
    memoizedProps: {},
    eventCount: 0,
    handlers: {},
    objects: [],
    parent: null,
    ...state
  };
  return object;
}
function resolve(instance, key) {
  let target = instance;
  if (key.includes("-")) {
    const entries = key.split("-");
    const last = entries.pop();
    target = entries.reduce((acc, key2) => acc[key2], instance);
    return {
      target,
      key: last
    };
  } else return {
    target,
    key
  };
}
const INDEX_REGEX = /-\d+$/;
function attach(parent, child, type) {
  if (is.str(type)) {
    if (INDEX_REGEX.test(type)) {
      const root = type.replace(INDEX_REGEX, "");
      const {
        target: target2,
        key: key2
      } = resolve(parent, root);
      if (!Array.isArray(target2[key2])) target2[key2] = [];
    }
    const {
      target,
      key
    } = resolve(parent, type);
    child.__r3f.previousAttach = target[key];
    target[key] = child;
  } else child.__r3f.previousAttach = type(parent, child);
}
function detach(parent, child, type) {
  var _child$__r3f, _child$__r3f2;
  if (is.str(type)) {
    const {
      target,
      key
    } = resolve(parent, type);
    const previous = child.__r3f.previousAttach;
    if (previous === void 0) delete target[key];
    else target[key] = previous;
  } else (_child$__r3f = child.__r3f) == null ? void 0 : _child$__r3f.previousAttach == null ? void 0 : _child$__r3f.previousAttach(parent, child);
  (_child$__r3f2 = child.__r3f) == null ? true : delete _child$__r3f2.previousAttach;
}
function diffProps(instance, {
  children: cN,
  key: kN,
  ref: rN,
  ...props
}, {
  children: cP,
  key: kP,
  ref: rP,
  ...previous
} = {}, remove = false) {
  const localState = instance.__r3f;
  const entries = Object.entries(props);
  const changes = [];
  if (remove) {
    const previousKeys = Object.keys(previous);
    for (let i2 = 0; i2 < previousKeys.length; i2++) {
      if (!props.hasOwnProperty(previousKeys[i2])) entries.unshift([previousKeys[i2], DEFAULT + "remove"]);
    }
  }
  entries.forEach(([key, value]) => {
    var _instance$__r3f;
    if ((_instance$__r3f = instance.__r3f) != null && _instance$__r3f.primitive && key === "object") return;
    if (is.equ(value, previous[key])) return;
    if (/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(key)) return changes.push([key, value, true, []]);
    let entries2 = [];
    if (key.includes("-")) entries2 = key.split("-");
    changes.push([key, value, false, entries2]);
    for (const prop in props) {
      const value2 = props[prop];
      if (prop.startsWith(`${key}-`)) changes.push([prop, value2, false, prop.split("-")]);
    }
  });
  const memoized = {
    ...props
  };
  if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.args) memoized.args = localState.memoizedProps.args;
  if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.attach) memoized.attach = localState.memoizedProps.attach;
  return {
    memoized,
    changes
  };
}
function applyProps$1(instance, data) {
  var _instance$__r3f2;
  const localState = instance.__r3f;
  const root = localState == null ? void 0 : localState.root;
  const rootState = root == null ? void 0 : root.getState == null ? void 0 : root.getState();
  const {
    memoized,
    changes
  } = isDiffSet(data) ? data : diffProps(instance, data);
  const prevHandlers = localState == null ? void 0 : localState.eventCount;
  if (instance.__r3f) instance.__r3f.memoizedProps = memoized;
  for (let i2 = 0; i2 < changes.length; i2++) {
    let [key, value, isEvent, keys] = changes[i2];
    if (hasColorSpace(instance)) {
      const sRGBEncoding = 3001;
      const SRGBColorSpace = "srgb";
      const LinearSRGBColorSpace = "srgb-linear";
      if (key === "encoding") {
        key = "colorSpace";
        value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
      } else if (key === "outputEncoding") {
        key = "outputColorSpace";
        value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
      }
    }
    let currentInstance = instance;
    let targetProp = currentInstance[key];
    if (keys.length) {
      targetProp = keys.reduce((acc, key2) => acc[key2], instance);
      if (!(targetProp && targetProp.set)) {
        const [name, ...reverseEntries] = keys.reverse();
        currentInstance = reverseEntries.reverse().reduce((acc, key2) => acc[key2], instance);
        key = name;
      }
    }
    if (value === DEFAULT + "remove") {
      if (currentInstance.constructor) {
        let ctor = DEFAULTS.get(currentInstance.constructor);
        if (!ctor) {
          ctor = new currentInstance.constructor();
          DEFAULTS.set(currentInstance.constructor, ctor);
        }
        value = ctor[key];
      } else {
        value = 0;
      }
    }
    if (isEvent && localState) {
      if (value) localState.handlers[key] = value;
      else delete localState.handlers[key];
      localState.eventCount = Object.keys(localState.handlers).length;
    } else if (targetProp && targetProp.set && (targetProp.copy || targetProp instanceof THREE$1.Layers)) {
      if (Array.isArray(value)) {
        if (targetProp.fromArray) targetProp.fromArray(value);
        else targetProp.set(...value);
      } else if (targetProp.copy && value && value.constructor && // Some environments may break strict identity checks by duplicating versions of three.js.
      // Loosen to unminified names, ignoring descendents.
      // https://github.com/pmndrs/react-three-fiber/issues/2856
      // TODO: fix upstream and remove in v9
      (targetProp.constructor === value.constructor)) {
        targetProp.copy(value);
      } else if (value !== void 0) {
        var _targetProp;
        const isColor = (_targetProp = targetProp) == null ? void 0 : _targetProp.isColor;
        if (!isColor && targetProp.setScalar) targetProp.setScalar(value);
        else if (targetProp instanceof THREE$1.Layers && value instanceof THREE$1.Layers) targetProp.mask = value.mask;
        else targetProp.set(value);
        if (!getColorManagement() && rootState && !rootState.linear && isColor) targetProp.convertSRGBToLinear();
      }
    } else {
      var _currentInstance$key;
      currentInstance[key] = value;
      if ((_currentInstance$key = currentInstance[key]) != null && _currentInstance$key.isTexture && // sRGB textures must be RGBA8 since r137 https://github.com/mrdoob/three.js/pull/23129
      currentInstance[key].format === THREE$1.RGBAFormat && currentInstance[key].type === THREE$1.UnsignedByteType && rootState) {
        const texture = currentInstance[key];
        if (hasColorSpace(texture) && hasColorSpace(rootState.gl)) texture.colorSpace = rootState.gl.outputColorSpace;
        else texture.encoding = rootState.gl.outputEncoding;
      }
    }
    invalidateInstance(instance);
  }
  if (localState && localState.parent && instance.raycast && prevHandlers !== localState.eventCount) {
    const internal = findInitialRoot(instance).getState().internal;
    const index = internal.interaction.indexOf(instance);
    if (index > -1) internal.interaction.splice(index, 1);
    if (localState.eventCount) internal.interaction.push(instance);
  }
  const isCircular = changes.length === 1 && changes[0][0] === "onUpdate";
  if (!isCircular && changes.length && (_instance$__r3f2 = instance.__r3f) != null && _instance$__r3f2.parent) updateInstance(instance);
  return instance;
}
function invalidateInstance(instance) {
  var _instance$__r3f3, _instance$__r3f3$root;
  const state = (_instance$__r3f3 = instance.__r3f) == null ? void 0 : (_instance$__r3f3$root = _instance$__r3f3.root) == null ? void 0 : _instance$__r3f3$root.getState == null ? void 0 : _instance$__r3f3$root.getState();
  if (state && state.internal.frames === 0) state.invalidate();
}
function updateInstance(instance) {
  instance.onUpdate == null ? void 0 : instance.onUpdate(instance);
}
function updateCamera(camera, size) {
  if (!camera.manual) {
    if (isOrthographicCamera(camera)) {
      camera.left = size.width / -2;
      camera.right = size.width / 2;
      camera.top = size.height / 2;
      camera.bottom = size.height / -2;
    } else {
      camera.aspect = size.width / size.height;
    }
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
}
function makeId(event) {
  return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
function getEventPriority() {
  var _globalScope$event;
  const globalScope = typeof self !== "undefined" && self || typeof window !== "undefined" && window;
  if (!globalScope) return constantsExports.DefaultEventPriority;
  const name = (_globalScope$event = globalScope.event) == null ? void 0 : _globalScope$event.type;
  switch (name) {
    case "click":
    case "contextmenu":
    case "dblclick":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
      return constantsExports.DiscreteEventPriority;
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "pointerenter":
    case "pointerleave":
    case "wheel":
      return constantsExports.ContinuousEventPriority;
    default:
      return constantsExports.DefaultEventPriority;
  }
}
function releaseInternalPointerCapture(capturedMap, obj, captures, pointerId) {
  const captureData = captures.get(obj);
  if (captureData) {
    captures.delete(obj);
    if (captures.size === 0) {
      capturedMap.delete(pointerId);
      captureData.target.releasePointerCapture(pointerId);
    }
  }
}
function removeInteractivity(store, object) {
  const {
    internal
  } = store.getState();
  internal.interaction = internal.interaction.filter((o) => o !== object);
  internal.initialHits = internal.initialHits.filter((o) => o !== object);
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
    }
  });
  internal.capturedMap.forEach((captures, pointerId) => {
    releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
  });
}
function createEvents(store) {
  function calculateDistance(event) {
    const {
      internal
    } = store.getState();
    const dx = event.offsetX - internal.initialClick[0];
    const dy = event.offsetY - internal.initialClick[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  function filterPointerEvents(objects) {
    return objects.filter((obj) => ["Move", "Over", "Enter", "Out", "Leave"].some((name) => {
      var _r3f;
      return (_r3f = obj.__r3f) == null ? void 0 : _r3f.handlers["onPointer" + name];
    }));
  }
  function intersect(event, filter) {
    const state = store.getState();
    const duplicates = /* @__PURE__ */ new Set();
    const intersections = [];
    const eventsObjects = filter ? filter(state.internal.interaction) : state.internal.interaction;
    for (let i2 = 0; i2 < eventsObjects.length; i2++) {
      const state2 = getRootState(eventsObjects[i2]);
      if (state2) {
        state2.raycaster.camera = void 0;
      }
    }
    if (!state.previousRoot) {
      state.events.compute == null ? void 0 : state.events.compute(event, state);
    }
    function handleRaycast(obj) {
      const state2 = getRootState(obj);
      if (!state2 || !state2.events.enabled || state2.raycaster.camera === null) return [];
      if (state2.raycaster.camera === void 0) {
        var _state$previousRoot;
        state2.events.compute == null ? void 0 : state2.events.compute(event, state2, (_state$previousRoot = state2.previousRoot) == null ? void 0 : _state$previousRoot.getState());
        if (state2.raycaster.camera === void 0) state2.raycaster.camera = null;
      }
      return state2.raycaster.camera ? state2.raycaster.intersectObject(obj, true) : [];
    }
    let hits = eventsObjects.flatMap(handleRaycast).sort((a, b) => {
      const aState = getRootState(a.object);
      const bState = getRootState(b.object);
      if (!aState || !bState) return a.distance - b.distance;
      return bState.events.priority - aState.events.priority || a.distance - b.distance;
    }).filter((item) => {
      const id = makeId(item);
      if (duplicates.has(id)) return false;
      duplicates.add(id);
      return true;
    });
    if (state.events.filter) hits = state.events.filter(hits, state);
    for (const hit of hits) {
      let eventObject = hit.object;
      while (eventObject) {
        var _r3f2;
        if ((_r3f2 = eventObject.__r3f) != null && _r3f2.eventCount) intersections.push({
          ...hit,
          eventObject
        });
        eventObject = eventObject.parent;
      }
    }
    if ("pointerId" in event && state.internal.capturedMap.has(event.pointerId)) {
      for (let captureData of state.internal.capturedMap.get(event.pointerId).values()) {
        if (!duplicates.has(makeId(captureData.intersection))) intersections.push(captureData.intersection);
      }
    }
    return intersections;
  }
  function handleIntersects(intersections, event, delta, callback) {
    const rootState = store.getState();
    if (intersections.length) {
      const localState = {
        stopped: false
      };
      for (const hit of intersections) {
        const state = getRootState(hit.object) || rootState;
        const {
          raycaster,
          pointer,
          camera,
          internal
        } = state;
        const unprojectedPoint = new THREE$1.Vector3(pointer.x, pointer.y, 0).unproject(camera);
        const hasPointerCapture = (id) => {
          var _internal$capturedMap, _internal$capturedMap2;
          return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
        };
        const setPointerCapture = (id) => {
          const captureData = {
            intersection: hit,
            target: event.target
          };
          if (internal.capturedMap.has(id)) {
            internal.capturedMap.get(id).set(hit.eventObject, captureData);
          } else {
            internal.capturedMap.set(id, /* @__PURE__ */ new Map([[hit.eventObject, captureData]]));
          }
          event.target.setPointerCapture(id);
        };
        const releasePointerCapture = (id) => {
          const captures = internal.capturedMap.get(id);
          if (captures) {
            releaseInternalPointerCapture(internal.capturedMap, hit.eventObject, captures, id);
          }
        };
        let extractEventProps = {};
        for (let prop in event) {
          let property = event[prop];
          if (typeof property !== "function") extractEventProps[prop] = property;
        }
        let raycastEvent = {
          ...hit,
          ...extractEventProps,
          pointer,
          intersections,
          stopped: localState.stopped,
          delta,
          unprojectedPoint,
          ray: raycaster.ray,
          camera,
          // Hijack stopPropagation, which just sets a flag
          stopPropagation() {
            const capturesForPointer = "pointerId" in event && internal.capturedMap.get(event.pointerId);
            if (
              // ...if this pointer hasn't been captured
              !capturesForPointer || // ... or if the hit object is capturing the pointer
              capturesForPointer.has(hit.eventObject)
            ) {
              raycastEvent.stopped = localState.stopped = true;
              if (internal.hovered.size && Array.from(internal.hovered.values()).find((i2) => i2.eventObject === hit.eventObject)) {
                const higher = intersections.slice(0, intersections.indexOf(hit));
                cancelPointer([...higher, hit]);
              }
            }
          },
          // there should be a distinction between target and currentTarget
          target: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          currentTarget: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          nativeEvent: event
        };
        callback(raycastEvent);
        if (localState.stopped === true) break;
      }
    }
    return intersections;
  }
  function cancelPointer(intersections) {
    const {
      internal
    } = store.getState();
    for (const hoveredObj of internal.hovered.values()) {
      if (!intersections.length || !intersections.find((hit) => hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId)) {
        const eventObject = hoveredObj.eventObject;
        const instance = eventObject.__r3f;
        const handlers = instance == null ? void 0 : instance.handlers;
        internal.hovered.delete(makeId(hoveredObj));
        if (instance != null && instance.eventCount) {
          const data = {
            ...hoveredObj,
            intersections
          };
          handlers.onPointerOut == null ? void 0 : handlers.onPointerOut(data);
          handlers.onPointerLeave == null ? void 0 : handlers.onPointerLeave(data);
        }
      }
    }
  }
  function pointerMissed(event, objects) {
    for (let i2 = 0; i2 < objects.length; i2++) {
      const instance = objects[i2].__r3f;
      instance == null ? void 0 : instance.handlers.onPointerMissed == null ? void 0 : instance.handlers.onPointerMissed(event);
    }
  }
  function handlePointer(name) {
    switch (name) {
      case "onPointerLeave":
      case "onPointerCancel":
        return () => cancelPointer([]);
      case "onLostPointerCapture":
        return (event) => {
          const {
            internal
          } = store.getState();
          if ("pointerId" in event && internal.capturedMap.has(event.pointerId)) {
            requestAnimationFrame(() => {
              if (internal.capturedMap.has(event.pointerId)) {
                internal.capturedMap.delete(event.pointerId);
                cancelPointer([]);
              }
            });
          }
        };
    }
    return function handleEvent(event) {
      const {
        onPointerMissed,
        internal
      } = store.getState();
      internal.lastEvent.current = event;
      const isPointerMove = name === "onPointerMove";
      const isClickEvent = name === "onClick" || name === "onContextMenu" || name === "onDoubleClick";
      const filter = isPointerMove ? filterPointerEvents : void 0;
      const hits = intersect(event, filter);
      const delta = isClickEvent ? calculateDistance(event) : 0;
      if (name === "onPointerDown") {
        internal.initialClick = [event.offsetX, event.offsetY];
        internal.initialHits = hits.map((hit) => hit.eventObject);
      }
      if (isClickEvent && !hits.length) {
        if (delta <= 2) {
          pointerMissed(event, internal.interaction);
          if (onPointerMissed) onPointerMissed(event);
        }
      }
      if (isPointerMove) cancelPointer(hits);
      function onIntersect(data) {
        const eventObject = data.eventObject;
        const instance = eventObject.__r3f;
        const handlers = instance == null ? void 0 : instance.handlers;
        if (!(instance != null && instance.eventCount)) return;
        if (isPointerMove) {
          if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
            const id = makeId(data);
            const hoveredItem = internal.hovered.get(id);
            if (!hoveredItem) {
              internal.hovered.set(id, data);
              handlers.onPointerOver == null ? void 0 : handlers.onPointerOver(data);
              handlers.onPointerEnter == null ? void 0 : handlers.onPointerEnter(data);
            } else if (hoveredItem.stopped) {
              data.stopPropagation();
            }
          }
          handlers.onPointerMove == null ? void 0 : handlers.onPointerMove(data);
        } else {
          const handler = handlers[name];
          if (handler) {
            if (!isClickEvent || internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
              handler(data);
            }
          } else {
            if (isClickEvent && internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
            }
          }
        }
      }
      handleIntersects(hits, event, delta, onIntersect);
    };
  }
  return {
    handlePointer
  };
}
const privateKeys = ["set", "get", "setSize", "setFrameloop", "setDpr", "events", "invalidate", "advance", "size", "viewport"];
const isRenderer = (def) => !!(def != null && def.render);
const context = /* @__PURE__ */ React$2.createContext(null);
const createStore = (invalidate2, advance2) => {
  const rootState = create((set, get) => {
    const position = new THREE$1.Vector3();
    const defaultTarget = new THREE$1.Vector3();
    const tempTarget = new THREE$1.Vector3();
    function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
      const {
        width,
        height,
        top,
        left
      } = size;
      const aspect = width / height;
      if (target.isVector3) tempTarget.copy(target);
      else tempTarget.set(...target);
      const distance = camera.getWorldPosition(position).distanceTo(tempTarget);
      if (isOrthographicCamera(camera)) {
        return {
          width: width / camera.zoom,
          height: height / camera.zoom,
          top,
          left,
          factor: 1,
          distance,
          aspect
        };
      } else {
        const fov = camera.fov * Math.PI / 180;
        const h = 2 * Math.tan(fov / 2) * distance;
        const w = h * (width / height);
        return {
          width: w,
          height: h,
          top,
          left,
          factor: width / w,
          distance,
          aspect
        };
      }
    }
    let performanceTimeout = void 0;
    const setPerformanceCurrent = (current) => set((state2) => ({
      performance: {
        ...state2.performance,
        current
      }
    }));
    const pointer = new THREE$1.Vector2();
    const rootState2 = {
      set,
      get,
      // Mock objects that have to be configured
      gl: null,
      camera: null,
      raycaster: null,
      events: {
        priority: 1,
        enabled: true,
        connected: false
      },
      xr: null,
      scene: null,
      invalidate: (frames = 1) => invalidate2(get(), frames),
      advance: (timestamp, runGlobalEffects) => advance2(timestamp, runGlobalEffects, get()),
      legacy: false,
      linear: false,
      flat: false,
      controls: null,
      clock: new THREE$1.Clock(),
      pointer,
      mouse: pointer,
      frameloop: "always",
      onPointerMissed: void 0,
      performance: {
        current: 1,
        min: 0.5,
        max: 1,
        debounce: 200,
        regress: () => {
          const state2 = get();
          if (performanceTimeout) clearTimeout(performanceTimeout);
          if (state2.performance.current !== state2.performance.min) setPerformanceCurrent(state2.performance.min);
          performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state2.performance.debounce);
        }
      },
      size: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        updateStyle: false
      },
      viewport: {
        initialDpr: 0,
        dpr: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        aspect: 0,
        distance: 0,
        factor: 0,
        getCurrentViewport
      },
      setEvents: (events) => set((state2) => ({
        ...state2,
        events: {
          ...state2.events,
          ...events
        }
      })),
      setSize: (width, height, updateStyle, top, left) => {
        const camera = get().camera;
        const size = {
          width,
          height,
          top: top || 0,
          left: left || 0,
          updateStyle
        };
        set((state2) => ({
          size,
          viewport: {
            ...state2.viewport,
            ...getCurrentViewport(camera, defaultTarget, size)
          }
        }));
      },
      setDpr: (dpr) => set((state2) => {
        const resolved = calculateDpr(dpr);
        return {
          viewport: {
            ...state2.viewport,
            dpr: resolved,
            initialDpr: state2.viewport.initialDpr || resolved
          }
        };
      }),
      setFrameloop: (frameloop = "always") => {
        const clock = get().clock;
        clock.stop();
        clock.elapsedTime = 0;
        if (frameloop !== "never") {
          clock.start();
          clock.elapsedTime = 0;
        }
        set(() => ({
          frameloop
        }));
      },
      previousRoot: void 0,
      internal: {
        active: false,
        priority: 0,
        frames: 0,
        lastEvent: /* @__PURE__ */ React$2.createRef(),
        interaction: [],
        hovered: /* @__PURE__ */ new Map(),
        subscribers: [],
        initialClick: [0, 0],
        initialHits: [],
        capturedMap: /* @__PURE__ */ new Map(),
        subscribe: (ref, priority, store) => {
          const internal = get().internal;
          internal.priority = internal.priority + (priority > 0 ? 1 : 0);
          internal.subscribers.push({
            ref,
            priority,
            store
          });
          internal.subscribers = internal.subscribers.sort((a, b) => a.priority - b.priority);
          return () => {
            const internal2 = get().internal;
            if (internal2 != null && internal2.subscribers) {
              internal2.priority = internal2.priority - (priority > 0 ? 1 : 0);
              internal2.subscribers = internal2.subscribers.filter((s) => s.ref !== ref);
            }
          };
        }
      }
    };
    return rootState2;
  });
  const state = rootState.getState();
  let oldSize = state.size;
  let oldDpr = state.viewport.dpr;
  let oldCamera = state.camera;
  rootState.subscribe(() => {
    const {
      camera,
      size,
      viewport,
      gl,
      set
    } = rootState.getState();
    if (size.width !== oldSize.width || size.height !== oldSize.height || viewport.dpr !== oldDpr) {
      var _size$updateStyle;
      oldSize = size;
      oldDpr = viewport.dpr;
      updateCamera(camera, size);
      gl.setPixelRatio(viewport.dpr);
      const updateStyle = (_size$updateStyle = size.updateStyle) != null ? _size$updateStyle : typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
      gl.setSize(size.width, size.height, updateStyle);
    }
    if (camera !== oldCamera) {
      oldCamera = camera;
      set((state2) => ({
        viewport: {
          ...state2.viewport,
          ...state2.viewport.getCurrentViewport(camera)
        }
      }));
    }
  });
  rootState.subscribe((state2) => invalidate2(state2));
  return rootState;
};
function createSubs(callback, subs) {
  const sub = {
    callback
  };
  subs.add(sub);
  return () => void subs.delete(sub);
}
let i;
let globalEffects = /* @__PURE__ */ new Set();
let globalAfterEffects = /* @__PURE__ */ new Set();
let globalTailEffects = /* @__PURE__ */ new Set();
const addEffect = (callback) => createSubs(callback, globalEffects);
const addAfterEffect = (callback) => createSubs(callback, globalAfterEffects);
const addTail = (callback) => createSubs(callback, globalTailEffects);
function run(effects, timestamp) {
  if (!effects.size) return;
  for (const {
    callback
  } of effects.values()) {
    callback(timestamp);
  }
}
function flushGlobalEffects(type, timestamp) {
  switch (type) {
    case "before":
      return run(globalEffects, timestamp);
    case "after":
      return run(globalAfterEffects, timestamp);
    case "tail":
      return run(globalTailEffects, timestamp);
  }
}
let subscribers;
let subscription;
function render$1(timestamp, state, frame) {
  let delta = state.clock.getDelta();
  if (state.frameloop === "never" && typeof timestamp === "number") {
    delta = timestamp - state.clock.elapsedTime;
    state.clock.oldTime = state.clock.elapsedTime;
    state.clock.elapsedTime = timestamp;
  }
  subscribers = state.internal.subscribers;
  for (i = 0; i < subscribers.length; i++) {
    subscription = subscribers[i];
    subscription.ref.current(subscription.store.getState(), delta, frame);
  }
  if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera);
  state.internal.frames = Math.max(0, state.internal.frames - 1);
  return state.frameloop === "always" ? 1 : state.internal.frames;
}
function createLoop(roots2) {
  let running = false;
  let useFrameInProgress = false;
  let repeat;
  let frame;
  let state;
  function loop(timestamp) {
    frame = requestAnimationFrame(loop);
    running = true;
    repeat = 0;
    flushGlobalEffects("before", timestamp);
    useFrameInProgress = true;
    for (const root of roots2.values()) {
      var _state$gl$xr;
      state = root.store.getState();
      if (state.internal.active && (state.frameloop === "always" || state.internal.frames > 0) && !((_state$gl$xr = state.gl.xr) != null && _state$gl$xr.isPresenting)) {
        repeat += render$1(timestamp, state);
      }
    }
    useFrameInProgress = false;
    flushGlobalEffects("after", timestamp);
    if (repeat === 0) {
      flushGlobalEffects("tail", timestamp);
      running = false;
      return cancelAnimationFrame(frame);
    }
  }
  function invalidate2(state2, frames = 1) {
    var _state$gl$xr2;
    if (!state2) return roots2.forEach((root) => invalidate2(root.store.getState(), frames));
    if ((_state$gl$xr2 = state2.gl.xr) != null && _state$gl$xr2.isPresenting || !state2.internal.active || state2.frameloop === "never") return;
    if (frames > 1) {
      state2.internal.frames = Math.min(60, state2.internal.frames + frames);
    } else {
      if (useFrameInProgress) {
        state2.internal.frames = 2;
      } else {
        state2.internal.frames = 1;
      }
    }
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }
  function advance2(timestamp, runGlobalEffects = true, state2, frame2) {
    if (runGlobalEffects) flushGlobalEffects("before", timestamp);
    if (!state2) for (const root of roots2.values()) render$1(timestamp, root.store.getState());
    else render$1(timestamp, state2, frame2);
    if (runGlobalEffects) flushGlobalEffects("after", timestamp);
  }
  return {
    loop,
    invalidate: invalidate2,
    advance: advance2
  };
}
function useInstanceHandle(ref) {
  const instance = React$2.useRef(null);
  useIsomorphicLayoutEffect(() => void (instance.current = ref.current.__r3f), [ref]);
  return instance;
}
function useStore() {
  const store = React$2.useContext(context);
  if (!store) throw new Error("R3F: Hooks can only be used within the Canvas component!");
  return store;
}
function useThree(selector = (state) => state, equalityFn) {
  return useStore()(selector, equalityFn);
}
function useFrame(callback, renderPriority = 0) {
  const store = useStore();
  const subscribe = store.getState().internal.subscribe;
  const ref = useMutableCallback(callback);
  useIsomorphicLayoutEffect(() => subscribe(ref, renderPriority, store), [renderPriority, subscribe, store]);
  return null;
}
function useGraph(object) {
  return React$2.useMemo(() => buildGraph(object), [object]);
}
const memoizedLoaders = /* @__PURE__ */ new WeakMap();
function loadingFn(extensions, onProgress) {
  return function(Proto, ...input) {
    let loader = memoizedLoaders.get(Proto);
    if (!loader) {
      loader = new Proto();
      memoizedLoaders.set(Proto, loader);
    }
    if (extensions) extensions(loader);
    return Promise.all(input.map((input2) => new Promise((res, reject) => loader.load(input2, (data) => {
      if (data.scene) Object.assign(data, buildGraph(data.scene));
      res(data);
    }, onProgress, (error) => reject(new Error(`Could not load ${input2}: ${error == null ? void 0 : error.message}`))))));
  };
}
function useLoader(Proto, input, extensions, onProgress) {
  const keys = Array.isArray(input) ? input : [input];
  const results = suspend(loadingFn(extensions, onProgress), [Proto, ...keys], {
    equal: is.equ
  });
  return Array.isArray(input) ? results : results[0];
}
useLoader.preload = function(Proto, input, extensions) {
  const keys = Array.isArray(input) ? input : [input];
  return preload(loadingFn(extensions), [Proto, ...keys]);
};
useLoader.clear = function(Proto, input) {
  const keys = Array.isArray(input) ? input : [input];
  return clear([Proto, ...keys]);
};
const roots = /* @__PURE__ */ new Map();
const {
  invalidate,
  advance
} = createLoop(roots);
const {
  reconciler,
  applyProps
} = createRenderer(roots, getEventPriority);
const shallowLoose = {
  objects: "shallow",
  strict: false
};
const createRendererInstance = (gl, canvas) => {
  const customRenderer = typeof gl === "function" ? gl(canvas) : gl;
  if (isRenderer(customRenderer)) return customRenderer;
  else return new THREE$1.WebGLRenderer({
    powerPreference: "high-performance",
    canvas,
    antialias: true,
    alpha: true,
    ...gl
  });
};
function computeInitialSize(canvas, defaultSize) {
  const defaultStyle = typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
  if (defaultSize) {
    const {
      width,
      height,
      top,
      left,
      updateStyle = defaultStyle
    } = defaultSize;
    return {
      width,
      height,
      top,
      left,
      updateStyle
    };
  } else if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement && canvas.parentElement) {
    const {
      width,
      height,
      top,
      left
    } = canvas.parentElement.getBoundingClientRect();
    return {
      width,
      height,
      top,
      left,
      updateStyle: defaultStyle
    };
  } else if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return {
      width: canvas.width,
      height: canvas.height,
      top: 0,
      left: 0,
      updateStyle: defaultStyle
    };
  }
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  };
}
function createRoot(canvas) {
  const prevRoot = roots.get(canvas);
  const prevFiber = prevRoot == null ? void 0 : prevRoot.fiber;
  const prevStore = prevRoot == null ? void 0 : prevRoot.store;
  if (prevRoot) console.warn("R3F.createRoot should only be called once!");
  const logRecoverableError = typeof reportError === "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : (
    // In older browsers and test environments, fallback to console.error.
    console.error
  );
  const store = prevStore || createStore(invalidate, advance);
  const fiber = prevFiber || reconciler.createContainer(store, constantsExports.ConcurrentRoot, null, false, null, "", logRecoverableError, null);
  if (!prevRoot) roots.set(canvas, {
    fiber,
    store
  });
  let onCreated;
  let configured = false;
  let lastCamera;
  return {
    configure(props = {}) {
      let {
        gl: glConfig,
        size: propsSize,
        scene: sceneOptions,
        events,
        onCreated: onCreatedCallback,
        shadows = false,
        linear = false,
        flat = false,
        legacy = false,
        orthographic = false,
        frameloop = "always",
        dpr = [1, 2],
        performance: performance2,
        raycaster: raycastOptions,
        camera: cameraOptions,
        onPointerMissed
      } = props;
      let state = store.getState();
      let gl = state.gl;
      if (!state.gl) state.set({
        gl: gl = createRendererInstance(glConfig, canvas)
      });
      let raycaster = state.raycaster;
      if (!raycaster) state.set({
        raycaster: raycaster = new THREE$1.Raycaster()
      });
      const {
        params,
        ...options
      } = raycastOptions || {};
      if (!is.equ(options, raycaster, shallowLoose)) applyProps(raycaster, {
        ...options
      });
      if (!is.equ(params, raycaster.params, shallowLoose)) applyProps(raycaster, {
        params: {
          ...raycaster.params,
          ...params
        }
      });
      if (!state.camera || state.camera === lastCamera && !is.equ(lastCamera, cameraOptions, shallowLoose)) {
        lastCamera = cameraOptions;
        const isCamera = cameraOptions instanceof THREE$1.Camera;
        const camera = isCamera ? cameraOptions : orthographic ? new THREE$1.OrthographicCamera(0, 0, 0, 0, 0.1, 1e3) : new THREE$1.PerspectiveCamera(75, 0, 0.1, 1e3);
        if (!isCamera) {
          camera.position.z = 5;
          if (cameraOptions) {
            applyProps(camera, cameraOptions);
            if ("aspect" in cameraOptions || "left" in cameraOptions || "right" in cameraOptions || "bottom" in cameraOptions || "top" in cameraOptions) {
              camera.manual = true;
              camera.updateProjectionMatrix();
            }
          }
          if (!state.camera && !(cameraOptions != null && cameraOptions.rotation)) camera.lookAt(0, 0, 0);
        }
        state.set({
          camera
        });
        raycaster.camera = camera;
      }
      if (!state.scene) {
        let scene;
        if (sceneOptions != null && sceneOptions.isScene) {
          scene = sceneOptions;
        } else {
          scene = new THREE$1.Scene();
          if (sceneOptions) applyProps(scene, sceneOptions);
        }
        state.set({
          scene: prepare(scene)
        });
      }
      if (!state.xr) {
        var _gl$xr;
        const handleXRFrame = (timestamp, frame) => {
          const state2 = store.getState();
          if (state2.frameloop === "never") return;
          advance(timestamp, true, state2, frame);
        };
        const handleSessionChange = () => {
          const state2 = store.getState();
          state2.gl.xr.enabled = state2.gl.xr.isPresenting;
          state2.gl.xr.setAnimationLoop(state2.gl.xr.isPresenting ? handleXRFrame : null);
          if (!state2.gl.xr.isPresenting) invalidate(state2);
        };
        const xr = {
          connect() {
            const gl2 = store.getState().gl;
            gl2.xr.addEventListener("sessionstart", handleSessionChange);
            gl2.xr.addEventListener("sessionend", handleSessionChange);
          },
          disconnect() {
            const gl2 = store.getState().gl;
            gl2.xr.removeEventListener("sessionstart", handleSessionChange);
            gl2.xr.removeEventListener("sessionend", handleSessionChange);
          }
        };
        if (typeof ((_gl$xr = gl.xr) == null ? void 0 : _gl$xr.addEventListener) === "function") xr.connect();
        state.set({
          xr
        });
      }
      if (gl.shadowMap) {
        const oldEnabled = gl.shadowMap.enabled;
        const oldType = gl.shadowMap.type;
        gl.shadowMap.enabled = !!shadows;
        if (is.boo(shadows)) {
          gl.shadowMap.type = THREE$1.PCFSoftShadowMap;
        } else if (is.str(shadows)) {
          var _types$shadows;
          const types = {
            basic: THREE$1.BasicShadowMap,
            percentage: THREE$1.PCFShadowMap,
            soft: THREE$1.PCFSoftShadowMap,
            variance: THREE$1.VSMShadowMap
          };
          gl.shadowMap.type = (_types$shadows = types[shadows]) != null ? _types$shadows : THREE$1.PCFSoftShadowMap;
        } else if (is.obj(shadows)) {
          Object.assign(gl.shadowMap, shadows);
        }
        if (oldEnabled !== gl.shadowMap.enabled || oldType !== gl.shadowMap.type) gl.shadowMap.needsUpdate = true;
      }
      const ColorManagement = getColorManagement();
      if (ColorManagement) {
        if ("enabled" in ColorManagement) ColorManagement.enabled = !legacy;
        else if ("legacyMode" in ColorManagement) ColorManagement.legacyMode = legacy;
      }
      if (!configured) {
        const LinearEncoding = 3e3;
        const sRGBEncoding = 3001;
        applyProps(gl, {
          outputEncoding: linear ? LinearEncoding : sRGBEncoding,
          toneMapping: flat ? THREE$1.NoToneMapping : THREE$1.ACESFilmicToneMapping
        });
      }
      if (state.legacy !== legacy) state.set(() => ({
        legacy
      }));
      if (state.linear !== linear) state.set(() => ({
        linear
      }));
      if (state.flat !== flat) state.set(() => ({
        flat
      }));
      if (glConfig && !is.fun(glConfig) && !isRenderer(glConfig) && !is.equ(glConfig, gl, shallowLoose)) applyProps(gl, glConfig);
      if (events && !state.events.handlers) state.set({
        events: events(store)
      });
      const size = computeInitialSize(canvas, propsSize);
      if (!is.equ(size, state.size, shallowLoose)) {
        state.setSize(size.width, size.height, size.updateStyle, size.top, size.left);
      }
      if (dpr && state.viewport.dpr !== calculateDpr(dpr)) state.setDpr(dpr);
      if (state.frameloop !== frameloop) state.setFrameloop(frameloop);
      if (!state.onPointerMissed) state.set({
        onPointerMissed
      });
      if (performance2 && !is.equ(performance2, state.performance, shallowLoose)) state.set((state2) => ({
        performance: {
          ...state2.performance,
          ...performance2
        }
      }));
      onCreated = onCreatedCallback;
      configured = true;
      return this;
    },
    render(children) {
      if (!configured) this.configure();
      reconciler.updateContainer(/* @__PURE__ */ jsxRuntimeExports.jsx(Provider, {
        store,
        children,
        onCreated,
        rootElement: canvas
      }), fiber, null, () => void 0);
      return store;
    },
    unmount() {
      unmountComponentAtNode(canvas);
    }
  };
}
function render(children, canvas, config) {
  console.warn("R3F.render is no longer supported in React 18. Use createRoot instead!");
  const root = createRoot(canvas);
  root.configure(config);
  return root.render(children);
}
function Provider({
  store,
  children,
  onCreated,
  rootElement
}) {
  useIsomorphicLayoutEffect(() => {
    const state = store.getState();
    state.set((state2) => ({
      internal: {
        ...state2.internal,
        active: true
      }
    }));
    if (onCreated) onCreated(state);
    if (!store.getState().events.connected) state.events.connect == null ? void 0 : state.events.connect(rootElement);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(context.Provider, {
    value: store,
    children
  });
}
function unmountComponentAtNode(canvas, callback) {
  const root = roots.get(canvas);
  const fiber = root == null ? void 0 : root.fiber;
  if (fiber) {
    const state = root == null ? void 0 : root.store.getState();
    if (state) state.internal.active = false;
    reconciler.updateContainer(null, fiber, null, () => {
      if (state) {
        setTimeout(() => {
          try {
            var _state$gl, _state$gl$renderLists, _state$gl2, _state$gl3;
            state.events.disconnect == null ? void 0 : state.events.disconnect();
            (_state$gl = state.gl) == null ? void 0 : (_state$gl$renderLists = _state$gl.renderLists) == null ? void 0 : _state$gl$renderLists.dispose == null ? void 0 : _state$gl$renderLists.dispose();
            (_state$gl2 = state.gl) == null ? void 0 : _state$gl2.forceContextLoss == null ? void 0 : _state$gl2.forceContextLoss();
            if ((_state$gl3 = state.gl) != null && _state$gl3.xr) state.xr.disconnect();
            dispose(state);
            roots.delete(canvas);
            if (callback) callback(canvas);
          } catch (e) {
          }
        }, 500);
      }
    });
  }
}
function createPortal(children, container, state) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, {
    children,
    container,
    state
  }, container.uuid);
}
function Portal({
  state = {},
  children,
  container
}) {
  const {
    events,
    size,
    ...rest
  } = state;
  const previousRoot = useStore();
  const [raycaster] = React$2.useState(() => new THREE$1.Raycaster());
  const [pointer] = React$2.useState(() => new THREE$1.Vector2());
  const inject = React$2.useCallback(
    (rootState, injectState) => {
      const intersect = {
        ...rootState
      };
      Object.keys(rootState).forEach((key) => {
        if (
          // Some props should be off-limits
          privateKeys.includes(key) || // Otherwise filter out the props that are different and let the inject layer take precedence
          // Unless the inject layer props is undefined, then we keep the root layer
          rootState[key] !== injectState[key] && injectState[key]
        ) {
          delete intersect[key];
        }
      });
      let viewport = void 0;
      if (injectState && size) {
        const camera = injectState.camera;
        viewport = rootState.viewport.getCurrentViewport(camera, new THREE$1.Vector3(), size);
        if (camera !== rootState.camera) updateCamera(camera, size);
      }
      return {
        // The intersect consists of the previous root state
        ...intersect,
        // Portals have their own scene, which forms the root, a raycaster and a pointer
        scene: container,
        raycaster,
        pointer,
        mouse: pointer,
        // Their previous root is the layer before it
        previousRoot,
        // Events, size and viewport can be overridden by the inject layer
        events: {
          ...rootState.events,
          ...injectState == null ? void 0 : injectState.events,
          ...events
        },
        size: {
          ...rootState.size,
          ...size
        },
        viewport: {
          ...rootState.viewport,
          ...viewport
        },
        ...rest
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
  const [usePortalStore] = React$2.useState(() => {
    const previousState = previousRoot.getState();
    const store = create((set, get) => ({
      ...previousState,
      scene: container,
      raycaster,
      pointer,
      mouse: pointer,
      previousRoot,
      events: {
        ...previousState.events,
        ...events
      },
      size: {
        ...previousState.size,
        ...size
      },
      ...rest,
      // Set and get refer to this root-state
      set,
      get,
      // Layers are allowed to override events
      setEvents: (events2) => set((state2) => ({
        ...state2,
        events: {
          ...state2.events,
          ...events2
        }
      }))
    }));
    return store;
  });
  React$2.useEffect(() => {
    const unsub = previousRoot.subscribe((prev) => usePortalStore.setState((state2) => inject(prev, state2)));
    return () => {
      unsub();
    };
  }, [inject]);
  React$2.useEffect(() => {
    usePortalStore.setState((injectState) => inject(previousRoot.getState(), injectState));
  }, [inject]);
  React$2.useEffect(() => {
    return () => {
      usePortalStore.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: reconciler.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(context.Provider, {
      value: usePortalStore,
      children
    }), usePortalStore, null)
  });
}
function flushSync(fn) {
  return reconciler.flushSync(fn, void 0);
}
reconciler.injectIntoDevTools({
  bundleType: 0 ,
  rendererPackageName: "@react-three/fiber",
  version: React$2.version
});
const act = React$2.unstable_act;
const DOM_EVENTS = {
  onClick: ["click", false],
  onContextMenu: ["contextmenu", false],
  onDoubleClick: ["dblclick", false],
  onWheel: ["wheel", true],
  onPointerDown: ["pointerdown", true],
  onPointerUp: ["pointerup", true],
  onPointerLeave: ["pointerleave", true],
  onPointerMove: ["pointermove", true],
  onPointerCancel: ["pointercancel", true],
  onLostPointerCapture: ["lostpointercapture", true]
};
function createPointerEvents(store) {
  const {
    handlePointer
  } = createEvents(store);
  return {
    priority: 1,
    enabled: true,
    compute(event, state, previous) {
      state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    },
    connected: void 0,
    handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
      ...acc,
      [key]: handlePointer(key)
    }), {}),
    update: () => {
      var _internal$lastEvent;
      const {
        events,
        internal
      } = store.getState();
      if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
    },
    connect: (target) => {
      var _events$handlers;
      const {
        set,
        events
      } = store.getState();
      events.disconnect == null ? void 0 : events.disconnect();
      set((state) => ({
        events: {
          ...state.events,
          connected: target
        }
      }));
      Object.entries((_events$handlers = events.handlers) != null ? _events$handlers : []).forEach(([name, event]) => {
        const [eventName, passive] = DOM_EVENTS[name];
        target.addEventListener(eventName, event, {
          passive
        });
      });
    },
    disconnect: () => {
      const {
        set,
        events
      } = store.getState();
      if (events.connected) {
        var _events$handlers2;
        Object.entries((_events$handlers2 = events.handlers) != null ? _events$handlers2 : []).forEach(([name, event]) => {
          if (events && events.connected instanceof HTMLElement) {
            const [eventName] = DOM_EVENTS[name];
            events.connected.removeEventListener(eventName, event);
          }
        });
        set((state) => ({
          events: {
            ...state.events,
            connected: void 0
          }
        }));
      }
    }
  };
}

const {useState:T,useRef:p,useEffect:u,useMemo:M} = await importShared('react');
function g(n,t){let o;return (...i)=>{window.clearTimeout(o),o=window.setTimeout(()=>n(...i),t);}}function j({debounce:n,scroll:t,polyfill:o,offsetSize:i}={debounce:0,scroll:false,offsetSize:false}){const a=o||(typeof window=="undefined"?class{}:window.ResizeObserver);if(!a)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[c,h]=T({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),e=p({element:null,scrollContainers:null,resizeObserver:null,lastBounds:c,orientationHandler:null}),d=n?typeof n=="number"?n:n.scroll:null,f=n?typeof n=="number"?n:n.resize:null,w=p(false);u(()=>(w.current=true,()=>void(w.current=false)));const[z,m,s]=M(()=>{const r=()=>{if(!e.current.element)return;const{left:y,top:C,width:H,height:O,bottom:S,right:x,x:B,y:R}=e.current.element.getBoundingClientRect(),l={left:y,top:C,width:H,height:O,bottom:S,right:x,x:B,y:R};e.current.element instanceof HTMLElement&&i&&(l.height=e.current.element.offsetHeight,l.width=e.current.element.offsetWidth),Object.freeze(l),w.current&&!D(e.current.lastBounds,l)&&h(e.current.lastBounds=l);};return [r,f?g(r,f):r,d?g(r,d):r]},[h,i,d,f]);function v(){e.current.scrollContainers&&(e.current.scrollContainers.forEach(r=>r.removeEventListener("scroll",s,true)),e.current.scrollContainers=null),e.current.resizeObserver&&(e.current.resizeObserver.disconnect(),e.current.resizeObserver=null),e.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",e.current.orientationHandler));}function b(){e.current.element&&(e.current.resizeObserver=new a(s),e.current.resizeObserver.observe(e.current.element),t&&e.current.scrollContainers&&e.current.scrollContainers.forEach(r=>r.addEventListener("scroll",s,{capture:true,passive:true})),e.current.orientationHandler=()=>{s();},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",e.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",e.current.orientationHandler));}const L=r=>{!r||r===e.current.element||(v(),e.current.element=r,e.current.scrollContainers=E(r),b());};return X(s,!!t),W(m),u(()=>{v(),b();},[t,s,m]),u(()=>v,[]),[L,c,z]}function W(n){u(()=>{const t=n;return window.addEventListener("resize",t),()=>void window.removeEventListener("resize",t)},[n]);}function X(n,t){u(()=>{if(t){const o=n;return window.addEventListener("scroll",o,{capture:true,passive:true}),()=>void window.removeEventListener("scroll",o,true)}},[n,t]);}function E(n){const t=[];if(!n||n===document.body)return t;const{overflow:o,overflowX:i,overflowY:a}=window.getComputedStyle(n);return [o,i,a].some(c=>c==="auto"||c==="scroll")&&t.push(n),[...t,...E(n.parentElement)]}const k=["x","y","top","bottom","left","right","width","height"],D=(n,t)=>k.every(o=>n[o]===t[o]);

const React$1 = await importShared('react');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a, _b;
typeof window !== "undefined" && (((_a = window.document) == null ? void 0 : _a.createElement) || ((_b = window.navigator) == null ? void 0 : _b.product) === "ReactNative") ? React$1.useLayoutEffect : React$1.useEffect;
function traverseFiber(fiber, ascending, selector) {
  if (!fiber)
    return;
  if (selector(fiber) === true)
    return fiber;
  let child = fiber.child;
  while (child) {
    const match = traverseFiber(child, ascending, selector);
    if (match)
      return match;
    child = child.sibling;
  }
}
function wrapContext(context) {
  try {
    return Object.defineProperties(context, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch (_) {
    return context;
  }
}
const error = console.error;
console.error = function() {
  const message = [...arguments].join("");
  if ((message == null ? void 0 : message.startsWith("Warning:")) && message.includes("useContext")) {
    console.error = error;
    return;
  }
  return error.apply(this, arguments);
};
const FiberContext = wrapContext(React$1.createContext(null));
class FiberProvider extends React$1.Component {
  render() {
    return /* @__PURE__ */ React$1.createElement(FiberContext.Provider, {
      value: this._reactInternals
    }, this.props.children);
  }
}
function useFiber() {
  const root = React$1.useContext(FiberContext);
  if (root === null)
    throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const id = React$1.useId();
  const fiber = React$1.useMemo(() => {
    for (const maybeFiber of [root, root == null ? void 0 : root.alternate]) {
      if (!maybeFiber)
        continue;
      const fiber2 = traverseFiber(maybeFiber, false, (node) => {
        let state = node.memoizedState;
        while (state) {
          if (state.memoizedState === id)
            return true;
          state = state.next;
        }
      });
      if (fiber2)
        return fiber2;
    }
  }, [root, id]);
  return fiber;
}
function useContextMap() {
  const fiber = useFiber();
  const [contextMap] = React$1.useState(() => /* @__PURE__ */ new Map());
  contextMap.clear();
  let node = fiber;
  while (node) {
    if (node.type && typeof node.type === "object") {
      const enableRenderableContext = node.type._context === void 0 && node.type.Provider === node.type;
      const context = enableRenderableContext ? node.type : node.type._context;
      if (context && context !== FiberContext && !contextMap.has(context)) {
        contextMap.set(context, React$1.useContext(wrapContext(context)));
      }
    }
    node = node.return;
  }
  return contextMap;
}
function useContextBridge() {
  const contextMap = useContextMap();
  return React$1.useMemo(
    () => Array.from(contextMap.keys()).reduce(
      (Prev, context) => (props) => /* @__PURE__ */ React$1.createElement(Prev, null, /* @__PURE__ */ React$1.createElement(context.Provider, __spreadProps(__spreadValues({}, props), {
        value: contextMap.get(context)
      }))),
      (props) => /* @__PURE__ */ React$1.createElement(FiberProvider, __spreadValues({}, props))
    ),
    [contextMap]
  );
}

const React = await importShared('react');

const THREE = await importShared('three');

const CanvasImpl = /*#__PURE__*/React.forwardRef(function Canvas({
  children,
  fallback,
  resize,
  style,
  gl,
  events = createPointerEvents,
  eventSource,
  eventPrefix,
  shadows,
  linear,
  flat,
  legacy,
  orthographic,
  frameloop,
  dpr,
  performance,
  raycaster,
  camera,
  scene,
  onPointerMissed,
  onCreated,
  ...props
}, forwardedRef) {
  // Create a known catalogue of Threejs-native elements
  // This will include the entire THREE namespace by default, users can extend
  // their own elements by using the createRoot API instead
  React.useMemo(() => extend(THREE), []);
  const Bridge = useContextBridge();
  const [containerRef, containerRect] = j({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = React.useRef(null);
  const divRef = React.useRef(null);
  React.useImperativeHandle(forwardedRef, () => canvasRef.current);
  const handlePointerMissed = useMutableCallback(onPointerMissed);
  const [block, setBlock] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Suspend this component if block is a promise (2nd run)
  if (block) throw block;
  // Throw exception outwards if anything within canvas throws
  if (error) throw error;
  const root = React.useRef(null);
  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
      if (!root.current) root.current = createRoot(canvas);
      root.current.configure({
        gl,
        events,
        shadows,
        linear,
        flat,
        legacy,
        orthographic,
        frameloop,
        dpr,
        performance,
        raycaster,
        camera,
        scene,
        size: containerRect,
        // Pass mutable reference to onPointerMissed so it's free to update
        onPointerMissed: (...args) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(...args),
        onCreated: state => {
          // Connect to event source
          state.events.connect == null ? void 0 : state.events.connect(eventSource ? isRef(eventSource) ? eventSource.current : eventSource : divRef.current);
          // Set up compute function
          if (eventPrefix) {
            state.setEvents({
              compute: (event, state) => {
                const x = event[eventPrefix + 'X'];
                const y = event[eventPrefix + 'Y'];
                state.pointer.set(x / state.size.width * 2 - 1, -(y / state.size.height) * 2 + 1);
                state.raycaster.setFromCamera(state.pointer, state.camera);
              }
            });
          }
          // Call onCreated callback
          onCreated == null ? void 0 : onCreated(state);
        }
      });
      root.current.render( /*#__PURE__*/jsxRuntimeExports.jsx(Bridge, {
        children: /*#__PURE__*/jsxRuntimeExports.jsx(ErrorBoundary, {
          set: setError,
          children: /*#__PURE__*/jsxRuntimeExports.jsx(React.Suspense, {
            fallback: /*#__PURE__*/jsxRuntimeExports.jsx(Block, {
              set: setBlock
            }),
            children: children != null ? children : null
          })
        })
      }));
    }
  });
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) return () => unmountComponentAtNode(canvas);
  }, []);

  // When the event source is not this div, we need to set pointer-events to none
  // Or else the canvas will block events from reaching the event source
  const pointerEvents = eventSource ? 'none' : 'auto';
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    ref: divRef,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents,
      ...style
    },
    ...props,
    children: /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      ref: containerRef,
      style: {
        width: '100%',
        height: '100%'
      },
      children: /*#__PURE__*/jsxRuntimeExports.jsx("canvas", {
        ref: canvasRef,
        style: {
          display: 'block'
        },
        children: fallback
      })
    })
  });
});

/**
 * A DOM canvas which accepts threejs elements as children.
 * @see https://docs.pmnd.rs/react-three-fiber/api/canvas
 */
const Canvas = /*#__PURE__*/React.forwardRef(function CanvasWrapper(props, ref) {
  return /*#__PURE__*/jsxRuntimeExports.jsx(FiberProvider, {
    children: /*#__PURE__*/jsxRuntimeExports.jsx(CanvasImpl, {
      ...props,
      ref: ref
    })
  });
});

export { Canvas, threeTypes as ReactThreeFiber, roots as _roots, act, addAfterEffect, addEffect, addTail, advance, applyProps, buildGraph, context, createEvents, createPointerEvents, createPortal, createRoot, dispose, createPointerEvents as events, extend, flushGlobalEffects, flushSync, getRootState, invalidate, reconciler, render, unmountComponentAtNode, useFrame, useGraph, useInstanceHandle, useLoader, useStore, useThree };
