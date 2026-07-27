# K3 sample-plugin

## Installation

```sh
pnpm i
pnpm run build --watch &
pnpm run serve &
pnpm run deploy
```

## Development

Look at `src/Plugin.tsx`.

## Testing against an unreleased k3-plugin-api

`k3-plugin-api` is a published package, so to try changes that are not on npm yet,
link the local checkout with [yalc](https://github.com/wclr/yalc):

```sh
# in the k3-plugin-api checkout — builds dist/ and puts it in the yalc store
npx yalc publish

# here — rewrites the dep to file:.yalc/k3-plugin-api
npx yalc add k3-plugin-api
pnpm run build

# after each further k3-plugin-api change — publish, then re-add per consumer.
# Avoid `yalc push`: it walks yalc's GLOBAL installation registry and will also
# touch unrelated checkouts of this repo on your machine.
cd ../k3-plugin-api && npx yalc publish
cd -                && npx yalc add k3-plugin-api

# when done
npx yalc remove k3-plugin-api && pnpm i
```

The host (Konfigurator3) consumes `k3-plugin-api` from npm too, so it needs the
same link for the *runtime* side of any new hook to exist:

```sh
cd ../Konfigurator3 && npx yalc add k3-plugin-api
```

## The engraving-view example

`EngravingViewButton` + `orbitLimits` demonstrate the camera and scene-component
extension points together:

| File                      | Shows                                                                       |
| ------------------------- | --------------------------------------------------------------------------- |
| `EngravingViewButton.tsx` | `useSetCameraPosition()` looks square into the ring                         |
| `orbitLimits.tsx`         | `viewer.sceneComponents.OrbitControls` clamps rotation while that is active |
| `engravingView.ts`        | Sharing plugin state across the R3F canvas boundary                         |
| `InstanceInspector.tsx`   | `useOpenInstance()` — live readout, checked against the real instance list  |
| `layoutExtensions.tsx`    | Giving both a home with no layout editing                                   |

**Where the toggle appears:** in the scene-button group, next to fullscreen / AR.
No admin configuration needed — it is wired through `ui.layout.sceneButtons`, a
slot every stock layout contains.

### Verifying `useOpenInstance()`

The inspector sits in the sidebar footer, right where instance navigation happens.
It prints the live `id`, `isRoot`, `variableId` and `hierarchyLevel`, then lists the
instances of the first component variable it finds and marks one **„← offen“**.

That marker is the real check: it is the instance whose
`K3ConfigurationInstance.id` equals `openInstance.id`. Click into a component
instance and back out again — if the highlight follows you and `isRoot` flips, the
hook is resolving genuine instance ids rather than a stale or default value.

If the app has no component variable at all, `isRoot` stays `true` and the inspector
says so, instead of just looking broken.

Finding that variable by shape is a demo convenience with a known limitation, so it
carries a self-check:

```sh
npm run check
```

A real plugin knows its own variable key and should skip the guessing entirely —
`useConfigurationInstances("meineKomponente")`.

The registration kinds behave very differently, which is worth knowing:

| Registered as                   | How it activates                                              |
| ------------------------------- | ------------------------------------------------------------- |
| `viewer.sceneComponents`        | **Automatic** — wraps the scene component wherever it is used |
| `ui.layout.*` HOC               | **Automatic** — wraps that layout slot                        |
| `viewer.customLayoutComponents` | **Manual** — you must place it in the app's custom layout XML |
| `viewer.models`                 | **Manual** — pick the model in a rule's model action          |

A `customLayoutComponents` entry renders nothing until the layout references it by
name, and an unknown tag in the layout XML silently renders as an empty element
rather than erroring:

```xml
<CustomLayoutComponent name="PriceDisplay" />
```

Four things in there are easy to get wrong:

**Runtime hooks need `k3-plugin-api` declared as an MF shared singleton.** See
`vite.config.ts`. The hooks read module-level state that the host fills in via
`init()`; a plugin that bundles its own copy gets an uninitialised module and
throws `k3-plugin-api not initialized`. Type-only imports are erased at build time
and never hit this, which is why this plugin worked without the entry until now.

**React context does not cross into the 3D scene.** R3F's `<Canvas>` mounts its own
reconciler, so a layout component and a scene component are in different React
roots. `engravingView.ts` shares state through `useSyncExternalStore` instead —
React is already a shared singleton, so this costs no extra dependency.

**Spread `props` first in a scene-component HOC.** Everything the customer set on
that component in the scene editor arrives as `props`; override only what the
plugin controls, or you silently discard their scene configuration.

**Never stop passing a prop you conditionally control — pass its default instead.**
R3F resets a prop that vanishes between renders, but for a Three.js object whose
constructor takes arguments (`new OrbitControls(camera, domElement)`) it has no
prototype default to read and falls back to `0`. Dropping `minAzimuthAngle` /
`maxAzimuthAngle` therefore clamps azimuth to `[0, 0]` and freezes left/right
rotation instead of restoring it. See `unrestrictedLimits` in `orbitLimits.tsx`.

Static orbit limits need no plugin at all — set `minAzimuthAngle` /
`maxAzimuthAngle` directly on the OrbitControls entry in the scene JSON. Use the
HOC only when the limits must react to the configuration.
