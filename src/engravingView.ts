import { useSyncExternalStore } from "react";

/**
 * Plugin-internal state shared between `EngravingViewButton` (a layout component)
 * and `orbitLimits` (a scene component).
 *
 * Those two live in DIFFERENT React roots: R3F's `<Canvas>` mounts its own
 * reconciler, so React context does NOT cross into the 3D scene. An external store
 * does. `useSyncExternalStore` comes from React itself, which the host already
 * shares as a singleton — no extra dependency needed.
 */
let engravingView = false;
const listeners = new Set<() => void>();

export const setEngravingView = (active: boolean) => {
  if (engravingView === active) return;
  engravingView = active;
  listeners.forEach((notify) => notify());
};

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
};

const getSnapshot = () => engravingView;

/** Reactive in both the DOM tree and the 3D scene. */
export const useEngravingView = () =>
  useSyncExternalStore(subscribe, getSnapshot);
