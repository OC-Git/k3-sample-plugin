import { a as __mf_2, _ as __mf_1 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.mjs-fXKQsZNi.js';
import { a as __mf_98, b as __mf_57, c as __mf_122, d as __mf_128 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_mui_mf_1_material__loadShare__.mjs-HrW_Roe4.js';
import { s as __mf_398, L as __mf_38, bl as __mf_335, r as __mf_397, bu as __mf_47, aV as __mf_113 } from './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__three__loadShare__.mjs-bRXpUYHh.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_mui_mf_1_styled_mf_2_engine__loadShare__.mjs-B0xJGbBg.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_styled__loadShare__.mjs-CTKGR522.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_react__loadShare__.mjs-DfArSKTg.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react__loadShare__.mjs-Cg0rfq73.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare___mf_0_emotion_mf_1_cache__loadShare__.mjs-D_qBeFsO.js';
import './_virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react_mf_2_dom__loadShare__.mjs-6F4dlPkB.js';
import './__virtual_mf___mfe_internal__k3_mf_2_ring__loadShare__react__loadShare__.mjs_commonjs-proxy-BhAEIthT.js';

const ColorChooser = (props) => {
  const valueId = props.values?.[0]?.id;
  return /* @__PURE__ */ __mf_2(__mf_98, { direction: "row", gap: 3, children: [
    /* @__PURE__ */ __mf_1(
      __mf_57,
      {
        type: "color",
        "data-cy": "color-picker-input",
        sx: { width: "60px" },
        value: "" + props.selection?.data?.inputText || "#000000",
        onChange: (e) => valueId != null && props.onChange(valueId, {
          inputValue: void 0,
          inputText: e.target.value
        })
      }
    ),
    /* @__PURE__ */ __mf_1(
      __mf_122,
      {
        value: props.selection?.data?.inputText,
        label: props.variable.label,
        disabled: true,
        fullWidth: true
      }
    )
  ] });
};

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
	const verts = [ new __mf_398(), new __mf_398(), new __mf_398() ];
	const tempVec1 = new __mf_398();
	const tempVec2 = new __mf_398();
	const tempNorm = new __mf_398();
	const tempNorm2 = new __mf_398();

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
		const normal = new __mf_398().crossVectors( tempVec1, tempVec2 ).normalize();
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
	const normAttr = new __mf_38( normalArray, 3, false );
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
      new __mf_398(
        r * Math.sin(i * Math.PI * 2 / props.segmentCount + Math.PI),
        r * Math.cos(i * Math.PI * 2 / props.segmentCount + Math.PI),
        0
      )
    );
  }
  const path = new __mf_47(points, true);
  const extrudeSettings = {
    steps: props.segmentCount,
    curveSegments: 20,
    bevelEnabled: false,
    extrudePath: path
  };
  const bufferExtrudeGeometry = new __mf_113(
    props.shape,
    extrudeSettings
  );
  const creasedGeometry = toCreasedNormals(
    bufferExtrudeGeometry,
    Math.PI / 2
  );
  return /* @__PURE__ */ __mf_1("mesh", { geometry: creasedGeometry, material: props.material, children: props.children });
};
const Ring = (props) => {
  const vGap = props.vGap;
  const vWidth = 4 + vGap;
  const gap = vGap / 50;
  const sink = 0.05;
  const rx = vWidth / 50;
  const ry = 0.05;
  const shape1 = new __mf_335();
  shape1.moveTo(gap, -ry);
  shape1.splineThru([
    new __mf_397(gap, -ry),
    new __mf_397(rx, -0.8 * ry),
    new __mf_397(rx, 0.8 * ry),
    new __mf_397(gap, ry)
  ]);
  shape1.lineTo(gap, -ry);
  const shape2 = new __mf_335();
  shape2.moveTo(gap, -ry + sink);
  shape2.lineTo(gap, ry - sink);
  shape2.lineTo(-gap, ry - sink);
  shape2.lineTo(-gap, -ry + sink);
  shape2.lineTo(gap, -ry + sink);
  const shape3 = new __mf_335();
  shape3.moveTo(-gap, -ry);
  shape3.splineThru([
    new __mf_397(-gap, -ry),
    new __mf_397(-rx, -0.8 * ry),
    new __mf_397(-rx, 0.8 * ry),
    new __mf_397(-gap, ry)
  ]);
  shape3.lineTo(-gap, -ry);
  return /* @__PURE__ */ __mf_2("group", { ...props, children: [
    /* @__PURE__ */ __mf_1(
      Segment,
      {
        shape: shape1,
        radius: props.radius,
        segmentCount: props.segmentCount,
        material: props.materials?.outer
      }
    ),
    gap > 0 && /* @__PURE__ */ __mf_1(
      Segment,
      {
        shape: shape2,
        radius: props.radius,
        segmentCount: props.segmentCount,
        material: props.materials?.inner
      }
    ),
    /* @__PURE__ */ __mf_1(
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
  return /* @__PURE__ */ __mf_1(
    "group",
    {
      position: props.position,
      scale: [props.width, props.height, props.depth],
      userData: { modelId: props.id },
      children: /* @__PURE__ */ __mf_1(
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
  description: "Sample wedding ring 3D model for K3 configurator",
  disabledForAR: false,
  component: WeddingRing,
  propsDialog: {
    basic: { type: "basic" },
    radius: {},
    vGap: {},
    segmentCount: {}
  },
  defaultProps: {
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

const PriceDisplay = (props) => {
  return /* @__PURE__ */ __mf_2(__mf_98, { direction: "row", gap: 3, children: [
    /* @__PURE__ */ __mf_2(__mf_128, { children: [
      "Anzahl Artikel: ",
      props.bom.length
    ] }),
    /* @__PURE__ */ __mf_2(__mf_128, { children: [
      "Preis: ",
      props.totalPrice
    ] })
  ] });
};

const Plugin = {
  id: "sample.ring-plugin",
  version: "0.0.0",
  ui: {
    inputs: {
      color: [
        {
          key: "colorChooser",
          label: "Farbwähler",
          description: "Custom color picker with hex input",
          component: ColorChooser
        }
      ]
    }
  },
  viewer: {
    models: [dynamicRing],
    customLayoutComponents: { PriceDisplay }
  }
};

export { Plugin as default };
