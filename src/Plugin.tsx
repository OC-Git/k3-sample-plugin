import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
import { PriceDisplay } from "./PriceDisplay";

export default {
  dynamicModels: [dynamicRing],
  variableTemplates: [
    {
      key: "colorChooser",
      label: "Farbwähler",
      type: "color",
      component: ColorChooser,
    },
  ],
  layoutComponents: { PriceDisplay },
};
