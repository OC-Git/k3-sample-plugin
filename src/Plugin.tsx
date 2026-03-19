import type { K3PluginDescriptor, LocalizedString } from "k3-plugin-api";
import { VariableType } from "k3-plugin-api";
import { ColorChooser } from "./ColorChooser";
import { DemoSliderInput } from "./DemoSliderInput";
import { dynamicRing } from "./DynamicRing";
import { dynamicVariableRefDemo } from "./DynamicVariableRefDemo";
import { dynamicLegacyModel } from "./DynamicLegacyModel";
import { PriceDisplay } from "./PriceDisplay";
import { createSlotHOC } from "./DemoHoc";
import { createGenericInput } from "./DemoGenericInput";

export default {
  id: "oc.sample-plugin",
  version: "1.0.0",

  // ── UI & Layout ──────────────────────────────────────────────────────────

  ui: {
    layout: {
      root: {
        hoc: createSlotHOC("root"),
        description: `<p><strong>Root-Komponente</strong></p><p>Überschreibt die oberste Wrapper-Komponente der gesamten Applikation. Dieser Slot umhüllt <em>alles</em> — Header, Sidebar, Content und Footer. Änderungen hier wirken sich auf das gesamte Layout aus. Geeignet für globale Theme-Provider, Fehler-Boundaries oder App-weite Kontexte, die nicht in den Standard-Redux-Store passen.</p>`,
      },
      header: {
        hoc: createSlotHOC("header"),
        description: {
          de: "Überschreibt die Kopfzeile.",
          en: "Overrides the header bar.",
        } as LocalizedString,
      },
      sidebar: {
        hoc: createSlotHOC("sidebar"),
        description: "Überschreibt die Seitennavigation.",
      },
      sidebarHeader: {
        hoc: createSlotHOC("sidebarHeader"),
        description: "Überschreibt den Kopfbereich der Seitenleiste.",
      },
      sidebarFooter: {
        hoc: createSlotHOC("sidebarFooter"),
        description: "Überschreibt den Fußbereich der Seitenleiste.",
      },
      footer: {
        hoc: createSlotHOC("footer"),
        description: "Überschreibt die Fußzeile.",
      },
      contentView: {
        hoc: createSlotHOC("contentView"),
        description: "Überschreibt den Hauptinhaltsbereich.",
      },
      gallery: {
        hoc: createSlotHOC("gallery"),
        description: "Überschreibt die Galerieansicht.",
      },
      branding: {
        hoc: createSlotHOC("branding"),
        description: "Überschreibt die Branding-Komponente.",
      },
      logo: {
        hoc: createSlotHOC("logo"),
        description:
          "Überschreibt das Logo. Das Sample-Plugin fügt rechts neben dem Logo ein Demo-Badge ein.",
      },
      navigationButtons: {
        hoc: createSlotHOC("navigationButtons"),
        description: "Überschreibt die Navigationsschaltflächen.",
      },
      exitButtons: {
        hoc: createSlotHOC("exitButtons"),
        description: "Überschreibt die Beenden-Schaltflächen.",
      },
      sceneButtons: {
        hoc: createSlotHOC("sceneButtons"),
        description: "Überschreibt die Szenen-Schaltflächen.",
      },
      price: {
        hoc: createSlotHOC("price"),
        description:
          "Überschreibt die Preisanzeige. Dieses Plugin zeigt den Preis im eigenen Format.",
      },
      labelActionDisplay: {
        hoc: createSlotHOC("labelActionDisplay"),
        description: "Überschreibt die Label-Aktionsanzeige.",
      },
      mobileLabelActionDisplay: {
        hoc: createSlotHOC("mobileLabelActionDisplay"),
        description: "Überschreibt die mobile Label-Aktionsanzeige.",
      },
      invalidRuleModal: {
        hoc: createSlotHOC("invalidRuleModal"),
        description: "Überschreibt das Modal für ungültige Regeln.",
      },
      mountedWhenLoaded: {
        hoc: createSlotHOC("mountedWhenLoaded"),
        description: "Wird nach dem vollständigen Laden eingehängt.",
      },
      configurator: {
        hoc: createSlotHOC("configurator"),
        description: "Überschreibt die Konfigurator-Hauptkomponente.",
      },
      groupLabel: {
        hoc: createSlotHOC("groupLabel"),
        description: "Überschreibt die Gruppenbezeichnung in der Seitenleiste.",
      },
      groupPanel: {
        hoc: createSlotHOC("groupPanel"),
        description: "Überschreibt das Gruppenfeld in der Seitenleiste.",
      },
      additionalGroups: {
        hoc: createSlotHOC("additionalGroups"),
        description: "Ermöglicht das Hinzufügen zusätzlicher Gruppen.",
      },
      additionalVars: {
        hoc: createSlotHOC("additionalVars"),
        description: "Ermöglicht das Hinzufügen zusätzlicher Variablen.",
      },
      variableLabel: {
        hoc: createSlotHOC("variableLabel"),
        description: `<p><strong>Variablenbezeichnung</strong></p><p>Überschreibt die Bezeichnungskomponente neben jeder Variablen-Eingabe in der Seitenleiste. Typische Anwendungsfälle:</p><ul><li>Eigene Tooltip-Icons neben dem Label platzieren</li><li>Pflichtfeld-Markierungen (*) dynamisch einblenden</li><li>Barrierefreiheits-Ergänzungen (aria-describedby auf den Eingabekontext)</li><li>Mehrsprachige Labels aus eigener Übersetzungsquelle laden</li></ul>`,
      },
    },

    inputs: {
      list: [
        {
          key: "sample.list",
          label: "List Demo",
          description: `<p><strong>Benutzerdefinierte Listenansicht</strong></p><p>Ersetzt die Standard-Radiobutton-Liste durch eine vollständig angepasste Darstellung. Der Slot erhält alle Werte der Variable als <code>values[]</code> und kann die Auswahl über <code>onChange(valueId)</code> committen.</p><p>Mögliche Einsatzszenarien: Bild-Kacheln, horizontale Chip-Leiste, Karten-Layout mit Vorschau, oder eine suchbare Dropdown-Liste für sehr viele Optionen.</p>`,
          component: createGenericInput(VariableType.List),
        },
      ],
      color: [
        {
          key: "sample.colorChooser",
          label: "Farbwähler",
          description: {
            de: "Erweiterter Farbwähler mit HEX-Eingabe.",
            en: "Enhanced color picker with HEX input.",
          } as LocalizedString,
          component: ColorChooser,
        },
      ],
      number: [
        {
          key: "sample.slider",
          label: "Slider Demo",
          description: "Numerische Variablen als Schieberegler darstellen.",
          component: DemoSliderInput,
        },
      ],
      text: [
        {
          key: "sample.text",
          label: "Text Demo",
          description: "Benutzerdefinierte Textdarstellung.",
          component: createGenericInput(VariableType.Text),
        },
      ],
      boolean: [
        {
          key: "sample.boolean",
          label: "Boolean Demo",
          description: "Benutzerdefinierte Umschalter-Darstellung.",
          component: createGenericInput(VariableType.Boolean),
        },
      ],
      image: [
        {
          key: "sample.image",
          label: "Image Demo",
          description: "Benutzerdefinierte Bildauswahl.",
          component: createGenericInput(VariableType.Image),
        },
      ],
      upload: [
        {
          key: "sample.upload",
          label: "Upload Demo",
          description: "Benutzerdefiniertes Upload-Steuerelement.",
          component: createGenericInput(VariableType.Upload),
        },
      ],
      components: [
        {
          key: "sample.components",
          label: "Components Demo",
          description: "Benutzerdefinierte Komponentenauswahl.",
          component: createGenericInput(VariableType.Components),
        },
      ],
      information: [
        {
          key: "sample.information",
          label: "Information Demo",
          description: "Benutzerdefinierte Informationsanzeige.",
          component: createGenericInput(VariableType.Information),
        },
      ],
    },

    dialogs: {
      order: {
        root: {
          hoc: createSlotHOC("orderRoot"),
          description: "Überschreibt das Bestell-Dialog-Root.",
        },
        headline: {
          hoc: createSlotHOC("orderHeadline"),
          description: "Überschreibt die Überschrift des Bestelldialogs.",
        },
        contactFields: {
          hoc: createSlotHOC("orderContactFields"),
          description: "Überschreibt die Kontaktfelder im Bestelldialog.",
        },
        priceTable: {
          hoc: createSlotHOC("orderPriceTable"),
          description: "Überschreibt die Preistabelle im Bestelldialog.",
        },
        priceTableSelectionList: {
          hoc: createSlotHOC("orderPriceTableSelectionList"),
          description: "Überschreibt die Auswahlliste in der Preistabelle.",
        },
        priceTableArticleList: {
          hoc: createSlotHOC("orderPriceTableArticleList"),
          description: "Überschreibt die Artikelliste in der Preistabelle.",
        },
        priceTableTotal: {
          hoc: createSlotHOC("orderPriceTableTotal"),
          description: "Überschreibt die Gesamtanzeige in der Preistabelle.",
        },
        confirmationSuccess: {
          hoc: createSlotHOC("orderConfirmationSuccess"),
          description:
            "Überschreibt die Erfolgsbestätigung nach der Bestellung.",
        },
        confirmationError: {
          hoc: createSlotHOC("orderConfirmationError"),
          description:
            "Überschreibt die Fehleranzeige nach einer fehlgeschlagenen Bestellung.",
        },
      },
      warnings: {
        invalidSelection: {
          hoc: createSlotHOC("warningInvalidSelection"),
          description: "Überschreibt die Warnung bei ungültiger Auswahl.",
        },
        invalidSelectionIcon: {
          hoc: createSlotHOC("warningInvalidSelectionIcon"),
          description: "Überschreibt das Icon für ungültige Auswahl.",
        },
        invalidSelectionTooltip: {
          hoc: createSlotHOC("warningInvalidSelectionTooltip"),
          description: "Überschreibt den Tooltip bei ungültiger Auswahl.",
        },
        numberWarningTooltip: {
          hoc: createSlotHOC("warningNumberWarningTooltip"),
          description: "Überschreibt den Tooltip bei ungültigem Zahlenwert.",
        },
      },
    },
  },

  // ── Viewer & 3D ──────────────────────────────────────────────────────────

  viewer: {
    canvas: {
      hoc: createSlotHOC("canvas"),
      description: "Überschreibt den 3D-Canvas-Bereich.",
    },
    sceneComponents: {
      demoScene: {
        hoc: createSlotHOC("demoScene"),
        description: "Fügt eine Demo-Szenenkomponente hinzu.",
      },
    },
    customLayoutComponents: {
      // One can add it to the scene via <CustomLayoutComponent name="PriceDisplay2" price="2"/>.
      PriceDisplay2: {
        component: PriceDisplay,
        label: "Price Display 2",
        description:
          "Registriert eine benutzerdefinierte Preisanzeige-Komponente, die über den Layout-Slot <CustomLayoutComponent name=\"PriceDisplay2\" price=\"2\"/> in der Szene platziert werden kann.",
      },
    },
    models: [dynamicRing, dynamicVariableRefDemo],
    labels: {
      display: {
        hoc: createSlotHOC("labelsDisplay"),
        description: "Überschreibt die Desktop-Label-Anzeige im 3D-Viewer.",
      },
      mobile: {
        hoc: createSlotHOC("labelsMobile"),
        description: "Überschreibt die mobile Label-Anzeige im 3D-Viewer.",
      },
    },
  },

  // ── Logic & Events ───────────────────────────────────────────────────────

  logic: {
    config: {
      onUpdate: {
        fn: (config) => {
          console.log("[plugin] onUpdate", config);
          return config;
        },
        description:
          "Wird bei jeder Konfigurationsänderung aufgerufen. Ermöglicht das Transformieren der Konfiguration.",
      },
      onSave: {
        fn: (config) => {
          console.log("[plugin] onSave", config);
          return config;
        },
        description:
          "Wird beim Speichern aufgerufen. Kann die Konfiguration vor dem Speichern modifizieren.",
      },
      onSaveFiles: {
        fn: (files) => {
          console.log("[plugin] onSaveFiles", files);
          return files;
        },
        description: "Ermöglicht das Anpassen der zu speichernden Dateien.",
      },
      onSaveEvent: {
        fn: (payload) => {
          console.log("[plugin] onSaveEvent", payload);
          return payload;
        },
        description:
          "Wird mit dem vollständigen Speicher-Event-Payload aufgerufen.",
      },
    },
    camera: {
      onSetScreenshotCameras: {
        fn: (cameras) => {
          console.log("[plugin] onSetScreenshotCameras", cameras);
          return cameras;
        },
        description: "Ermöglicht das Anpassen der Screenshot-Kameras.",
      },
      onSetCameraList: {
        fn: (cameras) => {
          console.log("[plugin] onSetCameraList", cameras);
          return cameras;
        },
        description: "Ermöglicht das Anpassen der Kameraliste.",
      },
      getScreenshotDimensions: {
        fn: (dim) => {
          console.log("[plugin] getScreenshotDimensions", dim);
          return dim;
        },
        description: "Ermöglicht das Anpassen der Screenshot-Abmessungen.",
      },
    },
    core: {
      preprocessFullApp: {
        fn: (app) => {
          console.log("[plugin] preprocessFullApp", app);
          return app;
        },
        description:
          "Ermöglicht das Vorverarbeiten der vollständigen App-Daten vor dem Laden.",
      },
      onOpenPdf: {
        fn: (result) => {
          console.log("[plugin] onOpenPdf", result);
        },
        description: "Wird aufgerufen wenn ein PDF geöffnet wird.",
      },
      onExportAR: {
        fn: async (ctx) => {
          console.log("[plugin] onExportAR", ctx);
          return new Blob();
        },
        description: "Ermöglicht einen benutzerdefinierten AR-Export.",
      },
    },
  },

  // ── Legacy (shim tests) ──────────────────────────────────────────────────

  /** @deprecated mapped to viewer.models internally */
  dynamicModels: [dynamicLegacyModel],
} satisfies K3PluginDescriptor;
