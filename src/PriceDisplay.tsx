import { Stack, Typography } from "@mui/material";

/**
 * PriceDisplay — a layoutComponent.
 *
 */
export const PriceDisplay = (props: any) => {
  return (
    <Stack direction="row" gap={3}>
      <Typography>Price:{props.price ?? 0}</Typography>
    </Stack>
  );
};
