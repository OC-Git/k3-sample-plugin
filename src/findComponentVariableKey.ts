import type { K3ConfigurationVariables } from "k3-plugin-api";

/**
 * Finds the first component variable in a `useConfigurationVariables()` map.
 *
 * ponytail: identifies it by SHAPE rather than by asking K3 for the variable type,
 * because the runtime map carries no type tag. A component entry is an array of
 * plain variable-maps; a multiSelect entry is an array of values carrying
 * `id`/`label`. Ceiling: a component whose instances have a variable literally
 * keyed `"id"` would be misread as multiSelect. A real plugin knows its own key and
 * should skip this entirely — `useConfigurationInstances("meineKomponente")`.
 *
 * Self-check: `npm run check`
 */
export const findComponentVariableKey = (
  variables: K3ConfigurationVariables,
): string | undefined =>
  Object.keys(variables).find((key) => {
    const entry = variables[key];
    if (!Array.isArray(entry) || entry.length === 0) return false;
    const first = entry[0];
    return typeof first === "object" && first !== null && !("id" in first);
  });
