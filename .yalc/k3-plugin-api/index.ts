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
  /** Logic/callback hooks: pricing, config, camera, core. */
  logic?: K3LogicExtensions;

  /** @deprecated Use viewer.models instead. */
  dynamicModels?: DynamicModel[];
  /** @deprecated Use viewer.customLayoutComponents instead. */
  layoutComponents?: Record<string, React.ComponentType<any>>;
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

// ─── Logic / Callback Extensions ────────────────────────────────────────────

export interface K3LogicExtensions {
  pricing?: {
    onPriceCalculate?: (price: number) => number;
  };
  config?: {
    onUpdate?: (config: unknown) => unknown;
    onSave?: (config: unknown) => unknown;
    onSaveFiles?: (files: unknown[]) => unknown[];
    onSaveEvent?: (payload: unknown) => unknown;
  };
  camera?: {
    onSetScreenshotCameras?: (cameras: unknown[]) => unknown[];
    onSetCameraList?: (cameras: unknown[]) => unknown[];
    getScreenshotDimensions?: (dim: { width: number; height: number }) => {
      width: number;
      height: number;
    };
  };
  core?: {
    preprocessFullApp?: (app: unknown) => unknown;
    onOpenPdf?: (result: unknown) => void;
    onExportAR?: (ctx: unknown) => Promise<Blob>;
    setExpressionEngineSelections?: (selections: unknown[]) => unknown[];
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
export type K3Plugin = Pick<
  K3PluginDescriptor,
  "dynamicModels" | "layoutComponents"
>;
