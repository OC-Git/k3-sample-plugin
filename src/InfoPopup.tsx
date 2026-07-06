/**
 * DOM side of the HoverInfo demo.
 *
 * Renders a context popup into its OWN React root (createRoot on a div
 * appended to document.body) — deliberately outside the K3 tree, to
 * demonstrate `K3Providers`: it bridges the host's Redux store, theme and
 * query client, so K3 components like `StandaloneVariable` and `Price`
 * work inside a plugin-owned root.
 */
import { K3Providers, Price, StandaloneVariable } from "k3-plugin-api";
import { useEffect, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";

type PopupState = {
  /** Screen position of the click that opened the popup. */
  anchor: { x: number; y: number } | null;
  /** Database IDs of the variables to show (from the model's VariableRef props). */
  variableIds: (number | string)[];
};

// ponytail: module-level store instead of zustand — the plugin has no state
// lib as dependency and this is one popup. Upgrade path: zustand vanilla store.
let state: PopupState = { anchor: null, variableIds: [] };
const listeners = new Set<() => void>();
const setState = (next: PopupState) => {
  state = next;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const closeInfoPopup = () => setState({ anchor: null, variableIds: [] });

/** Opens the popup at the given screen position. Mounts the root on first use. */
export const openInfoPopup = (
  x: number,
  y: number,
  variableIds: (number | string)[],
) => {
  mountOnce();
  setState({ anchor: { x, y }, variableIds });
};

const InfoPopupHost = () => {
  const { anchor, variableIds } = useSyncExternalStore(subscribe, () => state);

  // Close on Escape
  useEffect(() => {
    if (!anchor) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeInfoPopup();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anchor]);

  if (!anchor) return null;

  return (
    <>
      {/* click-outside backdrop. z-index stays BELOW MUI's modal layer (1300)
          so Select dropdowns from StandaloneVariable open ABOVE the popup. */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 1250 }}
        onClick={closeInfoPopup}
      />
      <div
        style={{
          position: "fixed",
          // keep the popup on screen near the click point
          left: Math.min(anchor.x, window.innerWidth - 340),
          top: Math.min(anchor.y, window.innerHeight - 320),
          width: 320,
          maxHeight: 300,
          overflowY: "auto",
          zIndex: 1251,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          padding: 12,
        }}
      >
        {/* Plain header: host components like TranslatableText grow an
            editor-only edit affordance that needs the router — which this
            standalone root intentionally does not have. */}
        <div style={{ fontWeight: 600, marginBottom: 8 }}>
          Komponente anpassen
        </div>
        {variableIds.length === 0 && (
          <div>
            No variables assigned — pick some in the model's props dialog.
          </div>
        )}
        {variableIds.map((id) => (
          <StandaloneVariable key={id} variableId={id} sticky dense />
        ))}
        <div style={{ marginTop: 8, textAlign: "right" }}>
          <Price />
        </div>
      </div>
    </>
  );
};

let mounted = false;
const mountOnce = () => {
  if (mounted) return;
  mounted = true;
  const el = document.createElement("div");
  el.id = "k3-sample-plugin-info-popup";
  document.body.appendChild(el);
  createRoot(el).render(
    <K3Providers>
      <InfoPopupHost />
    </K3Providers>,
  );
};
