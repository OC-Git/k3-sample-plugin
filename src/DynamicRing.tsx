/**
 * dynamicRing — a DynamicModel that renders a parametric 3D wedding ring.
 *
 * This file demonstrates the minimal DynamicModel setup:
 *   - A plain R3F component as the 3D view
 *   - Expression-based numeric props (radius, vGap, segmentCount)
 *   - Two named material slots (outer / inner)
 *
 * See DynamicVariableRefDemo.tsx for advanced features such as VariableRef
 * props, per-instance resolution, and sub-group highlighting.
 */

import { Ring } from "./Ring";
import Image from "../public/Image.png";
import { DynamicModel } from "k3-plugin-api";
import type * as THREE from "three";
// import { useMemo } from "react";

type WeddingRingProps = {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  width: number;
  height: number;
  depth: number;
  radius: number;
  vGap: number;
  segmentCount: number;
  materials: Record<string, THREE.Material>;
};

/**
 * The React (R3F) component K3 renders for each placed instance.
 *
 * K3 injects the following props automatically in addition to everything
 * declared in `propsDialog` / `defaultProps`:
 *   id        — unique instance ID (string); put on userData.modelId so
 *               the camera "focus" feature can find the mesh.
 *   materials — map of material name → THREE.Material, keyed by the
 *               strings listed in `dynamicRing.materials`.
 *   position, rotation, scale — set by the "basic" propsDialog editor.
 */
// eslint-disable-next-line react-refresh/only-export-components
const WeddingRing = (props: WeddingRingProps) => {
  console.log("WeddingRing props", props);

  // useMemo(() => {
  //   console.log("useMemo");
  // }, [props.jewel]);
  return (
    <group
      position={props.position}
      scale={[props.width, props.height, props.depth]}
      userData={{ modelId: props.id }} // Add modelId to userData so camera focusing works
    >
      <Ring
        radius={props.radius}
        segmentCount={props.segmentCount}
        vGap={props.vGap}
        materials={props.materials}
      />
      {/* 
      <Diamond
        model={props.jewel[0].model.path}
        position={[0, props.vGap / 2, 0]}
        scale={[props.radius * 0.3, props.radius * 0.3, props.radius * 0.3]}
      /> */}
    </group>
  );
};

/**
 * DynamicModel definition — this object is what K3 reads at runtime.
 *
 * type          — unique string identifier; must be stable across deploys
 *                 because it is persisted in saved scene data.
 * label         — display name shown in the admin "Add Model" picker.
 * component     — the R3F component above.
 * propsDialog   — defines what the admin configures per-instance.
 *                 `basic: { type: "basic" }` adds the built-in
 *                 position / rotation / scale editor.
 *                 Other keys create expression input fields; the key
 *                 becomes the prop name passed to the component.
 * defaultProps  — initial expressions evaluated when an instance is first
 *                 placed. Use `{ expression: "<math or literal>" }`.
 * materials     — named material slots; the admin assigns a material asset
 *                 to each. The component receives them as `props.materials`.
 * screenshot    — thumbnail image shown in the admin model picker.
 * disabledForAR — set true to hide this model type from AR placement.
 */
export const dynamicRing: DynamicModel = {
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
    segmentCount: {},
  },
  defaultProps: {
    // width / height / depth are required when using the "basic" editor.
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    radius: { expression: "1" },
    vGap: { expression: "4" },
    segmentCount: { expression: "1" },
  },
  materials: ["outer", "inner"],
  screenshot: Image,
};
