import { Stack, Typography } from "@mui/material";

/**
 * PriceDisplay — a layoutComponent.
 *
 * layoutComponents are React components the admin can drag into a
 * configurator layout. They receive a single `ctx` prop:
 *
 *   props.ctx.bom    — BOM array: one entry per selected article / part.
 *                      Each entry describes a fully configured product position.
 *   props.ctx.price  — Current total price string as computed by the K3 price
 *                      engine (may be empty when no price rule matches).
 */
export const PriceDisplay = (props: any) => {
  return (
    <Stack direction="row" gap={3}>
      <Typography>Anzahl Artikel: {props.ctx.bom.length}</Typography>
      <Typography>Preis: {props.ctx.price}</Typography>
    </Stack>
  );
};
