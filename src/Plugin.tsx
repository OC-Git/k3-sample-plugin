import { ColorChooser } from "./ColorChooser";
import { dynamicRing } from "./DynamicRing";
import { dynamicVariableRefDemo } from "./DynamicVariableRefDemo";
import { PriceDisplay } from "./PriceDisplay";
import { K3Plugin } from "k3-plugin-api";

/**
 * K3Plugin — the single default export of every plugin.
 *
 * K3 discovers all three sections automatically when the plugin is loaded:
 *
 * dynamicModels      — 3D model types an admin can place in the scene.
 *                      Each entry is a DynamicModel object (see DynamicRing.tsx /
 *                      DynamicVariableRefDemo.tsx).
 *
 * variableTemplates  — Custom variable types that appear in the admin variable
 *                      editor. Each entry needs a unique `key`, a display `label`,
 *                      a `type` string K3 stores internally, and a `component`
 *                      factory that renders the variable's input UI
 *                      (see ColorChooser.tsx).
 *
 * layoutComponents   — Named React components that can be placed in a
 *                      configurator layout by the admin. They receive a `ctx`
 *                      prop with live BOM + price data (see PriceDisplay.tsx).
 */
export default {
  dynamicModels: [dynamicRing, dynamicVariableRefDemo],
  variableTemplates: [
    {
      key: "colorChooser",
      label: "Farbwähler",
      // Must match an existing K3 variable type ("color", "list", "text", …)
      type: "color",
      component: ColorChooser,
    },
  ],
  layoutComponents: { PriceDisplay },
} as K3Plugin;
