import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
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
  },
  viewer: {
    models: [dynamicRing],
    customLayoutComponents: { PriceDisplay },
  },
} satisfies K3PluginDescriptor;
