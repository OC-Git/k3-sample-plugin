// @ts-nocheck
import { MeshRefractionMaterial, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { RGBELoader } from "three-stdlib";

export function Diamond(props: any) {
  const { nodes } = useGLTF(props.model);
  // Use a custom envmap/scene-backdrop for the diamond material
  // This way we can have a clear BG while cube-cam can still film other objects
  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/photo_studio_01_1k.hdr"
  );
  return (
    <mesh geometry={nodes.Diamond_1_0.geometry} {...props}>
      <MeshRefractionMaterial envMap={texture} toneMapped={false} />
    </mesh>
  );
}

export function PrimaryJuwel(props: any) {
  const scale = 0.3;

  return (
    <group {...props} position={[0, 2.05, 0]}>
      <Diamond scale={[scale, scale, scale]} />
    </group>
  );
}

export function SecondaryJuwels(props: any) {
  const count = 3;
  const jewels = [];
  for (var i = 1; i <= count; i++) {
    const r = 2.1;
    const add = (w) => {
      jewels.push({
        position: [r * Math.sin(w), r * Math.cos(w), 0],
        rotation: [0, 0, -w],
      });
    };
    add(0.2 + i / 6);
    add(-0.2 - i / 6);
  }
  const scale = 1 / 9;

  return (
    <group {...props}>
      {jewels.map((jewel, i) => (
        <Diamond key={i} {...jewel} scale={[scale, scale, scale]} />
      ))}
    </group>
  );
}
