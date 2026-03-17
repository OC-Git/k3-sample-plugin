import type { K3PluginDescriptor } from "k3-plugin-api";
import { ColorChooser } from "./ColorChooser";
import { DemoHeaderBanner } from "./DemoHeaderBanner";
import { DemoSliderInput } from "./DemoSliderInput";
import { DemoStrikethroughPrice } from "./DemoStrikethroughPrice";
import { dynamicRing } from "./DynamicRing";
import { dynamicVariableRefDemo } from "./DynamicVariableRefDemo";
import { PriceDisplay } from "./PriceDisplay";

export default {
  id: "oc.sample-plugin",
  version: "1.0.0",

  ui: {
    layout: {
      // Adds a visible hotpink banner below the header
      header: (Wrapped) => (props) => (
        <>
          <Wrapped {...props} />
          <DemoHeaderBanner />
        </>
      ),
      // Adds a small attribution below the branding
      branding: (Wrapped) => (props) => (
        <>
          <Wrapped {...props} />
          <span style={{ fontSize: 10, color: "#888" }}>
            sample-plugin v1.0
          </span>
        </>
      ),
    },
    inputs: {
      // Register a custom slider as a selectable Darstellung for number variables
      number: [
        {
          key: "sample.slider",
          label: "Slider Demo",
          component: DemoSliderInput,
        },
      ],
      // Register a custom color picker as a selectable Darstellung for color variables
      color: [
        {
          key: "sample.colorChooser",
          label: "Farbwähler",
          component: ColorChooser,
        },
      ],
    },
    dialogs: {
      order: {
        // Wraps the price table with a strikethrough label
        priceTable: DemoStrikethroughPrice,
      },
    },
  },

  viewer: {
    models: [dynamicRing, dynamicVariableRefDemo],
    customLayoutComponents: { PriceDisplay },
  },

  logic: {
    pricing: {
      // Demo: add 19% tax
      onPriceCalculate: (price) => Math.round(price * 1.19 * 100) / 100,
    },
    config: {
      onUpdate: (config) => config,
    },
  },
} satisfies K3PluginDescriptor;
