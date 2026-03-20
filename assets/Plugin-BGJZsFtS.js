import { a as index_cjs, k as k3_mf_2_ring__mf_v__runtimeInit__mf_v__ } from './k3_mf_2_ring__mf_v__runtimeInit__mf_v__-Csdh1Uln.js';

const VariableType = {
  List: "list",
  Color: "color",
  Number: "number",
  Text: "text",
  MultiSelect: "multiSelect",
  Boolean: "boolean",
  Image: "image",
  Upload: "upload",
  Components: "components",
  Information: "information"
};

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
    
    const {loadShare: loadShare$4} = index_cjs;
    const {initPromise: initPromise$4} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res$4 = initPromise$4.then(_ => loadShare$4("@mui/material", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^7.1.1"
    }}}));
    const exportModule$4 = await res$4.then(factory => factory());
    var k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__ = exportModule$4;

// dev uses dynamic import to separate chunks
    
    const {loadShare: loadShare$3} = index_cjs;
    const {initPromise: initPromise$3} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res$3 = initPromise$3.then(_ => loadShare$3("react", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "19.1.1"
    }}}));
    const exportModule$3 = await res$3.then(factory => factory());
    var k3_mf_2_ring__loadShare__react__loadShare__ = exportModule$3;

const ColorChooser = ({
  variable,
  selection,
  values,
  onChange,
  disabled
}) => {
  const firstValue = values?.[0];
  const [color, setColor] = k3_mf_2_ring__loadShare__react__loadShare__.useState(
    selection?.data?.inputText || "#000000"
  );
  const debounceRef = k3_mf_2_ring__loadShare__react__loadShare__.useRef(null);
  k3_mf_2_ring__loadShare__react__loadShare__.useEffect(() => {
    setColor(selection?.data?.inputText || "#000000");
  }, [selection?.data?.inputText]);
  const handleChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (firstValue) onChange(firstValue.id, { inputText: value });
    }, 200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.Stack, { direction: "row", gap: 3, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.Input,
      {
        type: "color",
        "data-cy": "color-picker-input",
        sx: { width: "60px" },
        value: color,
        disabled,
        onChange: handleChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.TextField, { value: color, label: variable.label, disabled: true, fullWidth: true })
  ] });
};

const DemoSliderInput = ({
  variable,
  selection,
  values,
  onChange,
  disabled
}) => {
  const min = variable?.settings?.templateOptions?.min ?? 0;
  const max = variable?.settings?.templateOptions?.max ?? 100;
  const initial = Number(selection?.data?.inputValue ?? min);
  const [current, setCurrent] = k3_mf_2_ring__loadShare__react__loadShare__.useState(initial);
  const debounceRef = k3_mf_2_ring__loadShare__react__loadShare__.useRef(null);
  k3_mf_2_ring__loadShare__react__loadShare__.useEffect(() => {
    setCurrent(Number(selection?.data?.inputValue ?? min));
  }, [selection?.data?.inputValue, min]);
  const handleChange = (e) => {
    const num = Number(e.target.value);
    setCurrent(num);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const firstValue = values?.[0];
    debounceRef.current = setTimeout(() => {
      if (firstValue) onChange(firstValue.id, { inputValue: num });
    }, 200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "8px 12px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: { display: "block", fontSize: 12, marginBottom: 4 }, children: variable.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min,
          max,
          value: current,
          onChange: handleChange,
          disabled,
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11, minWidth: 28, textAlign: "right" }, children: current })
    ] })
  ] });
};

