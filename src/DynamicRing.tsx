// @ts-nocheck

import { PrimaryJuwel, SecondaryJuwels } from "./Diamond";
import { Ring } from "./Ring";
import Image from "../public/Image.png";

const PropsDialog = () => {
  return <div>Editor</div>;
};

const WeddingRing = (props: any) => {
  const z = 0; // -4
  return (
    <group scale={[props.width, props.height, props.depth]}>
      {/* <PrimaryJuwel position={[0, 5, z]} />
      <SecondaryJuwels position={[0, 5, z]} /> */}
      <Ring position={[0, 0, z]} radius={props.radius} />
    </group>
  );
};

export const dynamicRing = {
  type: "ringPlugin",
  label: "Ring",
  disabledForAR: false,
  component: WeddingRing,
  propsDialog: {
    basic: { type: "basic" },
    radius: {},
    segmentCount: {},
    jewel: { type: "model", label: "The Jewel Model" },
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    radius: { expression: "1" },
    segmentCount: { expression: "1" },
    jewel: [],
  },
  materials: ["surface"],
  repositionApplicator: null,
  screenshot: Image,
};
