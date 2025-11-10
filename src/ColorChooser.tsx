import { Input, Stack, TextField } from "@mui/material";

export const ColorChooser = () => (props: any) => {
  return (
    <Stack direction="row" gap={3}>
      <Input
        type="color"
        data-cy="color-picker-input"
        sx={{ width: "60px" }}
        value={"" + props.selection?.data?.inputText || "#000000"}
        onChange={(e) =>
          props.onChange(props.value.id, { inputText: e.target.value })
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
