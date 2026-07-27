import type { HOC } from "k3-plugin-api";
import type { ReactNode } from "react";
import { EngravingViewButton } from "./EngravingViewButton";
import { InstanceInspector } from "./InstanceInspector";

/**
 * Appends the engraving toggle to the scene-button group (next to fullscreen / AR),
 * which is part of every stock K3 layout — so the example is visible with NO layout
 * editing.
 *
 * The alternative is registering the button under `viewer.customLayoutComponents`
 * and placing `<CustomLayoutComponent name="EngravingViewButton" />` in the app's
 * custom layout yourself (that is how `PriceDisplay` works). Do one or the other,
 * not both, or you get two toggles fighting over the camera.
 */
export const engravingSceneButtons: HOC<{ children?: ReactNode }> =
  (Wrapped) => (props) => (
    <Wrapped {...props}>
      {props.children}
      <EngravingViewButton />
    </Wrapped>
  );

/**
 * Puts the open-instance readout in the sidebar footer. That slot is always mounted
 * (it renders `null` by default), so this needs no layout editing either.
 *
 * `<Wrapped />` is still rendered so anything the host or another plugin puts in
 * this slot survives.
 */
export const instanceInspectorFooter: HOC<Record<string, unknown>> =
  (Wrapped) => (props) => (
    <>
      <Wrapped {...props} />
      <InstanceInspector />
    </>
  );
