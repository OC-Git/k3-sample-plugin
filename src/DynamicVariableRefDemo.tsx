/**
 * DynamicVariableRefDemo
 *
 * Demonstrates context-aware VariableRef resolution.
 * All VariableRef props are ResolvedVar<T> instances:
 *   - .root            → global value (null if variable is instance-only)
 *   - .forInstance(id) → 3-tier: exact instance → ancestor → root
 */

import {
  DynamicModel,
  ResolvedVar,
  VariableType,
  makePluginSubGroupVirtualId,
  type PluginModelContext,
  type Value,
  type ComponentVariableValue,
} from "k3-plugin-api";
import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// ---------------------------------------------------------------------------
// 3D component
// ---------------------------------------------------------------------------

/**
 * Props injected by K3 into the component:
 *   position / rotation / scale — set by the "basic" propsDialog editor
 *   width / height / depth       — required when using "basic"; expression-evaluated
 *   id                           — unique instance ID; put on userData.modelId so
 *                                  the camera "focus" feature can find the mesh
 *
 * All `*Var` props are ResolvedVar<T> instances (or null when no variable has
 * been assigned by the admin yet). See the top-level comment for the API.
 */
type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  width: number;
  height: number;
  depth: number;
  id: string;

  // All VariableRef props are ResolvedVar instances
  countVar: ResolvedVar<number | null> | null;
  labelVar: ResolvedVar<string | null> | null;
  activeVar: ResolvedVar<boolean | null> | null;
  colorVar: ResolvedVar<Value | null> | null;
  imageVar: ResolvedVar<string | null> | null;
  partsVar: ResolvedVar<ComponentVariableValue[] | null> | null;
  anyVar: ResolvedVar | null;
  // context is injected by K3 — provides runtime info about this placed instance:
  //   context.modelActionId  — the unique ID of this DynamicModel placement
  //                            (used to build sub-group virtual IDs for highlighting)
  //   context.registerSubGroup(instanceId) — registers a component instance as
  //                            a separately highlightable sub-group
  context: PluginModelContext;
};

const FALLBACK_COLOR = "#888888";
const BOX_SIZE = 0.4;
const BOX_GAP = 0.05;

function valueToColor(v: Value | null | undefined): string {
  return (
    (typeof v?.value === "string" ? v.value : null) ?? v?.key ?? FALLBACK_COLOR
  );
}

