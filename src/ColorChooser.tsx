import type { K3VariableComponentProps } from "k3-plugin-api";
import { Input, Stack, TextField } from "@mui/material";

export const ColorChooser = ({
  variable,
  selection,
  values,
  onChange,
  disabled,
}: K3VariableComponentProps) => {
  const firstValue = values?.[0];

  return (
    <Stack direction="row" gap={3}>
      <Input
        type="color"
        data-cy="color-picker-input"
        sx={{ width: "60px" }}
        value={(selection?.data?.inputText as string) || "#000000"}
        disabled={disabled}
        onChange={(e) => {
          if (firstValue)
            onChange(firstValue.id, { inputText: e.target.value } as any);
        }}
      />
      <TextField
        value={(selection?.data?.inputText as string) ?? ""}
        label={variable.label}
        disabled
        fullWidth
      />
    </Stack>
  );
};
