import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
import { PriceDisplay } from "./PriceDisplay";
import { Settings } from "./Settings";
import type { K3PluginDescriptor } from "k3-plugin-api";

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
  settings: Settings,
} as K3PluginDescriptor & {
  settings: React.ComponentType<{
    settings: unknown;
    onSave: (settings: unknown) => void;
  }>;
};
