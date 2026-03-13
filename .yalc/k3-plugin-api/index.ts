import type React from "react";

export interface K3Plugin {
  dynamicModels: DynamicModel[];
  variableTemplates: VariableTemplate[];
  layoutComponents: Record<string, React.ComponentType<any>>;
}

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

export interface VariableTemplate {
  key: string;
  label: string;
  type: string;
  component: (Wrapped: React.ComponentType<any>) => React.ComponentType<any>;
}

// ---------------------------------------------------------------------------
// VariableRef resolved prop API
// ---------------------------------------------------------------------------

/** K3 Value object (list / color / boolean selection). */
export interface Value {
  id: number | string;
  key?: string | null;
  value?: string | boolean | null;
  label: string;
}
// ---------------------------------------------------------------------------
// Plugin model context
// ---------------------------------------------------------------------------

/**
 * Context passed to plugin dynamic model components at runtime.
 */
export interface PluginModelContext {
  /** Only set during screenshot rendering. */
  screenshotCameraName?: string;
  /** The unique ID of the model action this instance is rendered for. */
  modelActionId?: string;
}
