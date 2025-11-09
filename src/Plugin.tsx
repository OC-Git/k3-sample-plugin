import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";

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
};
