import type { K3VariableComponentProps } from "k3-plugin-api";
import { Input, Stack, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const ColorChooser = ({
  variable,
  selection,
  values,
  onChange,
  disabled,
}: K3VariableComponentProps) => {
  const firstValue = values?.[0];
  const [color, setColor] = useState(
    (selection?.data?.inputText as string) || "#000000",
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setColor((selection?.data?.inputText as string) || "#000000");
  }, [selection?.data?.inputText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (firstValue) onChange(firstValue.id, { inputText: value } as any);
    }, 200);
  };

  return (
    <Stack direction="row" gap={3}>
      <Input
        type="color"
        data-cy="color-picker-input"
        sx={{ width: "60px" }}
        value={color}
        disabled={disabled}
        onChange={handleChange}
      />
      <TextField value={color} label={variable.label} disabled fullWidth />
    </Stack>
  );
};
