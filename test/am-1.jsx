// =======================================================
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
    ref1.putName(charIDToTypeID("Lyr "), "1");
desc1.putReference(charIDToTypeID("null"), ref1);
desc1.putBoolean(charIDToTypeID("MkVs"), false);
var list1 = new ActionList();
    list1.putInteger(4);
desc1.putList(charIDToTypeID("LyrI"), list1);
executeAction(charIDToTypeID("slct"), desc1, DialogModes.NO);