import type { HOC } from "k3-plugin-api";
import { useEngravingView } from "./engravingView";

const deg = (degrees: number) => (degrees * Math.PI) / 180;

/**
 * OrbitControls' own defaults, passed EXPLICITLY rather than by omission.
 *
 * R3F resets a prop that disappears between renders, but for an object whose
 * constructor takes arguments — `new OrbitControls(camera, domElement)` — it has no
 * prototype to read a default from and falls back to `changedProps[key] = 0`
 * (see `diffProps` in @react-three/fiber). Dropping `minAzimuthAngle` /
 * `maxAzimuthAngle` therefore clamps azimuth to [0, 0] and freezes left/right
 * rotation instead of restoring free rotation.
 *
 * So every limit this HOC touches while active must also be given a value while
 * inactive. Keep this list in sync with engravingLimits below.
 */
const unrestrictedLimits = {
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
};

/** Keeps the user square onto the engraving. */
const engravingLimits = {
  minAzimuthAngle: deg(-20),
  maxAzimuthAngle: deg(20),
  minPolarAngle: 0,
  maxPolarAngle: deg(35),
};

/**
 * Restricts orbit rotation while the engraving view is active, and restores exactly
 * what was configured before when it ends.
 *
 * This is the reactive case — limits that depend on the current configuration.
 * STATIC limits need no plugin at all: set `minAzimuthAngle` / `maxAzimuthAngle`
 * directly on the OrbitControls entry in the scene editor's scene JSON.
 *
 * Prop order matters: defaults first so nothing is ever missing, then `props` so
 * the customer's scene-editor settings win, then our clamp while active.
 */
export const orbitLimits: HOC<Record<string, unknown>> =
  (Wrapped) => (props) => {
    const active = useEngravingView();

    return (
      <Wrapped
        {...unrestrictedLimits}
        {...props}
        {...(active ? engravingLimits : {})}
      />
    );
  };
