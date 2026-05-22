# k3-plugin-api

> Official TypeScript types for the plugin API for the [K3 product configurator](https://k3-konfigurator.de/).

[![npm version](https://img.shields.io/npm/v/k3-plugin-api)](https://www.npmjs.com/package/k3-plugin-api)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

---

## What is K3?

[K3](https://k3-konfigurator.de/) is a professional product configurator platform by **ObjectCode GmbH**. It lets companies sell complex, customizable products online — with live price calculation, 3D visualization, AR, and integrations into Shopify, Shopware 6, WooCommerce, and many more shop systems.

## What is this package?

`k3-plugin-api` contains the **TypeScript types** required to build K3 plugins — packages that extend the K3 configurator runtime with custom UI components, 3D models, pricing logic, and lifecycle hooks. The package ships zero runtime code; every export is a type, interface, or const enum.

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
      header: (Default) => (props) => <MyCustomHeader fallback={Default} {...props} />,
    },
  },

  logic: {
    config: {
      // attach a custom order code to the configuration before it is persisted
      onSave: (config) => ({ ...config, code: `TEST-${config.code}` }),
    },
  },
};

export default plugin;
```

---

## Extension Points

K3 plugins can extend three layers of the configurator.

### Runtime Hooks

Plugins can access K3 configurator state at runtime using React hooks. These hooks are automatically injected when the plugin is loaded.

```ts
import { useSettings, useBOM, usePrice } from "k3-plugin-api";

const MyComponent = () => {
  // Access plugin-specific settings
  const settings = useSettings("acme.my-plugin");
  
  // Access current Bill-of-Materials
  const bom = useBOM();
  
  // Access current total price
  const price = usePrice();
  
  return (
    <div>
      <p>API Key: {settings.apiKey}</p>
      <p>Total items: {bom.length}</p>
      <p>Price: €{price}</p>
    </div>
  );
};
```

Available hooks:
- `useSettings(pluginId: string)` — Access settings for a specific plugin
- `useBOM()` — Get current Bill-of-Materials entries
- `usePrice()` — Get current total price (MOV-adjusted or overall)

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

| Property                 | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `viewer.canvas`          | Wrap the Three.js canvas element                                 |
| `viewer.sceneComponents` | Add or replace named React components injected into the 3D scene |
| `viewer.models`          | Register dynamic 3D model types (`DynamicModel`)                 |
| `viewer.labels`          | Override the label overlay components (desktop and mobile)       |

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

## Key Types

| Type                        | Description                                                     |
| --------------------------- | --------------------------------------------------------------- |
| `K3PluginDescriptor`        | Root descriptor object exported by a plugin                     |
| `K3Hooks`                   | Runtime hooks interface (useSettings, useBOM, usePrice)         |
| `HOC<P>`                    | Higher-Order Component: `(Default: FC<P>) => FC<P>`             |
| `VariableVisualisation`     | Descriptor for a custom input visualisation                     |
| `K3VariableComponentProps`  | Props injected into a custom variable renderer                  |
| `DynamicModel`              | 3D model type definition for the viewer                         |
| `K3Configuration`           | A persisted configuration with code, price, and selection JSON  |
| `K3ConfigurationSavedEvent` | Event payload dispatched on completed save                      |
| `K3BomEntry`                | Single Bill-of-Materials entry                                  |
| `VariableType`              | Const enum of all variable types                                |

---

## Learn More

- **K3 Konfigurator** – [k3-konfigurator.de](https://k3-konfigurator.de/)
- **Documentation** – [k3.objectcode.de/help](https://k3.objectcode.de/help/)
- **npm** – [npmjs.com/package/k3-plugin-api](https://www.npmjs.com/package/k3-plugin-api)

---

## License

MIT © [ObjectCode GmbH](https://k3-konfigurator.de/)
