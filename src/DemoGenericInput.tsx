import type { K3VariableComponentProps, VariableTypes } from "k3-plugin-api";

/**
 * DemoGenericInput — stub VariableVisualisation component for all variable types.
 * Shows variable data as JSON and provides a minimal onChange trigger.
 */
export const DemoGenericInput = ({
  variable,
  selection,
  values,
  onChange,
  disabled,
}: K3VariableComponentProps) => {
  const firstValue = values?.[0];
  return (
    <div
      style={{
        padding: "8px 12px",
        background: "#f1f5f9",
        border: "1px dashed #94a3b8",
        borderRadius: 4,
        fontSize: 11,
        fontFamily: "monospace",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        [{variable.type}] {variable.label}
      </div>
      <div style={{ color: "#475569", marginBottom: 6 }}>
        selection: {JSON.stringify(selection?.id ?? null)}
      </div>
      {firstValue && (
        <button
          disabled={disabled}
          onClick={() => onChange(firstValue.id)}
          style={{ fontSize: 10, padding: "2px 6px", cursor: "pointer" }}
        >
          select first value
        </button>
      )}
    </div>
  );
};

/** Factory so each input type gets its own stable component reference */
export const createGenericInput = (_type: VariableTypes) => DemoGenericInput;
