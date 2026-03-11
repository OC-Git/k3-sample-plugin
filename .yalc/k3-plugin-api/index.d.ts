import type { BasicDynamicModelEditor } from "#/core/r3f/dynamicModels/models/components/BasicDynamicModelEditor";
import type { DynamicModel } from "#core/types/dynamicModel.interface";
export type K3API = {
    DynamicModelEditor: BasicDynamicModelEditor;
};
export declare let K3: K3API;
export declare function init(_ctx: K3API): void;
export interface K3Plugin {
    dynamicModels: DynamicModel[];
}
//# sourceMappingURL=index.d.ts.map