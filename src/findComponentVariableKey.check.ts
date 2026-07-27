/**
 * Self-check for findComponentVariableKey — run with `npm run check`.
 *
 * The fixtures mirror what K3's simplifiedConfigurationVariablesSelector actually
 * produces per variable type: number → scalar, text → string, list/color → a value
 * object, multiSelect → value objects WITH `id`, components → variable-maps WITHOUT.
 */
import { findComponentVariableKey } from "./findComponentVariableKey.ts";

/** Local instead of node:assert so the file needs no @types/node. */
const equal = (actual: unknown, expected: unknown, what: string) => {
  if (actual !== expected) {
    throw new Error(`${what}\n  expected: ${expected}\n  actual:   ${actual}`);
  }
};

const value = { id: 7, label: "Rot", value: "#f00" };

equal(
  findComponentVariableKey({
    breite: 120,
    gravur: "Anna & Ben",
    farbe: value,
    extras: [value, { id: 8, label: "Gold" }], // multiSelect — has id
    ringe: [{ groesse: 54, farbe: value }], // components — no id
  }),
  "ringe",
  "must pick the component variable, not multiSelect or scalars",
);

equal(
  findComponentVariableKey({ breite: 120, farbe: value, extras: [value] }),
  undefined,
  "no component variable → undefined (inspector then explains isRoot stays true)",
);

equal(
  findComponentVariableKey({ ringe: [] }),
  undefined,
  "a component variable with zero instances is not identifiable by shape",
);

equal(
  findComponentVariableKey({}),
  undefined,
  "empty map must not throw",
);

// Documents the known ceiling rather than pretending it does not exist.
equal(
  findComponentVariableKey({ ringe: [{ id: 42 }] }),
  undefined,
  "KNOWN LIMITATION: an instance variable keyed 'id' reads as multiSelect",
);

console.log("findComponentVariableKey: all checks passed");
