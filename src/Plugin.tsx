import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
import { dynamicVariableRefDemo } from "./DynamicVariableRefDemo";
import { PriceDisplay } from "./PriceDisplay";
import { K3Plugin } from "k3-plugin-api";

export default {
  dynamicModels: [dynamicRing, dynamicVariableRefDemo],
  variableTemplates: [
    {
      key: "colorChooser",
      label: "Farbwähler",
      type: "color",
      component: ColorChooser,
    },
  ],
  layoutComponents: { PriceDisplay },
} as K3Plugin;
