declare function stringIDToTypeID(s: string): number;
declare function charIDToTypeID(s: string): number;
declare function executeActionGet(ref: ActionReference): ActionDescriptor;
declare function executeAction(id: number, desc: ActionDescriptor, dialogMode: DialogModes): ActionDescriptor;