import type { CustomLayoutComponentProps } from "k3-plugin-api";
import { Stack, Typography } from "@mui/material";

/**
 * PriceDisplay — a layoutComponent.
 *
 * (WIP): Receives BOM and totalPrice from the configurator via CustomLayoutComponentProps.
 */
export const PriceDisplay = (props: CustomLayoutComponentProps) => {
  return (
    <Stack direction="row" gap={3}>
      <Typography>Price: {props.totalPrice ?? 0}</Typography>
      <Typography>BOM lines: {props.bom.length}</Typography>
    </Stack>
  );
};
