/**
 * 3D side of the HoverInfo demo.
 *
 * A dynamic model that highlights on hover and opens a context popup on
 * click. The popup (see InfoPopup.tsx) renders the K3 `StandaloneVariable`
 * component for every variable picked in this model's props dialog —
 * the admin selects the variables via the `type: "variable"` props below.
 */
import type { ThreeEvent } from "@react-three/fiber";
import { DynamicModel } from "k3-plugin-api";
import { useState } from "react";
import { openInfoPopup } from "./InfoPopup";

/** K3 resolves variable props to their runtime VALUES before passing them to
 * the component; the raw refs arrive separately in props.variableRefs
 * (keyed by prop name) — that is where the variable identity for the popup
 * comes from. */
const variableIdsFromProps = (props: any): (number | string)[] =>
  Object.values(
    (props.variableRefs ?? {}) as Record<
      string,
      { variableId: number | string }
    >,
  ).map((ref) => ref.variableId);

// eslint-disable-next-line react-refresh/only-export-components
const HoverInfoMesh = (props: any) => {
  const [hovered, setHovered] = useState(false);
  const variableIds = variableIdsFromProps(props);

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    openInfoPopup(
      e.nativeEvent.clientX,
      e.nativeEvent.clientY,
      variableIds,
    );
  };

  return (
    <group
      position={props.position}
      scale={[props.width, props.height, props.depth]}
      userData={{ modelId: props.id }} // camera focusing needs the modelId
    >
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={onClick}
        scale={hovered ? 1.05 : 1}
      >
        <torusKnotGeometry args={[0.4, 0.12, 96, 16]} />
        <meshStandardMaterial
          color={hovered ? "#00c4ff" : "#00A4DD"}
          emissive={hovered ? "#004a66" : "#000000"}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

export const hoverInfoModel: DynamicModel = {
  type: "hoverInfoDemo",
  label: "Hover-Info Demo",
  description: `<p><strong>Hover-Info Demo</strong></p>
<p>Ein 3D-Modell, das beim Hovern hervorgehoben wird und beim Klick ein
Kontext-Popup öffnet. Das Popup rendert die im Props-Dialog ausgewählten
Merkmale als vollwertige K3-Eingabekomponenten (<em>StandaloneVariable</em>)
sowie den Live-Gesamtpreis — direkt aus dem Plugin heraus über die
k3-plugin-api Komponenten-Proxies und <em>K3Providers</em>.</p>`,
  disabledForAR: false,
  materials: [],
  tag: "demo",
  component: HoverInfoMesh,
  propsDialog: {
    basic: { type: "basic" },
    popupVar1: { type: "variable", label: "Popup Merkmal 1" },
    popupVar2: { type: "variable", label: "Popup Merkmal 2" },
    popupVar3: { type: "variable", label: "Popup Merkmal 3" },
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
  },
};
