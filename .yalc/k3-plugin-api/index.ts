import type React from "react";

// ─── HOC type (mirrors K3 internal, no K3 imports) ──────────────────────────

/** A Higher-Order Component: takes the default component, returns a new one. */
export type HOC<P = Record<string, unknown>> = (
  comp: React.FC<P>,
) => React.FC<P>;

/** Four editor languages supported by K3. */
export type LocalizedString = {
  de?: string;
  en?: string;
  nl?: string;
  fr?: string;
};

/** An HOC slot with a required description for the admin UI. */
export interface HOCWithDescription<P = Record<string, unknown>> {
  hoc: HOC<P>;
  /** Describe what this extension point does. Shown in the plugin extensions dialog. */
  description: string | LocalizedString;
}

/** A logic callback with a required description for the admin UI. */
export interface CallbackWithDescription<T> {
  fn: T;
  /** Describe what this callback does. Shown in the plugin extensions dialog. */
  description: string | LocalizedString;
}

// ─── Public Plugin Descriptor ───────────────────────────────────────────────

export interface K3PluginDescriptor {
  /** Unique stable identifier, e.g. "vendor.myplugin". Required for collision detection. */
  id: string;
  /** Semver string, e.g. "1.0.0". */
  version: string;

  /** UI extension points: layout HOCs, input HOCs, dialog HOCs. */
  ui?: K3UIExtensions;
  /** Viewer / 3D extension points: canvas, scene components, layout components, dynamic models. */
  viewer?: K3ViewerExtensions;
  /** Logic/callback hooks: config, camera, core. */
  logic?: K3LogicExtensions;

  /** @deprecated Use viewer.models instead. */
  dynamicModels?: DynamicModel[];
}

// ─── UI Extensions ──────────────────────────────────────────────────────────

export interface K3UIExtensions {
  /** Override layout shell components. */
  layout?: K3LayoutExtensions;
  /** Register new variable visualisations (renderers) per variable data type. */
  inputs?: K3InputExtensions;
  /** Override dialog components. */
  dialogs?: K3DialogExtensions;
}

export interface K3LayoutExtensions {
  /** Wraps the outermost app shell component. */
  root?: HOCWithDescription;
  /** Wraps the top header bar containing branding, navigation buttons, and scene controls. */
  header?: HOCWithDescription;
  /** Wraps the sidebar container that lists groups and variables. */
  sidebar?: HOCWithDescription;
  /** Wraps the header section inside the sidebar (above the groups list). */
  sidebarHeader?: HOCWithDescription;
  /** Wraps the footer section inside the sidebar (below the groups list). */
  sidebarFooter?: HOCWithDescription;
  /** Wraps the bottom footer bar of the app shell. */
  footer?: HOCWithDescription;
  /** Wraps the main content / viewer area of the configurator page. */
  contentView?: HOCWithDescription;
  /** Wraps the gallery / image viewer page layout. */
  gallery?: HOCWithDescription;
  /** Wraps the branding slot in the header (typically a logo + brand name). */
  branding?: HOCWithDescription;
  /** Wraps the logo image component inside the branding area. */
  logo?: HOCWithDescription;
  /** Wraps the previous/next group navigation button bar. */
  navigationButtons?: HOCWithDescription;
  /** Wraps the exit / close configurator button(s). */
  exitButtons?: HOCWithDescription;
  /** Wraps the 3D scene action buttons (e.g. AR, fullscreen, screenshot). */
  sceneButtons?: HOCWithDescription;
  /** Wraps the price display component shown in the header or footer. */
  price?: HOCWithDescription;
  /** Wraps the label/hotspot action display overlay rendered on the desktop 3D canvas. */
  labelActionDisplay?: HOCWithDescription;
  /** Wraps the label/hotspot action display overlay rendered on mobile. */
  mobileLabelActionDisplay?: HOCWithDescription;
  /** Wraps the modal shown when a selection violates a mandatory rule. */
  invalidRuleModal?: HOCWithDescription;
  /** Wraps a component that is only mounted after the app has fully loaded. */
  mountedWhenLoaded?: HOCWithDescription;
  /** Wraps the top-level configurator page layout (groups navigation + variable panel). */
  configurator?: HOCWithDescription;
  /** Wraps each group label in the sidebar navigation list. */
  groupLabel?: HOCWithDescription;
  /** Wraps the expandable group panel that contains its variables. */
  groupPanel?: HOCWithDescription;
  /** Wraps the additional-groups slot appended below the main groups list. */
  additionalGroups?: HOCWithDescription;
  /** Wraps the additional-variables slot appended at the end of a group's variable list. */
  additionalVars?: HOCWithDescription;
  /** Wraps each individual variable label inside a group panel. */
  variableLabel?: HOCWithDescription;
}

