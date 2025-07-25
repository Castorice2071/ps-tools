var ref1 = new ActionReference();
    // 它的含义是 layer -> ordinal -> target，也就是当前选中的图层
    ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var layerDescriptor = executeActionGet(ref1);
var value = layerDescriptor.getString(stringIDToTypeID("name"));
$.writeln(value);


// =======================================================
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
desc1.putReference( charIDToTypeID( "null" ), ref1 );
var desc2 = new ActionDescriptor();
desc2.putString( charIDToTypeID( "Nm  " ), """abc""" );
desc1.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Lyr " ), desc2 );
executeAction( charIDToTypeID( "setd" ), desc1, DialogModes.NO );