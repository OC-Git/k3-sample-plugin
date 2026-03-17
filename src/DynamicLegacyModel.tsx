/**
 * DynamicLegacyModel — tests the legacy `dynamicModels` shim path.
 * Placed via `plugin.dynamicModels` (deprecated) instead of `viewer.models`.
 * K3 internally maps it to viewer.models.
 */
import { DynamicModel } from "k3-plugin-api";

const LegacyBox = (props: any) => (
  <group
    position={props.position}
    scale={[props.width, props.height, props.depth]}
    userData={{ modelId: props.id }}
  >
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#f97316"
        wireframe={false}
      />
    </mesh>
  </group>
);

export const dynamicLegacyModel: DynamicModel = {
  type: "legacyBox",
  label: "Legacy Box (shim test)",
  disabledForAR: false,
  component: LegacyBox,
  propsDialog: {
    basic: { type: "basic" },
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
  },
  materials: [],
  screenshot: undefined as unknown as string,
};
