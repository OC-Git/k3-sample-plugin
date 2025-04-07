// @ts-nocheck

import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

const Segment = (props: any) => {
  const r = props.radius || 0.5;
  const points = [];
  for (let i = 0; i <= 101; i++) {
    points.push(
      new THREE.Vector3(
        r * Math.sin((i * Math.PI * 2) / 100),
        r * Math.cos((i * Math.PI * 2) / 100),
        0
      )
    );
  }

  const path = new THREE.CatmullRomCurve3(points);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 100,
    curveSegments: 20,
    bevelEnabled: false,
    extrudePath: path,
  };

  const bufferExtrudeGeometry = new THREE.ExtrudeGeometry(
    props.shape,
    extrudeSettings
  );

  // Das sollte funktionieren: https://jsfiddle.net/hk34dLqs/3/
  // Vllt erst mit three 0.158?
  const mergedGeometry = BufferGeometryUtils.toCreasedNormals(
    bufferExtrudeGeometry,
    Math.PI
  );

  // Problem! https://discourse.threejs.org/t/smooth-shading-for-extruded-circle/25782
  //const mergedGeometry = bufferExtrudeGeometry; // BufferGeometryUtils.mergeVertices(bufferExtrudeGeometry, 0.01);

  mergedGeometry.computeVertexNormals();

  return <mesh geometry={mergedGeometry}>{props.children}</mesh>;
};

export const Ring = (props: any) => {
  const vGap = 4;
  const vWidth = 4 + vGap;

  const gap = vGap / 50.0;
  const sink = 0.05;
  const rx = vWidth / 50.0;
  const ry = 0.05;

  const shape1 = new THREE.Shape();
  shape1.moveTo(gap, -ry);
  shape1.splineThru([
    new THREE.Vector2(gap, -ry),
    new THREE.Vector2(rx, -0.8 * ry),
    new THREE.Vector2(rx, 0.8 * ry),
    new THREE.Vector2(gap, ry),
  ]);
  shape1.lineTo(gap, -ry);

  const shape2 = new THREE.Shape();
  shape2.moveTo(gap, -ry + sink);
  shape2.lineTo(gap, ry - sink);
  shape2.lineTo(-gap, ry - sink);
  shape2.lineTo(-gap, -ry + sink);
  shape2.lineTo(gap, -ry + sink);

  const shape3 = new THREE.Shape();
  shape3.moveTo(-gap, -ry);
  shape3.splineThru([
    new THREE.Vector2(-gap, -ry),
    new THREE.Vector2(-rx, -0.8 * ry),
    new THREE.Vector2(-rx, 0.8 * ry),
    new THREE.Vector2(-gap, ry),
  ]);
  shape3.lineTo(-gap, -ry);

  return (
    <group {...props}>
      <Segment shape={shape1} radius={props.radius}>
        <meshStandardMaterial
          color={new THREE.Color(1.0, 0.866, 0.236)}
          roughness={0.1}
          metalness={1}
          toneMapped={true}
        />
      </Segment>
      {gap > 0 && (
        <Segment shape={shape2} radius={props.radius}>
          <meshStandardMaterial
            color={new THREE.Color(0.9, 0.9, 0.9)}
            roughness={0.4}
            metalness={1}
            toneMapped={true}
          />
        </Segment>
      )}
      <Segment shape={shape3} radius={props.radius}>
        <meshStandardMaterial
          color={new THREE.Color(1.0, 0.866, 0.236)}
          roughness={0.1}
          metalness={1}
          toneMapped={true}
        />
      </Segment>
    </group>
  );
};
