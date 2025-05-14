import { Ring } from "./Ring";
import Image from "../public/Image.png";

// eslint-disable-next-line react-refresh/only-export-components
const WeddingRing = (props: any) => {
  return (
    <group scale={[props.width, props.height, props.depth]}>
      <Ring position={props.position} radius={props.radius} />
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