// dev uses dynamic import to separate chunks
    
    const {loadShare: loadShare$2} = index_cjs;
    const {initPromise: initPromise$2} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res$2 = initPromise$2.then(_ => loadShare$2("three", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^0.177.0"
    }}}));
    const exportModule$2 = await res$2.then(factory => factory());
    var k3_mf_2_ring__loadShare__three__loadShare__ = exportModule$2;

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
  label: "Ehering",
  description: `<p><strong>Parametrischer 3D-Ehering</strong></p>
<p>Dieses Dynamic Model rendert einen vollständig parametrischen Ehering in der 3D-Szene. Der Ring wird prozedural aus einer Torus-Geometrie erzeugt und unterstützt folgende konfigurierbaren Eigenschaften:</p>
<ul>
  <li><strong>radius</strong> – Außenradius des Ringes in Szeneneinheiten</li>
  <li><strong>vGap</strong> – Ringbreite (Abstand zwischen innerem und äußerem Torus)</li>
  <li><strong>segmentCount</strong> – Anzahl der polygonalen Segmente (Detailgrad)</li>
  <li><strong>outer / inner</strong> – Zwei unabhängige Materialslots für die Außen- und Innenfläche</li>
</ul>
<p>Position, Rotation und Skalierung werden über den eingebauten <em>basic</em>-Editor gesteuert. Expressions in <code>defaultProps</code> setzen die Startwerte beim Platzieren einer neuen Instanz.</p>`,
  disabledForAR: false,
  component: WeddingRing,
  propsDialog: {
    // Built-in position / rotation / scale / width / height / depth editor
    basic: { type: "basic" },
    // Every additional key adds an expression field in the admin props panel.
    // The evaluated value is forwarded to the component as the same-named prop.
    radius: {},
    vGap: {},
    segmentCount: {}
  },
  defaultProps: {
    // width / height / depth are required when using the "basic" editor.
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    radius: { expression: "1" },
    vGap: { expression: "4" },
    segmentCount: { expression: "1" }
  },
  materials: ["outer", "inner"],
  screenshot: Image
};

// dev uses dynamic import to separate chunks
    
    const {loadShare: loadShare$1} = index_cjs;
    const {initPromise: initPromise$1} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res$1 = initPromise$1.then(_ => loadShare$1("@react-three/drei", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^10.1.2"
    }}}));
    const exportModule$1 = await res$1.then(factory => factory());
    var k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__ = exportModule$1;

// dev uses dynamic import to separate chunks
    
    const {loadShare} = index_cjs;
    const {initPromise} = k3_mf_2_ring__mf_v__runtimeInit__mf_v__;
    const res = initPromise.then(_ => loadShare("@react-three/fiber", {
    customShareInfo: {shareConfig:{
      singleton: true,
      strictVersion: false,
      requiredVersion: "^9.1.2"
    }}}));
    const exportModule = await res.then(factory => factory());
    var k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__ = exportModule;

