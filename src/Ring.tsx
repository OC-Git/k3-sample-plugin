// @ts-nocheck

import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

const Segment = (props: any) => {
  const r = props.radius || 0.5;
  const points = [];
  for (let i = 0; i < props.segmentCount; i++) {
    points.push(
      new THREE.Vector3(
        r * Math.sin((i * Math.PI * 2) / props.segmentCount + Math.PI),
        r * Math.cos((i * Math.PI * 2) / props.segmentCount + Math.PI),
        0
      )
    );
  }

  const path = new THREE.CatmullRomCurve3(points, true);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: props.segmentCount,
    curveSegments: 20,
    bevelEnabled: false,
    extrudePath: path,
  };

  const bufferExtrudeGeometry = new THREE.ExtrudeGeometry(
    props.shape,
    extrudeSettings
  );
  // const mergedGeometry = BufferGeometryUtils.mergeVertices(
  //   bufferExtrudeGeometry,
  //   0.00000001
  // );
  // Das sollte funktionieren: https://jsfiddle.net/hk34dLqs/3/
  // Vllt erst mit three 0.158?
  const creasedGeometry = BufferGeometryUtils.toCreasedNormals(
    bufferExtrudeGeometry,
    Math.PI / 2
  );

  // Problem! https://discourse.threejs.org/t/smooth-shading-for-extruded-circle/25782
  //const mergedGeometry = bufferExtrudeGeometry; // BufferGeometryUtils.mergeVertices(bufferExtrudeGeometry, 0.01);

  //creasedGeometry.computeVertexNormals();

  return (
    <mesh geometry={creasedGeometry} material={props.material}>
      {props.children}
    </mesh>
  );
};

export const Ring = (props: any) => {
  const vGap = props.vGap;
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
      <Segment
        shape={shape1}
        radius={props.radius}
        segmentCount={props.segmentCount}
        material={props.materials?.outer}
      ></Segment>
      {gap > 0 && (
        <Segment
          shape={shape2}
          radius={props.radius}
          segmentCount={props.segmentCount}
          material={props.materials?.inner}
        ></Segment>
      )}
      <Segment
        shape={shape3}
        radius={props.radius}
        segmentCount={props.segmentCount}
        material={props.materials?.outer}
      ></Segment>
    </group>
  );
};
