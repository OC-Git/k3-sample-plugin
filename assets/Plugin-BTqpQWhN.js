import { a as index_cjs, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  undefined !== maybeKey && (key = "" + maybeKey);
  undefined !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: undefined !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;

{
  jsxRuntime.exports = reactJsxRuntime_production;
}

var jsxRuntimeExports = jsxRuntime.exports;

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("three", {
    customShareInfo: {shareConfig:{
      singleton: false,
      strictVersion: undefined,
      requiredVersion: "^0.177.0"
    }}}));
    const exportModule = await res.then(factory => factory());
    var k3_mf_2_ring__loadShare__three__loadShare__ = exportModule;

/**
 * Modifies the supplied geometry if it is non-indexed, otherwise creates a new,
 * non-indexed geometry. Returns the geometry with smooth normals everywhere except
 * faces that meet at an angle greater than the crease angle.
 *
 * @param {BufferGeometry} geometry - The geometry to modify.
 * @param {number} [creaseAngle=Math.PI/3] - The crease angle in radians.
 * @return {BufferGeometry} - The updated geometry
 */
function toCreasedNormals( geometry, creaseAngle = Math.PI / 3 /* 60 degrees */ ) {

	const creaseDot = Math.cos( creaseAngle );
	const hashMultiplier = ( 1 + 1e-10 ) * 1e2;

	// reusable vectors
	const verts = [ new k3_mf_2_ring__loadShare__three__loadShare__.Vector3(), new k3_mf_2_ring__loadShare__three__loadShare__.Vector3(), new k3_mf_2_ring__loadShare__three__loadShare__.Vector3() ];
	const tempVec1 = new k3_mf_2_ring__loadShare__three__loadShare__.Vector3();
	const tempVec2 = new k3_mf_2_ring__loadShare__three__loadShare__.Vector3();
	const tempNorm = new k3_mf_2_ring__loadShare__three__loadShare__.Vector3();
	const tempNorm2 = new k3_mf_2_ring__loadShare__three__loadShare__.Vector3();

	// hashes a vector
	function hashVertex( v ) {

		const x = ~ ~ ( v.x * hashMultiplier );
		const y = ~ ~ ( v.y * hashMultiplier );
		const z = ~ ~ ( v.z * hashMultiplier );
		return `${x},${y},${z}`;

	}

	// BufferGeometry.toNonIndexed() warns if the geometry is non-indexed
	// and returns the original geometry
	const resultGeometry = geometry.index ? geometry.toNonIndexed() : geometry;
	const posAttr = resultGeometry.attributes.position;
	const vertexMap = {};

	// find all the normals shared by commonly located vertices
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		// add the normal to the map for all vertices
		const normal = new k3_mf_2_ring__loadShare__three__loadShare__.Vector3().crossVectors( tempVec1, tempVec2 ).normalize();
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			if ( ! ( hash in vertexMap ) ) {

				vertexMap[ hash ] = [];

			}

			vertexMap[ hash ].push( normal );

		}

	}

	// average normals from all vertices that share a common location if they are within the
	// provided crease threshold
	const normalArray = new Float32Array( posAttr.count * 3 );
	const normAttr = new k3_mf_2_ring__loadShare__three__loadShare__.BufferAttribute( normalArray, 3, false );
	for ( let i = 0, l = posAttr.count / 3; i < l; i ++ ) {

		// get the face normal for this vertex
		const i3 = 3 * i;
		const a = verts[ 0 ].fromBufferAttribute( posAttr, i3 + 0 );
		const b = verts[ 1 ].fromBufferAttribute( posAttr, i3 + 1 );
		const c = verts[ 2 ].fromBufferAttribute( posAttr, i3 + 2 );

		tempVec1.subVectors( c, b );
		tempVec2.subVectors( a, b );

		tempNorm.crossVectors( tempVec1, tempVec2 ).normalize();

		// average all normals that meet the threshold and set the normal value
		for ( let n = 0; n < 3; n ++ ) {

			const vert = verts[ n ];
			const hash = hashVertex( vert );
			const otherNormals = vertexMap[ hash ];
			tempNorm2.set( 0, 0, 0 );

			for ( let k = 0, lk = otherNormals.length; k < lk; k ++ ) {

				const otherNorm = otherNormals[ k ];
				if ( tempNorm.dot( otherNorm ) > creaseDot ) {

					tempNorm2.add( otherNorm );

				}

			}

			tempNorm2.normalize();
			normAttr.setXYZ( i3 + n, tempNorm2.x, tempNorm2.y, tempNorm2.z );

		}

	}

	resultGeometry.setAttribute( 'normal', normAttr );
	return resultGeometry;

}

