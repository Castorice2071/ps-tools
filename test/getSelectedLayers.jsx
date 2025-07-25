/**
 * get selected layers in current document
 *
 * @returns Layers[]
 */
function getSelectedLayers() {
    var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
    var selectedLayersReference = new ActionReference();
    selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
    selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    var desc = app.executeActionGet(selectedLayersReference);
    var layers = [];
    if (desc.hasKey(targetLayersTypeId)) {
        // have selected layers
        var list = desc.getList(targetLayersTypeId);
        for (var i = 0; i < list.count; i++) {
            var ar = list.getReference(i);
            var layerId = ar.getIdentifier();
            layers.push(new Layer(layerId));
        }
    }
    // WIN CC2019的情况下，默认一个背景图层，会获取到ID是0
    if (layers.length === 1 && layers[0].id === 0) {
        layers = [];
        selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("LyrI"));
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(selectedLayersReference);
        var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
        layers.push(new Layer(id));
    }

    return layers;
}

var layers = getSelectedLayers();

for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    $.writeln("Selected Layer: " + layer.name + ", ID: " + layer.id);
}
