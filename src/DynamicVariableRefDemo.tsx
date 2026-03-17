/* eslint-disable react-refresh/only-export-components */
/**
 * DynamicVariableRefDemo
 *
 * Each variable prop is resolved to the correct context value by K3.
 * Plugins receive bare scalar values — no wrapper class, no instance IDs.
 */

import {
  DynamicModel,
  VariableType,
  type PluginModelContext,
  type Value,
} from "k3-plugin-api";
import { Text } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// ---------------------------------------------------------------------------
// 3D component
// ---------------------------------------------------------------------------

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  width: number;
  height: number;
  depth: number;
  id: string;

  // Variable props — resolved by K3 to the correct context value before
  // being passed to the plugin. null when no variable is assigned.
  countVar: number | null;
  labelVar: string | null;
  activeVar: boolean | null;
  colorVar: Value | null;
  imageVar: string | null;
  anyVar: number | string | boolean | Value | null;

  // context is injected by K3 — provides runtime info about this placed instance
  //   context.modelActionId  — the unique ID of this DynamicModel placement
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
 * Renders above the stack to show whatever anyVar resolves to:
 *   null/undefined → gray dashed circle (variable selected, no value)
 *   boolean → green/red sphere
 *   number  → amber torus + counter
 *   string  → cyan text annotation
 *   Value   → colored swatch + key label
 */
const BadgeRenderer = ({
  value,
}: {
  value: number | string | boolean | Value | null | undefined;
}) => {
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

// ---------------------------------------------------------------------------
// Helpers shared with old sections are kept above; main component below
// ---------------------------------------------------------------------------

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
    anyVar,
  } = props;

  console.log(`[VariableRefDemo] ${id}`, {
    countVar,
    labelVar,
    activeVar,
    colorVar,
    imageVar,
    anyVar,
  });

  const stackCount =
    typeof countVar === "number" ? Math.max(1, Math.round(countVar)) : 1;
  const modelVisible = activeVar !== false;
  const color = valueToColor(colorVar);
  const imageUrl =
    typeof imageVar === "string" && imageVar.length > 0 ? imageVar : null;
  const totalHeight = stackCount * (BOX_SIZE + BOX_GAP);

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
      userData={{ modelId: id }}
    >
      {modelVisible &&
        Array.from({ length: stackCount }, (_, i) => (
          <group key={i} position={[0, i * (BOX_SIZE + BOX_GAP), 0]}>
            {imageUrl ? (
              <Suspense fallback={<PlainBox color={color} size={BOX_SIZE} />}>
                <TexturedBox url={imageUrl} color={color} size={BOX_SIZE} />
              </Suspense>
            ) : (
              <PlainBox color={color} size={BOX_SIZE} />
            )}
          </group>
        ))}
      {anyVar !== null && anyVar !== undefined && (
        <group position={[0, totalHeight + 0.55, 0]}>
          <BadgeRenderer value={anyVar} />
        </group>
      )}
      {labelVar != null && (
        <Text
          position={[0, totalHeight + 0.3, 0]}
          fontSize={0.15}
          color={modelVisible ? "white" : "#555555"}
          anchorX="center"
          anchorY="bottom"
        >
          {labelVar}
        </Text>
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

  component: VariableRefDemoComponent,

  propsDialog: {
    basic: { type: "basic" },
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
        VariableType.Upload,
      ],
    },
  },

  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
  },
};
