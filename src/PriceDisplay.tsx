import { Stack, Typography } from "@mui/material";
import type { CustomLayoutComponentProps } from "k3-plugin-api";

export const PriceDisplay = (props: CustomLayoutComponentProps) => {
  return (
    <Stack direction="row" gap={3}>
      <Typography>Anzahl Artikel: {props.bom.length}</Typography>
      <Typography>Preis: {props.totalPrice}</Typography>
    </Stack>
  );
};
