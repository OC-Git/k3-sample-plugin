import { Input, Stack, TextField } from "@mui/material";

/**
 * ColorChooser — a custom variableTemplate component.
 *
 * variableTemplate components use a curried factory:
 *   export const MyTemplate = () => (props) => <JSX />;
 * The outer function receives no arguments; K3 calls it once and uses the
 * returned inner component as the React element for each variable of this type.
 *
 * Props injected by K3 into the inner component:
 *   props.variable          — variable definition ({ id, label, type, … })
 *   props.value             — the current Value object for this variable
 *                             ({ id, key, label, data, … })
 *   props.selection         — the currently active selection (can be null)
 *   props.selection.data    — arbitrary custom data stored on that selection;
 *                             shape is owned by your component (here: { inputText })
 *   props.onChange(id, data) — call to persist new custom data;
 *                             pass props.value.id as the first argument
 */
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
