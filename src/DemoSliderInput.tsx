import type { K3VariableComponentProps } from "k3-plugin-api";
import React, { useEffect, useRef, useState } from "react";

/**
 * DemoSliderInput — full variable renderer (Darstellung) for number-type variables.
 * Registered under key "sample.slider".
 */
export const DemoSliderInput = ({
  variable,
  selection,
  values,
  onChange,
  disabled,
}: K3VariableComponentProps) => {
  const min = variable?.settings?.templateOptions?.min ?? 0;
  const max = variable?.settings?.templateOptions?.max ?? 100;
  const initial = Number(selection?.data?.inputValue ?? min);
  const [current, setCurrent] = useState(initial);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external selection changes (e.g. rule-engine override)
  useEffect(() => {
    setCurrent(Number(selection?.data?.inputValue ?? min));
  }, [selection?.data?.inputValue, min]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setCurrent(num);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const firstValue = values?.[0];
    debounceRef.current = setTimeout(() => {
      if (firstValue) onChange(firstValue.id, { inputValue: num });
    }, 200);
  };

  return (
    <div style={{ padding: "8px 12px" }}>
      <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>
        {variable.label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="range"
          min={min}
          max={max}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 11, minWidth: 28, textAlign: "right" }}>
          {current}
        </span>
      </div>
    </div>
  );
};