/**
 * Props passed to a plugin variable component (VariableVisualisation.component) at runtime.
 * Use these to render a fully custom variable input UI.
 */
export interface K3VariableComponentProps {
  /** The variable definition for which this component is rendered. */
  variable: {
    /** Database ID of the variable. */
    id: string | number;
    /** Translated display label of the variable. */
    label: string;
    /** Data type of the variable (list, color, number, …). */
    type: VariableTypes;
    settings?: {
      /** Key of the VariableVisualisation that should be used to render this variable. */
      template?: string;
      templateOptions?: {
        min?: number;
        max?: number;
        digits?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  /** The currently active selection for this variable, if any. */
  selection?: {
    /** ID of the currently selected value. */
    id: string | number;
    data?: {
      inputValue?: number;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  /** All available value options for this variable. */
  values?: Array<{
    /** Database ID of the value. */
    id: string | number;
    /** Translated display label of the value. */
    label: string;
    /** Raw value payload (hex color, boolean, etc.). */
    value?: string | boolean | null;
    [key: string]: unknown;
  }>;
  /**
   * Commit a selection.
   * Number variables: onChange(values[0].id, { inputValue: numericValue })
   * List/color/boolean: onChange(value.id)
   */
  onChange: (
    valueId: string | number,
    metadata?: { inputValue?: number },
  ) => void;
  /** When `true`, the variable is locked and user interaction should be blocked. */
  disabled?: boolean;
}

/**
 * A plugin-registered variable renderer (VariableVisualisation).
 * Displayed as a selectable option in the admin visualisation chooser.
 * The component owns its full UI — label, input, chrome.
 */
export interface VariableVisualisation {
  /**
   * Globally unique template key, e.g. "acme.mySlider".
   * Set variable.settings.template = this key to use this visualisation.
   * Must be namespaced to avoid collisions.
   */
  key: string;
  /** Label shown in the admin visualisation chooser. */
  label: string;
  /** Describe what this visualisation does. Shown in the plugin extensions dialog. */
  description: string | LocalizedString;
  /** Full variable renderer component. Receives K3VariableComponentProps. */
  component: React.ComponentType<K3VariableComponentProps>;
}

export interface K3InputExtensions {
  /** Register new visualisations for list-type variables. */
  list?: VariableVisualisation[];
  /** Register new visualisations for color-type variables. */
  color?: VariableVisualisation[];
  /** Register new visualisations for number-type variables (e.g. custom slider). */
  number?: VariableVisualisation[];
  /** Register new visualisations for text-type variables. */
  text?: VariableVisualisation[];
  /** Register new visualisations for boolean-type variables. */
  boolean?: VariableVisualisation[];
  /** Register new visualisations for image-type variables. */
  image?: VariableVisualisation[];
  /** Register new visualisations for upload-type variables. */
  upload?: VariableVisualisation[];
  /** Register new visualisations for components-type variables. */
  components?: VariableVisualisation[];
  /** Register new visualisations for information-type variables. */
  information?: VariableVisualisation[];
}

export interface K3DialogExtensions {
  /** Extension points for the order / summary dialog (contact form, price table, confirmation). */
  order?: K3OrderDialogExtensions;
  /** Extension points for inline selection-warning components shown in the sidebar. */
  warnings?: K3WarningExtensions;
}

export interface K3OrderDialogExtensions {
  /** Wraps the entire order dialog modal. */
  root?: HOCWithDescription;
  /** Wraps the dialog headline / title element. */
  headline?: HOCWithDescription;
  /** Wraps the customer contact form fields (name, email, …). */
  contactFields?: HOCWithDescription;
  /** Wraps the price table container in the order summary. */
  priceTable?: HOCWithDescription;
  /** Wraps the list of selected option rows inside the price table. */
  priceTableSelectionList?: HOCWithDescription;
  /** Wraps the list of article/BOM rows inside the price table. */
  priceTableArticleList?: HOCWithDescription;
  /** Wraps the totals row at the bottom of the price table. */
  priceTableTotal?: HOCWithDescription;
  /** Wraps the success confirmation screen shown after a successful order submission. */
  confirmationSuccess?: HOCWithDescription;
  /** Wraps the error confirmation screen shown after a failed order submission. */
  confirmationError?: HOCWithDescription;
}

export interface K3WarningExtensions {
  /** Wraps the full invalid-selection warning component (red badge next to a variable value). */
  invalidSelection?: HOCWithDescription;
  /** Wraps the icon inside the invalid-selection warning. */
  invalidSelectionIcon?: HOCWithDescription;
  /** Wraps the tooltip content shown when hovering the invalid-selection warning. */
  invalidSelectionTooltip?: HOCWithDescription;
  /** Wraps the tooltip content shown when a number variable value is out of bounds. */
  numberWarningTooltip?: HOCWithDescription;
}

// ─── Viewer Extensions ──────────────────────────────────────────────────────

/**
 * A single Bill-of-Materials entry exposed to plugin components.
 * Mirrors the internal BOMEntry shape using only primitive/simple types.
 */
export interface K3BomEntry {
  article: {
    id: number;
    /** Article number as defined in the K3 admin. */
    no: string;
    name: string;
    description?: string | null;
    thumbnail?: string | null;
    category?: string | null;
  };
  /** Quantity of this article for the current selection. */
  qty: number;
  /** Optional override quantity from the article amount modal. */
  amount?: number | null;
  /** Price of a single unit of this article. */
  price: { price: number; unit?: string };
  /** Whether this is a main article (`true`) or an accessory/surcharge (`false`). */
  main?: boolean;
}

/**
 * Props automatically injected into every `customLayoutComponents` entry.
 *
 * @remarks TODO(WIP) — This interface will grow as more configurator data is
 * exposed to plugins.
 */
export interface CustomLayoutComponentProps {
  /** The slot name this component was mounted under. */
  name: string;
  /**
   * Live Bill-of-Materials rows derived from the current selection.
   * Each entry represents one article line or surcharge line.
   */
  bom: K3BomEntry[];
  /**
   * Aggregated total price for the current configuration in the app's currency unit.
   * TODO(WIP): Currency/formatting helpers are not yet part of the public API.
   */
  totalPrice: number;
  /** Any additional props forwarded by the layout. */
  [key: string]: unknown;
}

export interface K3ViewerExtensions {
  /** Wraps the root Three.js / R3F canvas element. */
  canvas?: HOCWithDescription;
  /**
   * Named React components injected into the configurator layout by key.
   * Consumed by `getDynamicComponents` to render plugin-provided UI inside layout slots.
   * Use a plain component (no HOC wrapping needed).
   *
   * Components receive {@link CustomLayoutComponentProps} with BOM and total price data.
   */
  // TODO(WIP): CustomLayoutComponentProps will be extended as more data becomes available
  customLayoutComponents?: Record<
    string,
    React.ComponentType<CustomLayoutComponentProps>
  >;
  /** Dynamic 3D model definitions contributed by this plugin. Equivalent to the top-level `dynamicModels`. */
  models?: DynamicModel[];
  /** Override the label / hotspot overlay components rendered on the 3D canvas. */
  labels?: {
    /** Wraps the label action display overlay on desktop. Alias for `ui.layout.labelActionDisplay`. */
    display?: HOCWithDescription;
    /** Wraps the label action display overlay on mobile. Alias for `ui.layout.mobileLabelActionDisplay`. */
    mobile?: HOCWithDescription;
  };
}

// ─── Logic Callback Types ────────────────────────────────────────────────────

/** [x, y, z] coordinate tuple used on camera objects. */
export type K3Coordinates = [number, number, number];

/**
 * Restricts a camera to a specific configurator context.
 * `"group"` / `"variable"` — camera activates only when that item is in view; `id` is the entity's database ID.
 * `"general"` — camera is always available regardless of the active group or variable.
 */
export type K3CameraScope =
  | { type: "group" | "variable"; id: number }
  | { type: "general"; id?: null };

interface K3BaseCamera {
  /** Unique database ID of the camera record. */
  id: string;
  /** Human-readable camera name as set in the scene editor. */
  name: string;
  /** World-space XYZ position of the camera. */
  position: K3Coordinates;
  /** World-space XYZ point the camera is aimed at. */
  lookAt: K3Coordinates;
  /** Euler rotation [x, y, z] in radians. */
  rotation: K3Coordinates;
  /** Optional override for the screenshot render resolution in pixels. */
  resolution?: { width: number; height: number };
  /** Transition easing threshold used by the camera animation driver. */
  threshold?: number;
  /**
   * How the camera's look-at target is computed.
   * `"dynamic"` — recalculated from the current scene bounding box (default).
   * `"static"` — uses the stored `lookAt` value unchanged.
   */
  focusType?: "dynamic" | "static";
  /** Restricts this camera to a specific group or variable context, or `"general"` for all contexts. */
  scope?: K3CameraScope;
  /** Orthographic zoom factor or perspective field-of-view multiplier. */
  zoom?: number;
  [key: string]: unknown;
}

/** A perspective camera configured in the K3 scene editor. */
export interface K3PerspectiveCamera extends K3BaseCamera {
  type: "PerspectiveCamera";
  /** Intrinsic perspective parameters: field-of-view in degrees, aspect ratio, near/far clip planes. */
  baseSettings?: { fov: number; aspect: number; near: number; far: number };
}

/** An orthographic camera configured in the K3 scene editor. */
export interface K3OrthographicCamera extends K3BaseCamera {
  type: "OrthographicCamera";
  /** Intrinsic orthographic parameters: frustum left/right/top/bottom extents and near/far clip planes. */
  baseSettings?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    near: number;
    far: number;
  };
}

/** A scene camera — perspective or orthographic. Passed to screenshot / camera-list callbacks. */
export type K3Camera = K3PerspectiveCamera | K3OrthographicCamera;

/** Pixel dimensions used for screenshot rendering. */
export interface K3ScreenshotDimensions {
  width: number;
  height: number;
}

/** AR platform identifier. */
export type K3ARPlatform = "iOS" | "AndroidOS";

/**
 * Minimal structural representation of a Three.js scene graph node.
 * Cast to `import("three").Object3D` for full Three.js access.
 */
export interface K3Scene {
  /** Three.js object type string, e.g. `"Scene"`, `"Mesh"`, `"Group"`. */
  type: string;
  /** Direct child nodes of this scene graph node. */
  children: readonly K3Scene[];
  /** Arbitrary metadata attached by K3 or the GLTF loader (e.g. material names, model IDs). */
  userData: Record<string, unknown>;
  traverse(callback: (object: K3Scene) => void): void;
  getObjectByName(name: string): K3Scene | undefined;
}

/** Context passed to `core.onExportAR`. */
export interface K3ARExportContext {
  /** Platform the AR export is targeting. */
  platform: K3ARPlatform;
  /**
   * Live Three.js scene graph.
   * Cast to `import("three").Object3D` for full Three.js access.
   */
  scene: K3Scene;
}

/** An uploaded file in a save operation (e.g. a screenshot per camera). */
export interface K3UploadFile {
  /** Camera name or custom key identifying this file. */
  key: string;
  /** The file data. */
  file: Blob;
  /** Optional explicit file name. */
  fileName?: string;
}

/** Result returned to `core.onOpenPdf` after a save/order action. */
export interface K3SaveResult {
  /** Generated configuration code. */
  code?: string;
  /** Pricing verification info. */
  price?: {
    okay: boolean;
    priceSent?: number;
    priceCalculated?: number;
  };
  /** `true` if the save action encountered a server-side error. */
  error?: boolean;
  /** Optional human-readable error or status message from the server. */
  message?: string;
  /** URL to a shop or cart page the user can be redirected to after saving. */
  shopLink?: string;
  /** URL to the generated PDF. */
  pdf?: string;
  /** Suggested file name for the generated PDF download. */
  pdfName?: string;
  [key: string]: unknown;
}

/**
 * Payload dispatched when a configuration is saved (e.g. "order", "cart", "pdf").
 * Passed to `config.onSaveEvent`.
 */
export interface K3ConfigurationSavedEvent {
  type: "K3ConfigurationSaved";
  /** Save action key, e.g. "cart", "pdf", "email". */
  actionKey: string;
  /** Generated configuration code. */
  code: string;
  /** Optional customer data if collected during the save flow. */
  customer?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** A persisted configuration object. Passed to `config.onUpdate` and `config.onSave`. */
export interface K3Configuration {
  /** Database ID of the saved configuration record. */
  id: number | string;
  /** ID of the K3 app this configuration belongs to. */
  appId: number;
  /** Human-readable configuration code generated by the backend (e.g. "ABC-123"). */
  code: string;
  /** Calculated total price, or `null` if pricing is not configured. */
  price: number | null;
  /** ISO language code. */
  lang: string;
  /** Serialised selection state and BOM. */
  json: {
    /** Array of variable selection states at save time. */
    variables: unknown[];
    /** Bill-of-materials rows derived from the current selection. */
    bom: unknown[];
    /** Aggregated summary data (e.g. totals, labels). */
    summary: unknown;
    [key: string]: unknown;
  };
  /** Screenshot files, keyed by camera name then file name. */
  files: Record<string, Record<string, string>>;
  [key: string]: unknown;
}

/** A configuration not yet persisted (no `id` or `code`). */
export type K3NewConfiguration = Omit<K3Configuration, "id" | "code">;

/** An individual variable selection state. */
export interface K3Selection {
  /** Unique selection ID. */
  id: string;
  /** ID of the variable this selection belongs to. */
  variableId: number;
  /** ID of the chosen value, or `null` / `undefined` when no value is selected. */
  valueId?: number | string | null;
  data?: {
    /** Number variable input value. */
    inputValue?: number;
    /** Text variable input value. */
    inputText?: string;
    /** Image variable URL. */
    url?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** Full application snapshot passed to `core.preprocessFullApp` before the store initialises. */
export interface K3FullApp {
  app: { id: number; [key: string]: unknown };
  client: { id: number; [key: string]: unknown };
  groups: Array<{ id: number; [key: string]: unknown }>;
  variables: Array<{ id: number; [key: string]: unknown }>;
  values: Array<{ id: number | string; [key: string]: unknown }>;
  articles: Array<{ id: number; [key: string]: unknown }>;
  prices: Array<{ id: number; [key: string]: unknown }>;
  materials: Array<{ id: number; [key: string]: unknown }>;
  models: Array<{ id: number; [key: string]: unknown }>;
  images: Array<{ id: number; [key: string]: unknown }>;
  rules: Array<{ id: number; [key: string]: unknown }>;
  ruleItems: Array<{ id: number; [key: string]: unknown }>;
  [key: string]: unknown;
}

// ─── Logic / Callback Extensions ────────────────────────────────────────────

export interface K3LogicExtensions {
  /** Hooks into the configuration data lifecycle (create, update, save). */
  config?: {
    /**
     * Called every time the active configuration object is updated in the store (e.g. on every selection change).
     * Return a modified copy to alter prices, codes, or any other configuration field.
     */
    onUpdate?: CallbackWithDescription<
      (config: K3Configuration) => K3Configuration
    >;
    /**
     * Called just before a configuration is persisted (order, cart, email, …).
     * Return a modified copy to inject extra fields or override values before saving.
     */
    onSave?: CallbackWithDescription<
      (
        config: K3Configuration | K3NewConfiguration,
      ) => K3Configuration | K3NewConfiguration
    >;
    /**
     * Called with the list of screenshot files that will be uploaded alongside the save.
     * Return a modified array to add, remove, or rename files.
     */
    onSaveFiles?: CallbackWithDescription<
      (files: K3UploadFile[]) => K3UploadFile[]
    >;
    /**
     * Called after a successful save action with the dispatched event payload.
     * Return a modified payload to add custom fields consumed by downstream integrations.
     */
    onSaveEvent?: CallbackWithDescription<
      (payload: K3ConfigurationSavedEvent) => K3ConfigurationSavedEvent
    >;
  };
  /** Hooks into the camera and screenshot pipeline. */
  camera?: {
    /**
     * Called with the list of cameras used for automated screenshot capture.
     * Return a modified array to add, remove, or reorder screenshot cameras.
     */
    onSetScreenshotCameras?: CallbackWithDescription<
      (cameras: K3Camera[]) => K3Camera[]
    >;
    /**
     * Called with the full list of scene cameras available in the viewer.
     * Return a modified array to filter or reorder cameras shown in the UI.
     */
    onSetCameraList?: CallbackWithDescription<
      (cameras: K3Camera[]) => K3Camera[]
    >;
    /**
     * Called to determine the pixel dimensions used when rendering screenshots.
     * Return modified dimensions to override the default canvas size.
     */
    getScreenshotDimensions?: CallbackWithDescription<
      (dim: K3ScreenshotDimensions) => K3ScreenshotDimensions
    >;
  };
  /** Core app lifecycle hooks. */
  core?: {
    /**
     * Called once with the full application data object before the K3 store is initialised.
     * Return a modified copy to patch groups, variables, values, rules, or any other app data.
     */
    preprocessFullApp?: CallbackWithDescription<(app: K3FullApp) => K3FullApp>;
    /**
     * Called after a PDF is generated and the save result is available.
     * Use this to open, download, or post-process the PDF URL from `result.pdf`.
     */
    onOpenPdf?: CallbackWithDescription<(result: K3SaveResult) => void>;
    /**
     * Called when the user triggers an AR export.
     * Receives the target platform and live Three.js scene; must return a `Blob` of the AR file.
     */
    onExportAR?: CallbackWithDescription<
      (ctx: K3ARExportContext) => Promise<Blob>
    >;
  };
}

// ─── Legacy types (unchanged) ────────────────────────────────────────────────

export interface DynamicModel {
  /** Unique type key used to reference this model from rule items, e.g. `"acme.my-model"`. */
  type: string;
  /** Human-readable display name shown in the admin model picker. */
  label: string;
  /** Describe what this dynamic model does. Shown in the plugin extensions dialog. */
  description: string | LocalizedString;
  /** Optional URL to a preview screenshot shown in the admin model picker. */
  screenshot?: string;
  /** List of Three.js material name patterns this model applies to in the scene. */
  materials: string[];
  /** When `true`, this model is excluded from AR exports (e.g. because it uses unsupported shaders). */
  disabledForAR: boolean;
  /** The React component rendered inside the Three.js canvas for this model. */
  component: React.ComponentType<any>;
  /**
   * Schema for the admin props-editor dialog.
   * Each key maps to a `ModelProp` descriptor that controls which editor widget is rendered.
   */
  propsDialog: Record<string, ModelProp>;
  /**
   * Default prop values used when a new model action is created.
   * Each key matches a `propsDialog` key; values may be plain data or `{ expression: string }`.
   */
  defaultProps: Record<string, ModelPropDefault>;
  /** Optional tag used to group or filter models in the admin UI. */
  tag?: string;
}

export interface ModelProp {
  /**
   * Editor widget type for this prop in the admin dialog.
   * `"basic"` — plain text/number input.
   * `"model"` — K3 model selector.
   * `"variable"` — K3 variable selector.
   * `"expression"` — expression / formula editor.
   */
  type?: "basic" | "model" | "variable" | "expression";
  /** Human-readable label shown next to the editor widget in the admin dialog. */
  label?: string;
  /** For type="variable": restrict which variable types are selectable. */
  allowedTypes?: VariableTypes[];
  /** For type="model": allow selecting multiple models. */
  multiple?: boolean;
}

/** All variable type string literals. */
export const VariableType = {
  List: "list",
  Color: "color",
  Number: "number",
  Text: "text",
  MultiSelect: "multiSelect",
  Boolean: "boolean",
  Image: "image",
  Upload: "upload",
  Components: "components",
  Information: "information",
} as const;

export type VariableTypes = (typeof VariableType)[keyof typeof VariableType];

export interface ModelPropDefault {
  /** An expression string evaluated at runtime instead of a static value (e.g. `"group.width * 2"`). */
  expression?: string;
}

/** K3 Value object (list / color / boolean selection). */
export interface Value {
  /** Unique database ID of the value. */
  id: number | string;
  /** Optional stable string key for the value, usable as an alternative identifier. */
  key?: string | null;
  /** The underlying data value: a hex color string, boolean flag, or generic string payload. */
  value?: string | boolean | null;
  /** Human-readable display label shown in the configurator UI. */
  label: string;
}

/**
 * Context passed to plugin dynamic model components at runtime.
 */
export interface PluginModelContext {
  /** Only set during screenshot rendering. */
  screenshotCameraName?: string;
  /** The unique ID of the model action this instance is rendered for. */
  modelActionId?: string;
}

/** @deprecated Use K3PluginDescriptor */
export type K3Plugin = Pick<K3PluginDescriptor, "dynamicModels">;
