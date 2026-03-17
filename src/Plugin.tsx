import type { K3PluginDescriptor } from "k3-plugin-api";
import { VariableType } from "k3-plugin-api";
import { ColorChooser } from "./ColorChooser";
import { DemoSliderInput } from "./DemoSliderInput";
import { dynamicRing } from "./DynamicRing";
import { dynamicVariableRefDemo } from "./DynamicVariableRefDemo";
import { dynamicLegacyModel } from "./DynamicLegacyModel";
import { PriceDisplay } from "./PriceDisplay";
import { createSlotHOC } from "./DemoHoc";
import { createGenericInput } from "./DemoGenericInput";

export default {
  id: "oc.sample-plugin",
  version: "1.0.0",

  // ── UI & Layout ──────────────────────────────────────────────────────────

  ui: {
    layout: {
      root: createSlotHOC("root"),
      header: createSlotHOC("header"),
      sidebar: createSlotHOC("sidebar"),
      sidebarHeader: createSlotHOC("sidebarHeader"),
      sidebarFooter: createSlotHOC("sidebarFooter"),
      footer: createSlotHOC("footer"),
      contentView: createSlotHOC("contentView"),
      gallery: createSlotHOC("gallery"),
      branding: createSlotHOC("branding"),
      logo: createSlotHOC("logo"),
      navigationButtons: createSlotHOC("navigationButtons"),
      exitButtons: createSlotHOC("exitButtons"),
      sceneButtons: createSlotHOC("sceneButtons"),
      price: createSlotHOC("price"),
      labelActionDisplay: createSlotHOC("labelActionDisplay"),
      mobileLabelActionDisplay: createSlotHOC("mobileLabelActionDisplay"),
      invalidRuleModal: createSlotHOC("invalidRuleModal"),
      mountedWhenLoaded: createSlotHOC("mountedWhenLoaded"),
      configurator: createSlotHOC("configurator"),
      groupLabel: createSlotHOC("groupLabel"),
      groupPanel: createSlotHOC("groupPanel"),
      additionalGroups: createSlotHOC("additionalGroups"),
      additionalVars: createSlotHOC("additionalVars"),
      variableLabel: createSlotHOC("variableLabel"),
    },

    inputs: {
      list: [{ key: "sample.list", label: "List Demo", component: createGenericInput(VariableType.List) }],
      color: [{ key: "sample.colorChooser", label: "Farbwähler", component: ColorChooser }],
      number: [{ key: "sample.slider", label: "Slider Demo", component: DemoSliderInput }],
      text: [{ key: "sample.text", label: "Text Demo", component: createGenericInput(VariableType.Text) }],
      boolean: [{ key: "sample.boolean", label: "Boolean Demo", component: createGenericInput(VariableType.Boolean) }],
      image: [{ key: "sample.image", label: "Image Demo", component: createGenericInput(VariableType.Image) }],
      upload: [{ key: "sample.upload", label: "Upload Demo", component: createGenericInput(VariableType.Upload) }],
      components: [{ key: "sample.components", label: "Components Demo", component: createGenericInput(VariableType.Components) }],
      information: [{ key: "sample.information", label: "Information Demo", component: createGenericInput(VariableType.Information) }],
    },

    dialogs: {
      order: {
        root: createSlotHOC("orderRoot"),
        headline: createSlotHOC("orderHeadline"),
        contactFields: createSlotHOC("orderContactFields"),
        priceTable: createSlotHOC("orderPriceTable"),
        priceTableSelectionList: createSlotHOC("orderPriceTableSelectionList"),
        priceTableArticleList: createSlotHOC("orderPriceTableArticleList"),
        priceTableTotal: createSlotHOC("orderPriceTableTotal"),
        confirmationSuccess: createSlotHOC("orderConfirmationSuccess"),
        confirmationError: createSlotHOC("orderConfirmationError"),
      },
      warnings: {
        invalidSelection: createSlotHOC("warningInvalidSelection"),
        invalidSelectionIcon: createSlotHOC("warningInvalidSelectionIcon"),
        invalidSelectionTooltip: createSlotHOC("warningInvalidSelectionTooltip"),
        numberWarningTooltip: createSlotHOC("warningNumberWarningTooltip"),
      },
    },
  },

  // ── Viewer & 3D ──────────────────────────────────────────────────────────

  viewer: {
    canvas: createSlotHOC("canvas"),
    sceneComponents: { demoScene: createSlotHOC("demoScene") },
    customLayoutComponents: { PriceDisplay },
    models: [dynamicRing, dynamicVariableRefDemo],
    labels: {
      display: createSlotHOC("labelsDisplay"),
      mobile: createSlotHOC("labelsMobile"),
    },
  },

  // ── Logic & Events ───────────────────────────────────────────────────────

  logic: {
    pricing: {
      onPriceCalculate: (price) => {
        const result = Math.round(price * 1.19 * 100) / 100;
        console.log("[plugin] onPriceCalculate", price, "→", result);
        return result;
      },
    },
    config: {
      onUpdate: (config) => { console.log("[plugin] onUpdate", config); return config; },
      onSave: (config) => { console.log("[plugin] onSave", config); return config; },
      onSaveFiles: (files) => { console.log("[plugin] onSaveFiles", files); return files; },
      onSaveEvent: (payload) => { console.log("[plugin] onSaveEvent", payload); return payload; },
    },
    camera: {
      onSetScreenshotCameras: (cameras) => { console.log("[plugin] onSetScreenshotCameras", cameras); return cameras; },
      onSetCameraList: (cameras) => { console.log("[plugin] onSetCameraList", cameras); return cameras; },
      getScreenshotDimensions: (dim) => { console.log("[plugin] getScreenshotDimensions", dim); return dim; },
    },
    core: {
      preprocessFullApp: (app) => { console.log("[plugin] preprocessFullApp", app); return app; },
      onOpenPdf: (result) => { console.log("[plugin] onOpenPdf", result); },
      onExportAR: async (ctx) => { console.log("[plugin] onExportAR", ctx); return new Blob(); },
      setExpressionEngineSelections: (selections) => { console.log("[plugin] setExpressionEngineSelections", selections); return selections; },
    },
  },

  // ── Legacy (shim tests) ──────────────────────────────────────────────────

  /** @deprecated mapped to viewer.models internally */
  dynamicModels: [dynamicLegacyModel],
  /** @deprecated mapped to viewer.customLayoutComponents internally */
  layoutComponents: { PriceDisplay },
} satisfies K3PluginDescriptor;