const FALLBACK_COLOR = "#888888";
const BOX_SIZE = 0.4;
const BOX_GAP = 0.05;
function valueToColor(v) {
  return (typeof v?.value === "string" ? v.value : null) ?? v?.key ?? FALLBACK_COLOR;
}
const TexturedBox = ({
  url,
  color,
  size
}) => {
  const texture = k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useLoader(k3_mf_2_ring__loadShare__three__loadShare__.TextureLoader, url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [size, size, size] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        color,
        emissiveMap: texture,
        emissive: new k3_mf_2_ring__loadShare__three__loadShare__.Color(16777215),
        emissiveIntensity: 0.5
      }
    )
  ] });
};
const PlainBox = ({ color, size }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [size, size, size] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color })
] });
const ImageBadgePlane = ({ url }) => {
  const texture = k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_fiber__loadShare__.useLoader(k3_mf_2_ring__loadShare__three__loadShare__.TextureLoader, url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [0.22, 0.22] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { map: texture })
  ] });
};
const BadgeRenderer = ({
  value
}) => {
  if (value === null || value === undefined) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.1, 0.02, 8, 24] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#6b7280" })
    ] });
  }
  if (typeof value === "boolean") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.08, 12, 12] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: value ? "#22c55e" : "#ef4444" })
    ] });
  }
  if (typeof value === "number") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.1, 0.03, 8, 24] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#f59e0b" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Text, { fontSize: 0.09, color: "#f59e0b", anchorX: "center", anchorY: "middle", children: String(Math.round(value)) })
    ] });
  }
  if (typeof value === "string") {
    if (value.length === 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.1, 0.015, 8, 4] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#a5f3fc" })
      ] });
    }
    if (/^(https?:|blob:|data:|\/)/.test(value)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        k3_mf_2_ring__loadShare__react__loadShare__.Suspense,
        {
          fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [0.22, 0.22] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#374151", wireframe: true })
          ] }),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageBadgePlane, { url: value })
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [0.28, 0.14] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#0e2a30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Text,
        {
          fontSize: 0.09,
          color: "#a5f3fc",
          anchorX: "center",
          anchorY: "middle",
          position: [0, 0, 0.01],
          children: value.length > 12 ? value.slice(0, 11) + "…" : value
        }
      )
    ] });
  }
  if (typeof value === "object" && "key" in value) {
    const v = value;
    const swatchColor = (typeof v.value === "string" ? v.value : null) ?? v.key ?? "#888";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [-0.07, 0, 0], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [0.1, 0.1, 0.02] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: swatchColor })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Text,
        {
          position: [0.05, 0, 0],
          fontSize: 0.07,
          color: "white",
          anchorX: "left",
          anchorY: "middle",
          children: v.key ?? v.label ?? ""
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [0.1, 0.02, 8, 24] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#6b7280" })
  ] });
};
const VariableRefDemoComponent = (props) => {
  const {
    position,
    rotation,
    scale,
    id,
    countVar,
    labelVar,
    activeVar,
    colorVar,
    imageVar,
    anyVar
  } = props;
  console.log(`[VariableRefDemo] ${id}`, {
    countVar,
    labelVar,
    activeVar,
    colorVar,
    imageVar,
    anyVar
  });
  const stackCount = typeof countVar === "number" ? Math.max(1, Math.round(countVar)) : 1;
  const modelVisible = activeVar !== false;
  const color = valueToColor(colorVar);
  const imageUrl = typeof imageVar === "string" && imageVar.length > 0 ? imageVar : null;
  const totalHeight = stackCount * (BOX_SIZE + BOX_GAP);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "group",
    {
      position,
      rotation,
      scale,
      userData: { modelId: id },
      children: [
        modelVisible && Array.from({ length: stackCount }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [0, i * (BOX_SIZE + BOX_GAP), 0], children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(k3_mf_2_ring__loadShare__react__loadShare__.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(PlainBox, { color, size: BOX_SIZE }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TexturedBox, { url: imageUrl, color, size: BOX_SIZE }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PlainBox, { color, size: BOX_SIZE }) }, i)),
        anyVar !== null && anyVar !== undefined && /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [0, totalHeight + 0.55, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeRenderer, { value: anyVar }) }),
        labelVar != null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          k3_mf_2_ring__loadShare___mf_0_react_mf_2_three_mf_1_drei__loadShare__.Text,
          {
            position: [0, totalHeight + 0.3, 0],
            fontSize: 0.15,
            color: modelVisible ? "white" : "#555555",
            anchorX: "center",
            anchorY: "bottom",
            children: labelVar
          }
        )
      ]
    }
  );
};
const dynamicVariableRefDemo = {
  type: "variableRefDemo",
  label: "Variable Ref Demo",
  description: `<p><strong>Variable Reference Demo</strong></p>
<p>Dieses Dynamic Model demonstriert, wie ein Plugin über <em>VariableRef</em>-Props zur Laufzeit auf Konfigurator-Variablen zugreift. Im Gegensatz zu reinen Expression-Props wird hier kein statischer Zahlenwert übergeben, sondern eine direkte Referenz auf das Variable-Objekt.</p>
<p>Folgende Prop-Typen werden demonstriert:</p>
<ul>
  <li><strong>countVar</strong> – Numerische Variable; der Wert wird als Zähler im 3D-Mesh angezeigt</li>
  <li><strong>labelVar</strong> – Textvariable; wird als Label über dem Objekt gerendert</li>
  <li><strong>activeVar</strong> – Boolean-Variable; steuert die Sichtbarkeit der Komponente</li>
  <li><strong>colorVar</strong> – Farb- oder Listenvariable; steuert die Mesh-Farbe zur Laufzeit</li>
  <li><strong>imageVar</strong> – Bild- oder Upload-Variable; wird als Textur auf das Mesh gemappt</li>
  <li><strong>anyVar</strong> – Universelle Variable; zeigt Typ und aktuellen Wert als Status-Badge</li>
</ul>
<p>Dieses Modell eignet sich als Referenzimplementierung für alle Plugins, die Konfigurationsdaten direkt in die 3D-Szene einbinden müssen, ohne eigene Datenpfade aufzubauen.</p>`,
  disabledForAR: false,
  materials: [],
  tag: "demo",
  component: VariableRefDemoComponent,
  propsDialog: {
    basic: { type: "basic" },
    countVar: {
      type: "variable",
      label: "Count (number)",
      allowedTypes: [VariableType.Number]
    },
    labelVar: {
      type: "variable",
      label: "Label (text)",
      allowedTypes: [VariableType.Text]
    },
    activeVar: {
      type: "variable",
      label: "Visible (boolean)",
      allowedTypes: [VariableType.Boolean]
    },
    colorVar: {
      type: "variable",
      label: "Color / List (Value object)",
      allowedTypes: [VariableType.Color, VariableType.List]
    },
    imageVar: {
      type: "variable",
      label: "Texture (image / upload URL)",
      allowedTypes: [VariableType.Image, VariableType.Upload]
    },
    anyVar: {
      type: "variable",
      label: "Status badge (any type)",
      allowedTypes: [
        VariableType.Boolean,
        VariableType.Number,
        VariableType.Text,
        VariableType.Color,
        VariableType.List,
        VariableType.Image,
        VariableType.Upload
      ]
    }
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" }
  }
};

