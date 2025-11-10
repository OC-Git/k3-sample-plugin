import { Stack, Typography } from "@mui/material";

export const PriceDisplay = (props: any) => {
  return (
    <Stack direction="row" gap={3}>
      <Typography>Anzahl Artikel: {props.ctx.bom.length}</Typography>
      <Typography>Preis: {props.ctx.price}</Typography>
    </Stack>
  );
};
