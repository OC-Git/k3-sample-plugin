import type { HOC } from "k3-plugin-api";

const SLOT_COLORS: Record<string, string> = {
  // layout
  root: "#7c3aed",
  header: "#db2777",
  sidebar: "#0891b2",
  sidebarHeader: "#0e7490",
  sidebarFooter: "#164e63",
  footer: "#b45309",
  contentView: "#15803d",
  gallery: "#b91c1c",
  branding: "#6d28d9",
  logo: "#c026d3",
  navigationButtons: "#d97706",
  exitButtons: "#dc2626",
  sceneButtons: "#2563eb",
  price: "#16a34a",
  labelActionDisplay: "#7c3aed",
  mobileLabelActionDisplay: "#9333ea",
  invalidRuleModal: "#ef4444",
  mountedWhenLoaded: "#059669",
  configurator: "#0284c7",
  groupLabel: "#ca8a04",
  groupPanel: "#ea580c",
  additionalGroups: "#8b5cf6",
  additionalVars: "#10b981",
  variableLabel: "#f43f5e",
  // dialogs - order
  orderRoot: "#6366f1",
  orderHeadline: "#8b5cf6",
  orderContactFields: "#a855f7",
  orderPriceTable: "#ec4899",
  orderPriceTableSelectionList: "#ec4899",
  orderPriceTableArticleList: "#f472b6",
  orderPriceTableTotal: "#fb7185",
  orderConfirmationSuccess: "#22c55e",
  orderConfirmationError: "#ef4444",
  // dialogs - warnings
  warningInvalidSelection: "#f97316",
  warningInvalidSelectionIcon: "#fb923c",
  warningInvalidSelectionTooltip: "#fdba74",
  warningNumberWarningTooltip: "#fbbf24",
  // viewer
  canvas: "#1d4ed8",
  demoScene: "#0f766e",
  labelsDisplay: "#7c2d12",
  labelsMobile: "#92400e",
};

const LABEL_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  fontSize: 9,
  fontFamily: "monospace",
  color: "#fff",
  padding: "1px 4px",
  pointerEvents: "none",
  zIndex: 9999,
  borderRadius: "0 0 3px 0",
  opacity: 0.85,
};

const WRAPPER_STYLE = (color: string): React.CSSProperties => ({
  position: "relative",
  outline: `1px dashed ${color}`,
  outlineOffset: -1,
});

/**
 * Creates a HOC that adds a colored dashed outline + slot-name badge
 * around the wrapped component, so every plugin slot is visually identifiable.
 */
export const createSlotHOC =
  (slotKey: string): HOC =>
  (Wrapped) =>
  (props) => {
    const color = SLOT_COLORS[slotKey] ?? "#888";
    return (
      <div style={WRAPPER_STYLE(color)}>
        <span style={{ ...LABEL_STYLE, background: color }}>{slotKey}</span>
        <Wrapped {...props} />
      </div>
    );
  };