const LegacyBox = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "group",
  {
    position: props.position,
    scale: [props.width, props.height, props.depth],
    userData: { modelId: props.id },
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [1, 1, 1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshStandardMaterial", { color: "#f97316", wireframe: false })
    ] })
  }
);
const dynamicLegacyModel = {
  type: "legacyBox",
  label: "Legacy Box (shim test)",
  description: `<p><strong>Legacy Dynamic Model (Shim-Test)</strong></p>
<p>Dieses Modell wird über den <em>veralteten</em> <code>plugin.dynamicModels</code>-Pfad registriert und testet den Backward-Compatibility-Shim von K3. Intern mappt K3 diesen Eintrag automatisch auf <code>viewer.models</code>.</p>
<p><strong>Wichtig für Plugin-Entwickler:</strong> Neue Plugins sollten Dynamic Models ausschließlich über <code>viewer.models</code> registrieren. Der Shim bleibt für bestehende Plugins erhalten, wird aber in zukünftigen Hauptversionen entfernt.</p>`,
  disabledForAR: false,
  component: LegacyBox,
  propsDialog: {
    basic: { type: "basic" }
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" }
  },
  materials: [],
  screenshot: undefined
};

const PriceDisplay = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.Stack, { direction: "row", gap: 3, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { children: [
      "Price: ",
      props.totalPrice ?? 0
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.Typography, { children: [
      "BOM lines: ",
      props.bom.length
    ] })
  ] });
};

