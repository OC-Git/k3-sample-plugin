import type React from "react";

// ─── HOC type (mirrors K3 internal, no K3 imports) ──────────────────────────

/** A Higher-Order Component: takes the default component, returns a new one. */
export type HOC<P = Record<string, unknown>> = (
  comp: React.FC<P>,
) => React.FC<P>;

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
  root?: HOC;
  header?: HOC;
  sidebar?: HOC;
  sidebarHeader?: HOC;
  sidebarFooter?: HOC;
  footer?: HOC;
  contentView?: HOC;
  gallery?: HOC;
  branding?: HOC;
  logo?: HOC;
  navigationButtons?: HOC;
  exitButtons?: HOC;
  sceneButtons?: HOC;
  price?: HOC;
  labelActionDisplay?: HOC;
  mobileLabelActionDisplay?: HOC;
  invalidRuleModal?: HOC;
  mountedWhenLoaded?: HOC;
  configurator?: HOC;
  groupLabel?: HOC;
  groupPanel?: HOC;
  additionalGroups?: HOC;
  additionalVars?: HOC;
  variableLabel?: HOC;
}

/**
 * Props passed to a plugin variable component (VariableVisualisation.component) at runtime.
 * Use these to render a fully custom variable input UI.
 */
export interface K3VariableComponentProps {
  variable: {
    id: string | number;
    label: string;
    type: VariableTypes;
    settings?: {
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
  selection?: {
    id: string | number;
    data?: {
      inputValue?: number;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  values?: Array<{
    id: string | number;
    label: string;
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
  order?: K3OrderDialogExtensions;
  warnings?: K3WarningExtensions;
}

export interface K3OrderDialogExtensions {
  root?: HOC;
  headline?: HOC;
  contactFields?: HOC;
  priceTable?: HOC;
  priceTableSelectionList?: HOC;
  priceTableArticleList?: HOC;
  priceTableTotal?: HOC;
  confirmationSuccess?: HOC;
  confirmationError?: HOC;
}

export interface K3WarningExtensions {
  invalidSelection?: HOC;
  invalidSelectionIcon?: HOC;
  invalidSelectionTooltip?: HOC;
  numberWarningTooltip?: HOC;
}

// ─── Viewer Extensions ──────────────────────────────────────────────────────

export interface K3ViewerExtensions {
  canvas?: HOC;
  sceneComponents?: Record<string, HOC>;
  customLayoutComponents?: Record<string, React.ComponentType<any>>;
  models?: DynamicModel[];
  labels?: {
    display?: HOC;
    mobile?: HOC;
  };
}

// ─── Logic Callback Types ────────────────────────────────────────────────────

/** [x, y, z] coordinate tuple used on camera objects. */
export type K3Coordinates = [number, number, number];

export type K3CameraScope =
  | { type: "group" | "variable"; id: number }
  | { type: "general"; id?: null };

interface K3BaseCamera {
  id: string;
  name: string;
  position: K3Coordinates;
  lookAt: K3Coordinates;
  rotation: K3Coordinates;
  resolution?: { width: number; height: number };
  threshold?: number;
  focusType?: "dynamic" | "static";
  scope?: K3CameraScope;
  zoom?: number;
  [key: string]: unknown;
}

/** A perspective camera configured in the K3 scene editor. */
export interface K3PerspectiveCamera extends K3BaseCamera {
  type: "PerspectiveCamera";
  baseSettings?: { fov: number; aspect: number; near: number; far: number };
}

/** An orthographic camera configured in the K3 scene editor. */
export interface K3OrthographicCamera extends K3BaseCamera {
  type: "OrthographicCamera";
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
  type: string;
  children: readonly K3Scene[];
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
  error?: boolean;
  message?: string;
  shopLink?: string;
  /** URL to the generated PDF. */
  pdf?: string;
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
  id: number | string;
  appId: number;
  code: string;
  price: number | null;
  /** ISO language code. */
  lang: string;
  /** Serialised selection state and BOM. */
  json: {
    variables: unknown[];
    bom: unknown[];
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
  variableId: number;
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
  config?: {
    onUpdate?: (config: K3Configuration) => K3Configuration;
    onSave?: (
      config: K3Configuration | K3NewConfiguration,
    ) => K3Configuration | K3NewConfiguration;
    onSaveFiles?: (files: K3UploadFile[]) => K3UploadFile[];
    onSaveEvent?: (
      payload: K3ConfigurationSavedEvent,
    ) => K3ConfigurationSavedEvent;
  };
  camera?: {
    onSetScreenshotCameras?: (cameras: K3Camera[]) => K3Camera[];
    onSetCameraList?: (cameras: K3Camera[]) => K3Camera[];
    getScreenshotDimensions?: (
      dim: K3ScreenshotDimensions,
    ) => K3ScreenshotDimensions;
  };
  core?: {
    preprocessFullApp?: (app: K3FullApp) => K3FullApp;
    onOpenPdf?: (result: K3SaveResult) => void;
    onExportAR?: (ctx: K3ARExportContext) => Promise<Blob>;
  };
}

// ─── Legacy types (unchanged) ────────────────────────────────────────────────

export interface DynamicModel {
  type: string;
  label: string;
  screenshot?: string;
  materials: string[];
  disabledForAR: boolean;
  component: React.ComponentType<any>;
  propsDialog: Record<string, ModelProp>;
  defaultProps: Record<string, ModelPropDefault>;
  tag?: string;
}

export interface ModelProp {
  type?: "basic" | "model" | "variable" | "expression";
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
  expression?: string;
}

/** K3 Value object (list / color / boolean selection). */
export interface Value {
  id: number | string;
  key?: string | null;
  value?: string | boolean | null;
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