/** Renders a mesh with an emissive texture — only mounted when a URL is known. */
const TexturedBox = ({
  url,
  color,
  size,
}: {
  url: string;
  color: string;
  size: number;
}) => {
  const texture = useLoader(TextureLoader, url);
  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        emissiveMap={texture}
        emissive={new THREE.Color(0xffffff)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const PlainBox = ({ color, size }: { color: string; size: number }) => (
  <mesh>
    <boxGeometry args={[size, size, size]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const ImageBadgePlane = ({ url }: { url: string }) => {
  const texture = useLoader(TextureLoader, url);
  return (
    <mesh>
      <planeGeometry args={[0.22, 0.22]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

/**
 * Type-adaptive annotation badge.
 * Renders above a column to show whatever anyVar resolves to:
 *   null/undefined → gray dashed circle (variable selected, no value)
 *   boolean → green/red sphere
 *   number  → amber torus + counter
 *   string  → cyan text annotation
 *   Value   → colored swatch + key label
 *   array   → component count ring
 */
const BadgeRenderer = ({ value }: { value: unknown }) => {
  // Variable selected but no value → gray empty-state ring
  if (value === null || value === undefined) {
    return (
      <mesh>
        <torusGeometry args={[0.1, 0.02, 8, 24]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
    );
  }

  if (typeof value === "boolean") {
    return (
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={value ? "#22c55e" : "#ef4444"} />
      </mesh>
    );
  }

  if (typeof value === "number") {
    return (
      <group>
        <mesh>
          <torusGeometry args={[0.1, 0.03, 8, 24]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <Text fontSize={0.09} color="#f59e0b" anchorX="center" anchorY="middle">
          {String(Math.round(value))}
        </Text>
      </group>
    );
  }

  if (typeof value === "string") {
    if (value.length === 0) {
      return (
        <mesh>
          <torusGeometry args={[0.1, 0.015, 8, 4]} />
          <meshStandardMaterial color="#a5f3fc" />
        </mesh>
      );
    }
    // URL → image thumbnail (with placeholder fallback while loading)
    if (/^(https?:|blob:|data:|\/)/.test(value)) {
      return (
        <Suspense
          fallback={
            <mesh>
              <planeGeometry args={[0.22, 0.22]} />
              <meshStandardMaterial color="#374151" wireframe />
            </mesh>
          }
        >
          <ImageBadgePlane url={value} />
        </Suspense>
      );
    }
    return (
      <group>
        <mesh>
          <planeGeometry args={[0.28, 0.14]} />
          <meshStandardMaterial color="#0e2a30" />
        </mesh>
        <Text
          fontSize={0.09}
          color="#a5f3fc"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.01]}
        >
          {value.length > 12 ? value.slice(0, 11) + "…" : value}
        </Text>
      </group>
    );
  }

  // ComponentVariableValue[] — "4x Chair, 2x Table" style pill
  if (Array.isArray(value)) {
    const items = value as ComponentVariableValue[];
    const counts = new Map<string, number>();
    for (const it of items) {
      const label =
        it.value?.label ?? it.value?.key ?? it.instanceId.slice(0, 4);
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    const text = Array.from(counts.entries())
      .slice(0, 3)
      .map(([label, n]) => `${n}x ${label}`)
      .join(",  ");
    const pillW = 0.6;
    return (
      <group>
        <mesh>
          <planeGeometry args={[pillW, 0.14]} />
          <meshStandardMaterial color="#3b1f6e" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.065}
          color="#ddd6fe"
          anchorX="center"
          anchorY="middle"
          maxWidth={pillW - 0.06}
        >
          {text || "—"}
        </Text>
      </group>
    );
  }

  // Value object (list / color)
  if (typeof value === "object" && "key" in (value as object)) {
    const v = value as Value;
    const swatchColor =
      (typeof v.value === "string" ? v.value : null) ?? v.key ?? "#888";
    return (
      <group>
        <mesh position={[-0.07, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <meshStandardMaterial color={swatchColor} />
        </mesh>
        <Text
          position={[0.05, 0, 0]}
          fontSize={0.07}
          color="white"
          anchorX="left"
          anchorY="middle"
        >
          {v.key ?? v.label ?? ""}
        </Text>
      </group>
    );
  }

  // Fallback — unknown type, show gray ring
  return (
    <mesh>
      <torusGeometry args={[0.1, 0.02, 8, 24]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
  );
};

const VariableRefDemoComponent = (props: Props) => {
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
    partsVar,
    anyVar,
    context,
  } = props;

  // Debug helper — logs current prop values whenever they change.
  // Safe to remove in production; does not affect rendering.
  useMemo(() => {
    console.log(`[VariableRefDemo id=${id}] anyVar:`, anyVar);
    console.log(`[VariableRefDemo id=${id}] partsVar:`, partsVar);
    console.log(`[VariableRefDemo id=${id}] colorVar:`, colorVar);
    console.log(`[VariableRefDemo id=${id}] activeVar:`, activeVar);
  }, [anyVar, partsVar, colorVar, activeVar, id]);

  // .root gives the global / top-level value regardless of instance context.
  // Use this when you just need a single scalar to drive the whole model.
  const countRaw = countVar?.root;
  const labelRaw = labelVar?.root;
  const activeRaw = activeVar?.root;
  const imageRaw = imageVar?.root;
  // partsVar is a Components variable — .root is an array of ComponentVariableValue,
  // one entry per placed MP instance that references this model.
  const instances: ComponentVariableValue[] = partsVar?.root ?? [];

  // Sub-group registration — links each MP instance in the sidebar to the
  // matching 3D group so that hovering the sidebar card outlines that column.
  //
  // context.registerSubGroup(instanceId) tells K3 to treat the group whose
  // userData.modelActionUniqueId equals makePluginSubGroupVirtualId(..., instanceId)
  // as a highlight target for that instance.  The returned object has an
  // `unregister()` method to clean up when the instance is removed.
  useEffect(() => {
    const subs = instances.map((inst) =>
      context.registerSubGroup?.(inst.instanceId),
    );
    return () => subs.forEach((s) => s?.unregister());
  }, [instances, context.registerSubGroup]);

  const stackCount =
    typeof countRaw === "number" ? Math.max(1, Math.round(countRaw)) : 1;
  // Root activeVar controls whole-model visibility.
  // Per-instance activeVar entries control per-column visibility (handled below).
  const modelVisible = activeRaw !== false;
  const imageUrl =
    typeof imageRaw === "string" && imageRaw.length > 0 ? imageRaw : null;

  // Per-instance columns — each gets its own context-resolved active/count/label/image/color.
  // Falls back to the root value when no per-instance entry exists for that variable.
  const instanceColumns = useMemo(
    () =>
      instances.map((instance, i) => {
        const iid = instance.instanceId;
        const colActiveRaw = activeVar?.forInstance(iid);
        const colCountRaw = countVar?.forInstance(iid);
        const colLabelRaw = labelVar?.forInstance(iid);
        const colImageRaw = imageVar?.forInstance(iid);
        const colCount =
          typeof colCountRaw === "number"
            ? Math.max(1, Math.round(colCountRaw))
            : stackCount;
        return {
          key: iid,
          x: (i + 1) * (BOX_SIZE + BOX_GAP + 0.2),
          active: colActiveRaw !== false,
          stackCount: colCount,
          label:
            typeof colLabelRaw === "string" ? colLabelRaw : (labelRaw ?? null),
          imageUrl:
            typeof colImageRaw === "string" && colImageRaw.length > 0
              ? colImageRaw
              : imageUrl,
          color: valueToColor(colorVar?.forInstance(iid)),
          // undefined = no variable selected (hide badge); null = variable selected but empty
          badge: anyVar === null ? undefined : anyVar.forInstance(iid),
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      instances,
      activeVar,
      countVar,
      labelVar,
      imageVar,
      colorVar,
      anyVar,
      stackCount,
      labelRaw,
      imageUrl,
    ],
  );

  const totalHeight = stackCount * (BOX_SIZE + BOX_GAP);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      userData={{ modelId: id }}
    >
      {/* Root label — only when no instance columns are present and a label is defined */}
      {modelVisible && instanceColumns.length === 0 && labelRaw != null && (
        <Text
          position={[0, totalHeight + 0.3, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {labelRaw}
        </Text>
      )}

      {/* One column per component instance — each driven by its own context-resolved props */}
      {instanceColumns.map(
        ({
          key,
          x,
          active,
          stackCount: colCount,
          label: colLabel,
          imageUrl: colImg,
          color,
          badge,
        }) => {
          const colBoxes = Array.from({ length: colCount }, (_, i) => ({
            key: i,
            y: i * (BOX_SIZE + BOX_GAP),
          }));
          const colHeight = colCount * (BOX_SIZE + BOX_GAP);
          // Attach a virtual sub-group ID to this group's userData so K3's
          // outline / highlight system can find it when the sidebar is hovered.
          // makePluginSubGroupVirtualId(modelActionId, instanceId) produces the
          // canonical "parentMA::instanceId" string K3 resolves during raycasting.
          // Without this, hovering the sidebar card would highlight the entire
          // model instead of just this column.
          const subGroupUserData = context.modelActionId
            ? {
                modelActionUniqueId: makePluginSubGroupVirtualId(
                  context.modelActionId,
                  key,
                ),
              }
            : {};
          return (
            <group key={key} position={[x, 0, 0]} userData={subGroupUserData}>
              {active &&
                colBoxes.map(({ key: bKey, y }) => (
                  <group key={bKey} position={[0, y, 0]}>
                    {colImg ? (
                      <Suspense
                        fallback={<PlainBox color={color} size={BOX_SIZE} />}
                      >
                        <TexturedBox
                          url={colImg}
                          color={color}
                          size={BOX_SIZE}
                        />
                      </Suspense>
                    ) : (
                      <PlainBox color={color} size={BOX_SIZE} />
                    )}
                  </group>
                ))}
              {/* Per-instance badge (anyVar) — above label */}
              {badge !== undefined && (
                <group position={[0, colHeight + 0.55, 0]}>
                  <BadgeRenderer value={badge} />
                </group>
              )}
              {/* Per-instance label — only when a label is defined, dimmed when inactive */}
              {colLabel != null && (
                <Text
                  position={[0, colHeight + 0.3, 0]}
                  fontSize={0.12}
                  color={active ? "white" : "#555555"}
                  anchorX="center"
                  anchorY="bottom"
                >
                  {colLabel}
                </Text>
              )}
            </group>
          );
        },
      )}
    </group>
  );
};

// ---------------------------------------------------------------------------
// DynamicModel definition
// ---------------------------------------------------------------------------
export const dynamicVariableRefDemo: DynamicModel = {
  type: "variableRefDemo",
  label: "Variable Ref Demo",
  disabledForAR: false,
  materials: [],
  tag: "demo",

  component: VariableRefDemoComponent as any,

  propsDialog: {
    // Built-in position / rotation / scale editor
    basic: { type: "basic" },

    // ── VariableRef entries (one per resolution type) ────────────────────
    countVar: {
      type: "variable",
      label: "Count (number)",
      allowedTypes: [VariableType.Number],
    },
    labelVar: {
      type: "variable",
      label: "Label (text)",
      allowedTypes: [VariableType.Text],
    },
    activeVar: {
      type: "variable",
      label: "Visible (boolean)",
      allowedTypes: [VariableType.Boolean],
    },
    colorVar: {
      type: "variable",
      label: "Color / List (Value object)",
      allowedTypes: [VariableType.Color, VariableType.List],
    },
    imageVar: {
      type: "variable",
      label: "Texture (image / upload URL)",
      allowedTypes: [VariableType.Image, VariableType.Upload],
    },
    partsVar: {
      type: "variable",
      label: "Parts (components array)",
      allowedTypes: [VariableType.Components],
    },
    anyVar: {
      type: "variable",
      label: "Status badge (any type)",
      // no allowedTypes → admin can pick boolean/number/text/color/list
      // rendered as a type-adaptive annotation above each column
    },
  },

  defaultProps: {
    // Required by the "basic" position/scale/rotation editor
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    // no expression defaults for variable props — they start as null until
    // the admin picks a variable in the propsDialog
  },
};