const SLOT_COLORS = {
  // layout
  root: "#7c3aed",
  header: "#db2777",
  sidebar: "#0891b2",
  sidebarHeader: "#0e7490",
  sidebarFooter: "#164e63",
  footer: "#b45309",
  contentView: "#15803d",
  gallery: "#b91c1c",
  branding: "#6d28d9",
  logo: "#c026d3",
  navigationButtons: "#d97706",
  exitButtons: "#dc2626",
  sceneButtons: "#2563eb",
  price: "#16a34a",
  labelActionDisplay: "#7c3aed",
  mobileLabelActionDisplay: "#9333ea",
  invalidRuleModal: "#ef4444",
  mountedWhenLoaded: "#059669",
  configurator: "#0284c7",
  groupLabel: "#ca8a04",
  groupPanel: "#ea580c",
  additionalGroups: "#8b5cf6",
  additionalVars: "#10b981",
  variableLabel: "#f43f5e",
  // dialogs - order
  orderRoot: "#6366f1",
  orderHeadline: "#8b5cf6",
  orderContactFields: "#a855f7",
  orderPriceTable: "#ec4899",
  orderPriceTableSelectionList: "#ec4899",
  orderPriceTableArticleList: "#f472b6",
  orderPriceTableTotal: "#fb7185",
  orderConfirmationSuccess: "#22c55e",
  orderConfirmationError: "#ef4444",
  // dialogs - warnings
  warningInvalidSelection: "#f97316",
  warningInvalidSelectionIcon: "#fb923c",
  warningInvalidSelectionTooltip: "#fdba74",
  warningNumberWarningTooltip: "#fbbf24",
  // viewer
  canvas: "#1d4ed8",
  demoScene: "#0f766e",
  labelsDisplay: "#7c2d12",
  labelsMobile: "#92400e"
};
const LABEL_STYLE = {
  position: "absolute",
  top: 0,
  left: 0,
  fontSize: 9,
  fontFamily: "monospace",
  color: "#fff",
  padding: "1px 4px",
  pointerEvents: "none",
  zIndex: 9999,
  borderRadius: "0 0 3px 0",
  opacity: 0.85
};
const FILL_SLOTS = /* @__PURE__ */ new Set([
  "root",
  "canvas",
  "contentView",
  "configurator",
  "demoScene",
  "labelsDisplay",
  "labelsMobile"
]);
const WRAPPER_STYLE = (color, fill) => ({
  position: "relative",
  outline: `1px dashed ${color}`,
  outlineOffset: -1,
  ...fill && {
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    flex: "1 1 auto"
  }
});
const createSlotHOC = (slotKey) => (Wrapped) => (props) => {
  const color = SLOT_COLORS[slotKey] ?? "#888";
  const fill = FILL_SLOTS.has(slotKey);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: WRAPPER_STYLE(color, fill), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...LABEL_STYLE, background: color }, children: slotKey }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Wrapped, { ...props })
  ] });
};

const DemoGenericInput = ({
  variable,
  selection,
  values,
  onChange,
  disabled
}) => {
  const firstValue = values?.[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        padding: "8px 12px",
        background: "#f1f5f9",
        border: "1px dashed #94a3b8",
        borderRadius: 4,
        fontSize: 11,
        fontFamily: "monospace"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontWeight: 700, marginBottom: 4 }, children: [
          "[",
          variable.type,
          "] ",
          variable.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#475569", marginBottom: 6 }, children: [
          "selection: ",
          JSON.stringify(selection?.id ?? null)
        ] }),
        firstValue && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled,
            onClick: () => onChange(firstValue.id),
            style: { fontSize: 10, padding: "2px 6px", cursor: "pointer" },
            children: "select first value"
          }
        )
      ]
    }
  );
};
const createGenericInput = (_type) => DemoGenericInput;

