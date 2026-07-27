import { Button, Stack, Typography } from "@mui/material";
import {
  useOpenInstance,
  useSetCameraPosition,
  type K3CameraTarget,
} from "k3-plugin-api";
import { useEffect } from "react";
import { setEngravingView, useEngravingView } from "./engravingView";

/**
 * Straight above the ring looking down into it — square onto the inner surface
 * where the engraving sits. `focusType: "static"` keeps exactly this position
 * instead of letting K3 reframe to the whole scene bounding box.
 */
const ENGRAVING_CAMERA: K3CameraTarget = {
  position: [0, 1.6, 0],
  lookAt: [0, 0, 0],
  focusType: "static",
};

/**
 * Toggles a perpendicular "look into the ring" engraving view.
 *
 * Demonstrates all three plugin-API additions working together:
 *  - `useSetCameraPosition()` moves the camera square onto the inner surface
 *  - `viewer.sceneComponents.OrbitControls` (see `orbitLimits`) locks rotation
 *    while the view is active, so the user cannot spin away from the engraving
 *  - `useOpenInstance()` reports which component instance is being edited
 */
export const EngravingViewButton = () => {
  const active = useEngravingView();
  const setCameraPosition = useSetCameraPosition();
  const openInstance = useOpenInstance();

  useEffect(() => {
    if (!active) return;
    setCameraPosition(ENGRAVING_CAMERA);
    // Releasing on cleanup hands the camera back to K3. It is owner-scoped, so if
    // another plugin has taken the camera over since, this is a no-op.
    return () => setCameraPosition(null);
  }, [active, setCameraPosition]);

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Button
        variant={active ? "contained" : "outlined"}
        size="small"
        onClick={() => setEngravingView(!active)}
      >
        {active ? "Gravur-Ansicht beenden" : "Gravur ansehen"}
      </Button>
      <Typography variant="caption">
        {openInstance.isRoot
          ? "Gesamtansicht"
          : `Bearbeitet: Instanz ${openInstance.id} (Ebene ${openInstance.hierarchyLevel})`}
      </Typography>
    </Stack>
  );
};