const Segment = (props) => {
  const r = props.radius || 0.5;
  const points = [];
  for (let i = 0; i < props.segmentCount; i++) {
    points.push(
      new k3_mf_2_ring__loadShare__three__loadShare__.Vector3(
        r * Math.sin(i * Math.PI * 2 / props.segmentCount + Math.PI),
        r * Math.cos(i * Math.PI * 2 / props.segmentCount + Math.PI),
        0
      )
    );
  }
  const path = new k3_mf_2_ring__loadShare__three__loadShare__.CatmullRomCurve3(points, true);
  const extrudeSettings = {
    steps: props.segmentCount,
    curveSegments: 20,
    bevelEnabled: false,
    extrudePath: path
  };
  const bufferExtrudeGeometry = new k3_mf_2_ring__loadShare__three__loadShare__.ExtrudeGeometry(
    props.shape,
    extrudeSettings
  );
  const creasedGeometry = toCreasedNormals(
    bufferExtrudeGeometry,
    Math.PI / 2
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: creasedGeometry, material: props.material, children: props.children });
};
const Ring = (props) => {
  const vGap = props.vGap;
  const vWidth = 4 + vGap;
  const gap = vGap / 50;
  const sink = 0.05;
  const rx = vWidth / 50;
  const ry = 0.05;
  const shape1 = new k3_mf_2_ring__loadShare__three__loadShare__.Shape();
  shape1.moveTo(gap, -0.05);
  shape1.splineThru([
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(gap, -0.05),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(rx, -0.8 * ry),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(rx, 0.8 * ry),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(gap, ry)
  ]);
  shape1.lineTo(gap, -0.05);
  const shape2 = new k3_mf_2_ring__loadShare__three__loadShare__.Shape();
  shape2.moveTo(gap, -0.05 + sink);
  shape2.lineTo(gap, ry - sink);
  shape2.lineTo(-gap, ry - sink);
  shape2.lineTo(-gap, -0.05 + sink);
  shape2.lineTo(gap, -0.05 + sink);
  const shape3 = new k3_mf_2_ring__loadShare__three__loadShare__.Shape();
  shape3.moveTo(-gap, -0.05);
  shape3.splineThru([
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(-gap, -0.05),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(-rx, -0.8 * ry),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(-rx, 0.8 * ry),
    new k3_mf_2_ring__loadShare__three__loadShare__.Vector2(-gap, ry)
  ]);
  shape3.lineTo(-gap, -0.05);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Segment,
      {
        shape: shape1,
        radius: props.radius,
        segmentCount: props.segmentCount,
        material: props.materials?.outer
      }
    ),
    gap > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Segment,
      {
        shape: shape2,
        radius: props.radius,
        segmentCount: props.segmentCount,
        material: props.materials?.inner
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Segment,
      {
        shape: shape3,
        radius: props.radius,
        segmentCount: props.segmentCount,
        material: props.materials?.outer
      }
    )
  ] });
};

const Image = "/assets/Image-lYiF6YAQ.png";

const WeddingRing = (props) => {
  console.log("WeddingRing props", props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "group",
    {
      position: props.position,
      scale: [props.width, props.height, props.depth],
      userData: { modelId: props.id },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Ring,
        {
          radius: props.radius,
          segmentCount: props.segmentCount,
          vGap: props.vGap,
          materials: props.materials
        }
      )
    }
  );
};
const dynamicRing = {
  type: "ringPlugin",
  label: "Ring",
  disabledForAR: false,
  component: WeddingRing,
  propsDialog: {
    basic: { type: "basic" },
    radius: {},
    vGap: {},
    segmentCount: {},
    jewel: { type: "model", label: "The Jewel Model" }
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    radius: { expression: "1" },
    vGap: { expression: "4" },
    segmentCount: { expression: "1" },
    jewel: []
  },
  materials: ["outer", "inner"],
  repositionApplicator: null,
  screenshot: Image
};

const Plugin = {
  dynamicModels: [dynamicRing]
};

export { Plugin as default };
