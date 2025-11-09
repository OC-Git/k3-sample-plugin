import { TextField } from "@mui/material";

export const ColorChooser = () => (props: any) => {
  return (
    <div>
      <input
        type="color"
        data-cy="color-picker-input"
        value={"" + props.selection?.data?.inputText || "#000000"}
        onChange={(e) =>
          props.onChange(props.value.id, { inputText: e.target.value })
        }
      />
      <TextField
        value={props.selection?.data?.inputText}
        label={props.variable.label}
        onBlur={(e) =>
          props.onChange(props.value.id, { inputText: e.target.value })
        }
      />
    </div>
  );
};
