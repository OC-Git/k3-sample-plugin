import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
import {
  engravingSceneButtons,
  instanceInspectorFooter,
} from "./layoutExtensions";
import { orbitLimits } from "./orbitLimits";
import { PriceDisplay } from "./PriceDisplay";
import { K3PluginDescriptor } from "k3-plugin-api";

export default {
  id: "sample.ring-plugin",
  version: "0.0.0",
  ui: {
    inputs: {
      color: [
        {
          key: "colorChooser",
          label: "Farbwähler",
          description: "Custom color picker with hex input",
          component: ColorChooser,
        },
      ],
    },
    layout: {
      // Puts the engraving toggle next to fullscreen/AR. Every stock layout has
      // this slot, so it needs no layout editing to appear.
      sceneButtons: {
        description: "Adds the engraving-view toggle to the scene buttons",
        hoc: engravingSceneButtons,
      },
      // Live useOpenInstance() readout. The footer slot is always mounted, so this
      // also needs no layout editing.
      sidebarFooter: {
        description: "Shows which component instance is currently open",
        hoc: instanceInspectorFooter,
      },
    },
  },
  viewer: {
    models: [dynamicRing],
    customLayoutComponents: { PriceDisplay },
    sceneComponents: {
      OrbitControls: {
        description:
          "Locks rotation to the engraving while the engraving view is active",
        hoc: orbitLimits,
      },
    },
  },
} satisfies K3PluginDescriptor;
