import { Input, Stack, TextField } from "@mui/material";
import type { K3VariableComponentProps } from "k3-plugin-api";

export const ColorChooser: React.FC<K3VariableComponentProps> = (props) => {
  const valueId = props.values?.[0]?.id;
  return (
    <Stack direction="row" gap={3}>
      <Input
        type="color"
        data-cy="color-picker-input"
        sx={{ width: "60px" }}
        value={"" + props.selection?.data?.inputText || "#000000"}
        onChange={(e) =>
          valueId != null &&
          props.onChange(valueId, {
            inputValue: undefined,
            inputText: e.target.value,
          } as any)
        }
      />
      <TextField
        value={props.selection?.data?.inputText}
        label={props.variable.label}
        disabled
        fullWidth
      />
    </Stack>
  );
};
