import { Ring } from "./Ring";
import Image from "../public/Image.png";
// import { useMemo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const WeddingRing = (props: any) => {
  console.log("WeddingRing props", props);

  // useMemo(() => {
  //   console.log("useMemo");
  // }, [props.jewel]);
  return (
    <group
      position={props.position}
      scale={[props.width, props.height, props.depth]}
      userData={{ modelId: props.id }} // Add modelId to userData so camera focusing works
    >
      <Ring
        radius={props.radius}
        segmentCount={props.segmentCount}
        vGap={props.vGap}
        materials={props.materials}
      />
      {/* 
      <Diamond
        model={props.jewel[0].model.path}
        position={[0, props.vGap / 2, 0]}
        scale={[props.radius * 0.3, props.radius * 0.3, props.radius * 0.3]}
      /> */}
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
    vGap: {},
    segmentCount: {},
    jewel: { type: "model", label: "The Jewel Model" },
  },
  defaultProps: {
    width: { expression: "1" },
    height: { expression: "1" },
    depth: { expression: "1" },
    radius: { expression: "1" },
    vGap: { expression: "4" },
    segmentCount: { expression: "1" },
    jewel: [],
  },
  materials: ["outer", "inner"],
  repositionApplicator: null,
  screenshot: Image,
};
