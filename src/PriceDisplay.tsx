import { Stack, Typography } from "@mui/material";
import { useBOM, useFormattedTotalPrice, type K3BomEntry } from "k3-plugin-api";

export const PriceDisplay = () => {
  const bom = useBOM();
  const formattedPrice = useFormattedTotalPrice();
  console.log("BOM in PriceDisplay:", bom);
  return (
    <Stack gap={1}>
      {bom.map((entry: K3BomEntry) => (
        <Typography key={`${entry.article.id}`} variant="body2">
          {entry.article.name} &times;{entry.qty}
        </Typography>
      ))}
      <Typography variant="h6">{formattedPrice}</Typography>
    </Stack>
  );
};
