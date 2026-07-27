# k3-plugin-api

> Official TypeScript types for the plugin API for the [K3 product configurator](https://k3-konfigurator.de/).

[![npm version](https://img.shields.io/npm/v/k3-plugin-api)](https://www.npmjs.com/package/k3-plugin-api)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

---

## What is K3?

[K3](https://k3-konfigurator.de/) is a professional product configurator platform by **ObjectCode GmbH**. It lets companies sell complex, customizable products online — with live price calculation, 3D visualization, AR, and integrations into Shopify, Shopware 6, WooCommerce, and many more shop systems.

## What is this package?

`k3-plugin-api` provides the **TypeScript types and runtime hooks** required to build K3 plugins — packages that extend the K3 configurator runtime with custom UI components, 3D models, pricing logic, and lifecycle hooks. It ships a thin runtime layer (reactive hooks like `useBOM()`, `useApp()`, etc.) that K3 injects at load time, plus all the type definitions for the plugin descriptor API.

---

## Installation

```sh
npm install k3-plugin-api
# or
pnpm add k3-plugin-api
```

---

## Quick Start

A K3 plugin exports a `K3PluginDescriptor` object:

```ts
import type { K3PluginDescriptor } from "k3-plugin-api";

const plugin: K3PluginDescriptor = {
  id: "acme.my-plugin",   // globally unique, stable identifier
  version: "1.0.0",

  ui: {
    layout: {
      // wrap the default header with your own component
      header: {
        hoc: (Default) => (props) => <MyCustomHeader fallback={Default} {...props} />,
        description: "Custom branded header",
      },
    },
  },

  logic: {
    config: {
      // attach a custom order code to the configuration before it is persisted
      onSave: {
        fn: (config) => ({ ...config, code: `TEST-${config.code}` }),
        description: "Prepend TEST- to configuration code",
      },
    },
  },
};

export default plugin;
```

---

## Extension Points

K3 plugins can extend three layers of the configurator.

### Runtime Hooks

Plugins can access K3 configurator state at runtime using React hooks. These are automatically injected when the plugin is loaded via `init()`.

```ts
import {
  useK3PluginSettings,
  useConfigurationVariables,
  useConfigurationVariable,
  useBOM,
  useTotalPrice,
  useFormattedTotalPrice,
  useApp,
  getSettings,
} from "k3-plugin-api";

const MyComponent = () => {
  // Reactive plugin settings
  const settings = useK3PluginSettings("acme.my-plugin") as { apiKey?: string };

  // All configuration variables as a key-value map
  const variables = useConfigurationVariables();

  // Single variable by key
  const color = useConfigurationVariable("color");

  // Bill-of-Materials
  const bom = useBOM();

  // Price (raw number or formatted string)
  const price = useTotalPrice();
  const formattedPrice = useFormattedTotalPrice();

  // App metadata (product, subscription, etc.)
  const app = useApp();

  return (
    <div>
      <p>API Key: {settings.apiKey}</p>
      <p>Total items: {bom.length}</p>
      <p>Price: {formattedPrice}</p>
    </div>
  );
};
```

Available hooks & functions:

| Export                               | Description                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| `getSettings(pluginId)`              | Non-reactive snapshot of plugin settings                                        |
| `useK3PluginSettings(pluginId)`      | Reactive hook — re-renders on settings change                                   |
| `useConfigurationVariables()`        | All configuration variables as `Record<string, K3ConfigurationVariableEntry>`   |
| `useConfigurationVariable(key)`      | Single variable value by its stable key                                         |
| `useBOM()`                           | Current Bill-of-Materials (`K3BomEntry[]`)                                      |
| `useTotalPrice()`                    | Raw total price as `number`                                                     |
| `useFormattedTotalPrice()`           | Locale-formatted price string (e.g. `"1.299,00 €"`)                             |
| `useApp()`                           | App metadata (`K3AppInfo \| null`) — product, subscription, feature flags       |
| `useConfigurationInstances(keyOrId)` | Reactive list of a component variable's instances (`K3ConfigurationInstance[]`) |
| `useOpenInstance()`                  | The component instance the user currently has open (`K3OpenInstance`)           |
| `useSetCameraPosition()`             | Setter that moves the live viewer camera (`K3CameraTarget \| null`)             |

### Moving the camera

Use `useSetCameraPosition()` rather than writing `camera.position` from
`useThree()` — K3's camera system and OrbitControls both drive the camera every
frame, so a direct write is overwritten immediately. Pass `null` to hand the
camera back to K3.

```tsx
import { useOpenInstance, useSetCameraPosition } from "k3-plugin-api";

const setCameraPosition = useSetCameraPosition();
const openInstance = useOpenInstance();

useEffect(() => {
  if (openInstance.id !== sidewallId) return;
  // Step 1 m out along the wall's normal, then look back at it. `objectNames`
  // lets K3 reframe to fit the wall, so you need not know its size.
  setCameraPosition({
    position: [wall.x + normal.x, wall.y, wall.z + normal.z],
    lookAt: [wall.x, wall.y, wall.z],
    objectNames: [wallObjectName],
  });
  return () => setCameraPosition(null);
}, [openInstance.id, sidewallId, setCameraPosition]);
```

### Restricting orbit rotation

Reactive orbit limits go through `viewer.sceneComponents.OrbitControls`. Static
limits need no plugin at all — set `minAzimuthAngle` / `maxAzimuthAngle` directly
on the OrbitControls entry in the scene editor's scene JSON.

```tsx
sceneComponents: {
  OrbitControls: {
    description: "Restricts rotation when the veranda is wall-mounted",
    hoc: (Wrapped) => (props) => {
      const freestanding = useConfigurationVariable("freistehend");
      const limit = Math.PI * (85 / 180);
      return (
        <Wrapped
          {...props}
          minAzimuthAngle={freestanding ? -Infinity : -limit}
          maxAzimuthAngle={freestanding ? Infinity : limit}
        />
      );
    },
  },
}
```

Spread `props` first so values from the scene editor survive, then override only
what the plugin controls.

**Never stop passing a prop you conditionally control — pass its default instead.**
R3F resets a prop that disappears between renders, but for a Three.js object whose
constructor takes arguments (OrbitControls, EffectComposer, …) it has no prototype
default to read and falls back to `0`. So dropping `minAzimuthAngle` /
`maxAzimuthAngle` clamps azimuth to `[0, 0]` and freezes rotation rather than
restoring it. The ternaries above always yield a value, which is what makes them
safe. When several limits are involved, a defaults object is clearer:

```tsx
// OrbitControls' real defaults, passed explicitly rather than by omission
const unrestrictedLimits = {
  minAzimuthAngle: -Infinity,
  maxAzimuthAngle: Infinity,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
};

// defaults first, then the scene editor's settings, then our clamp while active
<Wrapped {...unrestrictedLimits} {...props} {...(active ? engravingLimits : {})} />;
```

### Mutating the configuration

Plugins can also drive the configurator — change variables and add/remove
component instances. These are hooks too; each returns a bound function.

```ts
import {
  useSetConfigurationVariable,
  useConfigurationInstances,
  useAddConfigurationInstance,
  useRemoveConfigurationInstance,
  useAcceptConfigurationConflict,
  useRejectConfigurationConflict,
} from "k3-plugin-api";

const MyControls = () => {
  const setVariable = useSetConfigurationVariable();
  const acceptConflict = useAcceptConfigurationConflict();
  const rejectConflict = useRejectConfigurationConflict();

  const addInstance = useAddConfigurationInstance();
  const removeInstance = useRemoveConfigurationInstance();
  const cabinets = useConfigurationInstances("cabinets"); // reactive

  const onPickColor = async (valueId: number) => {
    // list/color/boolean → value id; number variables → the raw number
    const res = await setVariable("color", valueId);
    if (res.conflict) {
      // NOT applied yet — res.changes lists what would change if accepted
      console.log("would also change:", res.changes);
      acceptConflict(); // or rejectConflict()
    }
  };

  return (
    <>
      <button onClick={() => addInstance("cabinet")}>Add cabinet</button>
      {cabinets.map((c) => (
        <button key={c.id} onClick={() => removeInstance(c.id)}>
          Remove {c.label}
        </button>
      ))}
    </>
  );
};
```

| Export                               | Description                                                                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useSetConfigurationVariable()`      | Returns `setVariable(keyOrId, value, data?)` → `Promise<K3SetVariableResult>`. Number variables take the raw number (snapped internally); others take the value id. |
| `useAcceptConfigurationConflict()`   | Returns a function that applies the pending conflict's alternative                                                                                                  |
| `useRejectConfigurationConflict()`   | Returns a function that discards the pending conflict                                                                                                               |
| `useConfigurationInstances(keyOrId)` | Reactive list of a component variable's instances, each with `id`, `label`, `sort`                                                                                  |
| `useAddConfigurationInstance()`      | Returns `add(valueKeyOrId, parentInstanceId?)` → `Promise<K3SetVariableResult>`                                                                                     |
| `useRemoveConfigurationInstance()`   | Returns `remove(instanceId)` → `Promise<K3SetVariableResult>`                                                                                                       |

Every mutation resolves to a `K3SetVariableResult`. On a rule conflict the change
is **not** applied (`result.conflict === true`) — inspect `result.changes` and
then accept or reject. On failure `result.status === "error"` and
`result.error` carries a human-readable reason. `parentInstanceId` for nested
components comes from `useConfigurationInstances(...)[n].id`; omit it for
top-level variables (defaults to the currently open instance).

### `settings` — Plugin Settings Component

Plugins can provide a settings UI component that will be rendered in the K3 admin panel. This allows administrators to configure plugin-specific options that are persisted per plugin instance.

```ts
import type { K3PluginDescriptor } from "k3-plugin-api";

const SettingsComponent = ({ settings, onSave }) => {
  return (
    <div>
      <input
        value={settings.apiKey || ""}
        onChange={(e) => onSave({ ...settings, apiKey: e.target.value })}
      />
    </div>
  );
};

const plugin: K3PluginDescriptor = {
  id: "acme.my-plugin",
  version: "1.0.0",
  settings: SettingsComponent,
};
```

The `settings` component receives:

- `settings: unknown` — The current settings object (initially `{}`)
- `onSave: (settings: unknown) => void` — Callback to persist updated settings

Settings are stored per plugin instance and can be accessed at runtime via the plugin's configuration.

### `ui` — UI Extensions

| Property     | Description                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------- |
| `ui.layout`  | Override layout shell components (header, sidebar, footer, …) using Higher-Order Components   |
| `ui.inputs`  | Register custom variable visualisations per data type (list, color, number, text, boolean, …) |
| `ui.dialogs` | Override the order dialog and warning/validation components                                   |

### `viewer` — 3D Viewer Extensions

| Property                 | Description                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| `viewer.canvas`          | Wrap the Three.js canvas element                                                 |
| `viewer.sceneComponents` | Wrap a scene component by its scene-JSON name (`"OrbitControls"`, `"Bounds"`, …) |
| `viewer.models`          | Register dynamic 3D model types (`DynamicModel`)                                 |
| `viewer.labels`          | Override the label overlay components (desktop and mobile)                       |

### `logic` — Logic & Lifecycle Hooks

| Property                               | Description                                                            |
| -------------------------------------- | ---------------------------------------------------------------------- |
| `logic.config.onUpdate`                | Transform a `K3Configuration` on every update                          |
| `logic.config.onSave`                  | Transform a configuration before it is persisted                       |
| `logic.config.onSaveFiles`             | Modify screenshot `Blob` files before they are uploaded                |
| `logic.config.onSaveEvent`             | React to a completed save / order action (`K3ConfigurationSavedEvent`) |
| `logic.camera.onSetCameraList`         | Filter or reorder the scene camera list                                |
| `logic.camera.onSetScreenshotCameras`  | Control which cameras are used for screenshots                         |
| `logic.camera.getScreenshotDimensions` | Override the screenshot render resolution                              |
| `logic.core.preprocessFullApp`         | Transform the raw `K3FullApp` snapshot before the store initialises    |
| `logic.core.onOpenPdf`                 | Called after a PDF has been generated (receive the `K3SaveResult`)     |
| `logic.core.onExportAR`                | Custom AR export — receives scene context, must return a `Blob`        |

---

## Custom Variable Visualisations

Register a fully custom input component for any variable type:

```ts
import type { K3PluginDescriptor, VariableVisualisation } from "k3-plugin-api";

const mySlider: VariableVisualisation = {
  key: "acme.mySlider", // namespaced key — set on the variable in the K3 admin
  label: "ACME Slider",
  component: MySliderComponent, // React.ComponentType<K3VariableComponentProps>
};

const plugin: K3PluginDescriptor = {
  id: "acme.my-plugin",
  version: "1.0.0",
  ui: {
    inputs: {
      number: [mySlider],
    },
  },
};
```

---

## Using K3 Components in Your Plugin

_Requires K3 ≥ 11.14 / k3-plugin-api ≥ 2.1._

All configurator components are exported as proxies that resolve to the live
host implementation at render time — `Price`, `StandaloneVariable`,
`GroupsView`, `SwitchButton`, `HoverContent`, and ~35 more:

```tsx
import { Price, StandaloneVariable } from "k3-plugin-api";

// Inside any K3 slot (customLayoutComponents, HOCs, visualisations)
// they just work:
const MyPanel = () => (
  <div>
    <StandaloneVariable variableKey="color" sticky dense />
    <Price />
  </div>
);
```

Anything not statically exported (e.g. MUI wrappers used by layouts) is
reachable through the live map: `useK3ComponentMap().Typography`.

### Standalone React roots

To render K3 components **outside** the K3 tree (own `createRoot`, e.g. a
popup or a companion widget), wrap them in `K3Providers`. While the
configurator is mounted, children render inside the live host tree via a
reverse portal and see every host context (Redux, router, worker, app theme):

```tsx
import { createRoot } from "react-dom/client";
import { K3Providers, StandaloneVariable } from "k3-plugin-api";

createRoot(el).render(
  <K3Providers>
    <StandaloneVariable variableId={someId} sticky />
  </K3Providers>,
);
```

Exceptions: `SceneView` / `EditScene` / `Content` mount the live 3D scene —
use them only in layout slots, never in popups.

### Variable identity in dynamic models

`type: "variable"` props arrive **resolved to their runtime value** (a number
prop is a bare scalar). The raw refs arrive separately in
`props.variableRefs`, keyed by prop name — combine with `StandaloneVariable`
to render full K3 inputs for the variables an admin picked:

```tsx
const MyModel = (props: DynamicModelComponentProps) => {
  const ids = Object.values(props.variableRefs ?? {}).map((r) => r.variableId);
  // e.g. open a popup rendering <StandaloneVariable variableId={id} sticky />
};
```

See the `k3-sample-plugin` Hover-Info demo for a complete example
(hoverable/clickable model + context popup with live variable inputs).

---

## Key Types

| Type                           | Description                                                     |
| ------------------------------ | --------------------------------------------------------------- |
| `K3PluginDescriptor`           | Root descriptor object exported by a plugin                     |
| `HOC<P>`                       | Higher-Order Component: `(Default: FC<P>) => FC<P>`             |
| `HOCWithDescription`           | HOC + admin description (used in layout/dialog slots)           |
| `CallbackWithDescription<T>`   | Logic callback + admin description                              |
| `VariableVisualisation`        | Descriptor for a custom input visualisation                     |
| `K3VariableComponentProps`     | Props injected into a custom variable renderer                  |
| `DynamicModel`                 | 3D model type definition for the viewer                         |
| `K3Configuration`              | A persisted configuration with code, price, and selection JSON  |
| `K3ConfigurationSavedEvent`    | Event payload dispatched on completed save                      |
| `K3BomEntry`                   | Single Bill-of-Materials entry                                  |
| `K3ConfigurationVariables`     | Full variables map keyed by variable key                        |
| `K3ConfigurationVariableEntry` | Single variable value (number, string, or simplified value)     |
| `K3SimplifiedValue`            | Resolved value option (id, key, label, value, thumbnail)        |
| `K3SetVariableResult`          | Result of a mutation — `status`, `conflict`, `changes`, `error` |
| `K3EngineStatus`               | Rule-engine outcome status of a mutation                        |
| `K3VariableChange`             | One variable that would change (`key`, `from`, `to`)            |
| `K3ConfigurationInstance`      | One component instance (`id`, `label`, `sort`, `variables`)     |
| `K3SelectionData`              | Type-specific selection data (`inputValue`, `inputText`, `url`) |
| `K3AppInfo`                    | App metadata (product, subscription, feature flags)             |
| `K3FullApp`                    | Full app snapshot passed to `preprocessFullApp`                 |
| `VariableType`                 | Const enum of all variable types                                |

---

## Learn More

- **K3 Konfigurator** – [k3-konfigurator.de](https://k3-konfigurator.de/)
- **Documentation** – [k3.objectcode.de/help](https://k3.objectcode.de/help/)
- **npm** – [npmjs.com/package/k3-plugin-api](https://www.npmjs.com/package/k3-plugin-api)

---

## License

MIT © [ObjectCode GmbH](https://k3-konfigurator.de/)
