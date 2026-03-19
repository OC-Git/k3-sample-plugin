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
      <meshStandardMaterial color="#f97316" wireframe={false} />
    </mesh>
  </group>
);

export const dynamicLegacyModel: DynamicModel = {
  type: "legacyBox",
  label: "Legacy Box (shim test)",
  description: `<p><strong>Legacy Dynamic Model (Shim-Test)</strong></p>
<p>Dieses Modell wird über den <em>veralteten</em> <code>plugin.dynamicModels</code>-Pfad registriert und testet den Backward-Compatibility-Shim von K3. Intern mappt K3 diesen Eintrag automatisch auf <code>viewer.models</code>.</p>
<p><strong>Wichtig für Plugin-Entwickler:</strong> Neue Plugins sollten Dynamic Models ausschließlich über <code>viewer.models</code> registrieren. Der Shim bleibt für bestehende Plugins erhalten, wird aber in zukünftigen Hauptversionen entfernt.</p>`,
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