const Plugin = {
  id: "oc.sample-plugin",
  version: "1.0.0",
  // ── UI & Layout ──────────────────────────────────────────────────────────
  ui: {
    layout: {
      root: {
        hoc: createSlotHOC("root"),
        description: `<p><strong>Root-Komponente</strong></p><p>Überschreibt die oberste Wrapper-Komponente der gesamten Applikation. Dieser Slot umhüllt <em>alles</em> — Header, Sidebar, Content und Footer. Änderungen hier wirken sich auf das gesamte Layout aus. Geeignet für globale Theme-Provider, Fehler-Boundaries oder App-weite Kontexte, die nicht in den Standard-Redux-Store passen.</p>`
      },
      header: {
        hoc: createSlotHOC("header"),
        description: {
          de: "Überschreibt die Kopfzeile.",
          en: "Overrides the header bar."
        }
      },
      sidebar: {
        hoc: createSlotHOC("sidebar"),
        description: "Überschreibt die Seitennavigation."
      },
      sidebarHeader: {
        hoc: createSlotHOC("sidebarHeader"),
        description: "Überschreibt den Kopfbereich der Seitenleiste."
      },
      sidebarFooter: {
        hoc: createSlotHOC("sidebarFooter"),
        description: "Überschreibt den Fußbereich der Seitenleiste."
      },
      footer: {
        hoc: createSlotHOC("footer"),
        description: "Überschreibt die Fußzeile."
      },
      contentView: {
        hoc: createSlotHOC("contentView"),
        description: "Überschreibt den Hauptinhaltsbereich."
      },
      gallery: {
        hoc: createSlotHOC("gallery"),
        description: "Überschreibt die Galerieansicht."
      },
      branding: {
        hoc: createSlotHOC("branding"),
        description: "Überschreibt die Branding-Komponente."
      },
      logo: {
        hoc: createSlotHOC("logo"),
        description: "Überschreibt das Logo. Das Sample-Plugin fügt rechts neben dem Logo ein Demo-Badge ein."
      },
      navigationButtons: {
        hoc: createSlotHOC("navigationButtons"),
        description: "Überschreibt die Navigationsschaltflächen."
      },
      exitButtons: {
        hoc: createSlotHOC("exitButtons"),
        description: "Überschreibt die Beenden-Schaltflächen."
      },
      sceneButtons: {
        hoc: createSlotHOC("sceneButtons"),
        description: "Überschreibt die Szenen-Schaltflächen."
      },
      price: {
        hoc: createSlotHOC("price"),
        description: "Überschreibt die Preisanzeige. Dieses Plugin zeigt den Preis im eigenen Format."
      },
      labelActionDisplay: {
        hoc: createSlotHOC("labelActionDisplay"),
        description: "Überschreibt die Label-Aktionsanzeige."
      },
      mobileLabelActionDisplay: {
        hoc: createSlotHOC("mobileLabelActionDisplay"),
        description: "Überschreibt die mobile Label-Aktionsanzeige."
      },
      invalidRuleModal: {
        hoc: createSlotHOC("invalidRuleModal"),
        description: "Überschreibt das Modal für ungültige Regeln."
      },
      mountedWhenLoaded: {
        hoc: createSlotHOC("mountedWhenLoaded"),
        description: "Wird nach dem vollständigen Laden eingehängt."
      },
      configurator: {
        hoc: createSlotHOC("configurator"),
        description: "Überschreibt die Konfigurator-Hauptkomponente."
      },
      groupLabel: {
        hoc: createSlotHOC("groupLabel"),
        description: "Überschreibt die Gruppenbezeichnung in der Seitenleiste."
      },
      groupPanel: {
        hoc: createSlotHOC("groupPanel"),
        description: "Überschreibt das Gruppenfeld in der Seitenleiste."
      },
      additionalGroups: {
        hoc: createSlotHOC("additionalGroups"),
        description: "Ermöglicht das Hinzufügen zusätzlicher Gruppen."
      },
      additionalVars: {
        hoc: createSlotHOC("additionalVars"),
        description: "Ermöglicht das Hinzufügen zusätzlicher Variablen."
      },
      variableLabel: {
        hoc: createSlotHOC("variableLabel"),
        description: `<p><strong>Variablenbezeichnung</strong></p><p>Überschreibt die Bezeichnungskomponente neben jeder Variablen-Eingabe in der Seitenleiste. Typische Anwendungsfälle:</p><ul><li>Eigene Tooltip-Icons neben dem Label platzieren</li><li>Pflichtfeld-Markierungen (*) dynamisch einblenden</li><li>Barrierefreiheits-Ergänzungen (aria-describedby auf den Eingabekontext)</li><li>Mehrsprachige Labels aus eigener Übersetzungsquelle laden</li></ul>`
      }
    },
    inputs: {
      list: [
        {
          key: "sample.list",
          label: "List Demo",
          description: `<p><strong>Benutzerdefinierte Listenansicht</strong></p><p>Ersetzt die Standard-Radiobutton-Liste durch eine vollständig angepasste Darstellung. Der Slot erhält alle Werte der Variable als <code>values[]</code> und kann die Auswahl über <code>onChange(valueId)</code> committen.</p><p>Mögliche Einsatzszenarien: Bild-Kacheln, horizontale Chip-Leiste, Karten-Layout mit Vorschau, oder eine suchbare Dropdown-Liste für sehr viele Optionen.</p>`,
          component: createGenericInput()
        }
      ],
      color: [
        {
          key: "sample.colorChooser",
          label: "Farbwähler",
          description: {
            de: "Erweiterter Farbwähler mit HEX-Eingabe.",
            en: "Enhanced color picker with HEX input."
          },
          component: ColorChooser
        }
      ],
      number: [
        {
          key: "sample.slider",
          label: "Slider Demo",
          description: "Numerische Variablen als Schieberegler darstellen.",
          component: DemoSliderInput
        }
      ],
      text: [
        {
          key: "sample.text",
          label: "Text Demo",
          description: "Benutzerdefinierte Textdarstellung.",
          component: createGenericInput()
        }
      ],
      boolean: [
        {
          key: "sample.boolean",
          label: "Boolean Demo",
          description: "Benutzerdefinierte Umschalter-Darstellung.",
          component: createGenericInput()
        }
      ],
      image: [
        {
          key: "sample.image",
          label: "Image Demo",
          description: "Benutzerdefinierte Bildauswahl.",
          component: createGenericInput()
        }
      ],
      upload: [
        {
          key: "sample.upload",
          label: "Upload Demo",
          description: "Benutzerdefiniertes Upload-Steuerelement.",
          component: createGenericInput()
        }
      ],
      components: [
        {
          key: "sample.components",
          label: "Components Demo",
          description: "Benutzerdefinierte Komponentenauswahl.",
          component: createGenericInput()
        }
      ],
      information: [
        {
          key: "sample.information",
          label: "Information Demo",
          description: "Benutzerdefinierte Informationsanzeige.",
          component: createGenericInput()
        }
      ]
    },
    dialogs: {
      order: {
        root: {
          hoc: createSlotHOC("orderRoot"),
          description: "Überschreibt das Bestell-Dialog-Root."
        },
        headline: {
          hoc: createSlotHOC("orderHeadline"),
          description: "Überschreibt die Überschrift des Bestelldialogs."
        },
        contactFields: {
          hoc: createSlotHOC("orderContactFields"),
          description: "Überschreibt die Kontaktfelder im Bestelldialog."
        },
        priceTable: {
          hoc: createSlotHOC("orderPriceTable"),
          description: "Überschreibt die Preistabelle im Bestelldialog."
        },
        priceTableSelectionList: {
          hoc: createSlotHOC("orderPriceTableSelectionList"),
          description: "Überschreibt die Auswahlliste in der Preistabelle."
        },
        priceTableArticleList: {
          hoc: createSlotHOC("orderPriceTableArticleList"),
          description: "Überschreibt die Artikelliste in der Preistabelle."
        },
        priceTableTotal: {
          hoc: createSlotHOC("orderPriceTableTotal"),
          description: "Überschreibt die Gesamtanzeige in der Preistabelle."
        },
        confirmationSuccess: {
          hoc: createSlotHOC("orderConfirmationSuccess"),
          description: "Überschreibt die Erfolgsbestätigung nach der Bestellung."
        },
        confirmationError: {
          hoc: createSlotHOC("orderConfirmationError"),
          description: "Überschreibt die Fehleranzeige nach einer fehlgeschlagenen Bestellung."
        }
      },
      warnings: {
        invalidSelection: {
          hoc: createSlotHOC("warningInvalidSelection"),
          description: "Überschreibt die Warnung bei ungültiger Auswahl."
        },
        invalidSelectionIcon: {
          hoc: createSlotHOC("warningInvalidSelectionIcon"),
          description: "Überschreibt das Icon für ungültige Auswahl."
        },
        invalidSelectionTooltip: {
          hoc: createSlotHOC("warningInvalidSelectionTooltip"),
          description: "Überschreibt den Tooltip bei ungültiger Auswahl."
        },
        numberWarningTooltip: {
          hoc: createSlotHOC("warningNumberWarningTooltip"),
          description: "Überschreibt den Tooltip bei ungültigem Zahlenwert."
        }
      }
    }
  },
  // ── Viewer & 3D ──────────────────────────────────────────────────────────
  viewer: {
    canvas: {
      hoc: createSlotHOC("canvas"),
      description: "Überschreibt den 3D-Canvas-Bereich."
    },
    customLayoutComponents: {
      // One can add it to the scene via <CustomLayoutComponent name="PriceDisplay2" price="2"/>.
      PriceDisplay2: PriceDisplay
    },
    models: [dynamicRing, dynamicVariableRefDemo],
    labels: {
      display: {
        hoc: createSlotHOC("labelsDisplay"),
        description: "Überschreibt die Desktop-Label-Anzeige im 3D-Viewer."
      },
      mobile: {
        hoc: createSlotHOC("labelsMobile"),
        description: "Überschreibt die mobile Label-Anzeige im 3D-Viewer."
      }
    }
  },
  // ── Logic & Events ───────────────────────────────────────────────────────
  logic: {
    config: {
      onUpdate: {
        fn: (config) => {
          console.log("[plugin] onUpdate", config);
          return config;
        },
        description: "Wird bei jeder Konfigurationsänderung aufgerufen. Ermöglicht das Transformieren der Konfiguration."
      },
      onSave: {
        fn: (config) => {
          console.log("[plugin] onSave", config);
          return config;
        },
        description: "Wird beim Speichern aufgerufen. Kann die Konfiguration vor dem Speichern modifizieren."
      },
      onSaveFiles: {
        fn: (files) => {
          console.log("[plugin] onSaveFiles", files);
          return files;
        },
        description: "Ermöglicht das Anpassen der zu speichernden Dateien."
      },
      onSaveEvent: {
        fn: (payload) => {
          console.log("[plugin] onSaveEvent", payload);
          return payload;
        },
        description: "Wird mit dem vollständigen Speicher-Event-Payload aufgerufen."
      }
    },
    camera: {
      onSetScreenshotCameras: {
        fn: (cameras) => {
          console.log("[plugin] onSetScreenshotCameras", cameras);
          return cameras;
        },
        description: "Ermöglicht das Anpassen der Screenshot-Kameras."
      },
      onSetCameraList: {
        fn: (cameras) => {
          console.log("[plugin] onSetCameraList", cameras);
          return cameras;
        },
        description: "Ermöglicht das Anpassen der Kameraliste."
      },
      getScreenshotDimensions: {
        fn: (dim) => {
          console.log("[plugin] getScreenshotDimensions", dim);
          return dim;
        },
        description: "Ermöglicht das Anpassen der Screenshot-Abmessungen."
      }
    },
    core: {
      preprocessFullApp: {
        fn: (app) => {
          console.log("[plugin] preprocessFullApp", app);
          return app;
        },
        description: "Ermöglicht das Vorverarbeiten der vollständigen App-Daten vor dem Laden."
      },
      onOpenPdf: {
        fn: (result) => {
          console.log("[plugin] onOpenPdf", result);
        },
        description: "Wird aufgerufen wenn ein PDF geöffnet wird."
      },
      onExportAR: {
        fn: async (ctx) => {
          console.log("[plugin] onExportAR", ctx);
          return new Blob();
        },
        description: "Ermöglicht einen benutzerdefinierten AR-Export."
      }
    }
  },
  // ── Legacy (shim tests) ──────────────────────────────────────────────────
  /** @deprecated mapped to viewer.models internally */
  dynamicModels: [dynamicLegacyModel]
};

export { Plugin as default };
