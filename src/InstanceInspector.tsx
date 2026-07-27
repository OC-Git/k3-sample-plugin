import { Box, Chip, Stack, Typography } from "@mui/material";
import {
  useConfigurationInstances,
  useConfigurationVariables,
  useOpenInstance,
} from "k3-plugin-api";
import { useMemo } from "react";
import { findComponentVariableKey } from "./findComponentVariableKey";

/**
 * Live readout of `useOpenInstance()`, rendered in the sidebar footer — right where
 * instance navigation happens, so you can watch it update as you click into and out
 * of a component instance.
 *
 * The verification that matters is the instance list below it: the entry marked
 * "offen" is the one whose `K3ConfigurationInstance.id` equals `openInstance.id`.
 * If that highlight tracks your navigation, the hook is resolving real instance ids
 * rather than a stale or default value.
 */
export const InstanceInspector = () => {
  const openInstance = useOpenInstance();
  const variables = useConfigurationVariables(true);
  const componentKey = useMemo(
    () => findComponentVariableKey(variables),
    [variables],
  );
  // Exactly one call per render — an unresolvable key yields [], so hook order
  // stays stable even when the app has no component variable at all.
  const instances = useConfigurationInstances(componentKey ?? "");

  return (
    <Box
      component="div"
      sx={{ p: 1, borderTop: 1, borderColor: "divider", fontSize: 12 }}
    >
      <Typography variant="overline" component="div">
        useOpenInstance()
      </Typography>

      <Stack direction="row" gap={0.5} flexWrap="wrap" sx={{ my: 0.5 }}>
        <Chip
          size="small"
          label={`isRoot: ${openInstance.isRoot}`}
          color={openInstance.isRoot ? "default" : "primary"}
        />
        <Chip size="small" label={`level: ${openInstance.hierarchyLevel}`} />
        <Chip
          size="small"
          label={`variableId: ${openInstance.variableId ?? "—"}`}
        />
      </Stack>

      <Typography
        variant="caption"
        component="div"
        sx={{ wordBreak: "break-all", mb: 1 }}
      >
        id: {openInstance.id || "(leer — Gesamtansicht)"}
      </Typography>

      {componentKey ? (
        <>
          <Typography variant="overline" component="div">
            Instanzen von „{componentKey}“
          </Typography>
          <Stack gap={0.5} sx={{ mt: 0.5, alignItems: "flex-start" }}>
            {instances.map((instance) => {
              const isOpen = instance.id === openInstance.id;
              return (
                <Chip
                  key={instance.id}
                  size="small"
                  variant={isOpen ? "filled" : "outlined"}
                  color={isOpen ? "success" : "default"}
                  label={`${instance.label ?? instance.id}${isOpen ? " ← offen" : ""}`}
                />
              );
            })}
            {instances.length === 0 && (
              <Typography variant="caption">
                noch keine Instanzen angelegt
              </Typography>
            )}
          </Stack>
        </>
      ) : (
        <Typography variant="caption" component="div">
          Diese App hat keine Komponenten-Variable — `isRoot` bleibt daher immer
          `true`.
        </Typography>
      )}
    </Box>
  );
};
