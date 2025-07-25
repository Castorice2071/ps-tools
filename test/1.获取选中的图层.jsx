function getAllSelectedLayers() {
    var doc = app.activeDocument;
    var selectedLayers = [];

    // 递归检查图层及其子图层
    function checkLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            // 检查当前图层是否被选中
            if (layer.selected) {
                selectedLayers.push(layer);
            }

            // 如果是图层组，递归检查其子图层
            if (layer.typename === "LayerSet") {
                checkLayers(layer.layers);
            }
        }
    }

    // 从文档根图层开始检查
    checkLayers(doc.layers);
    return selectedLayers;
}

// var selectedLayers = getAllSelectedLayers()
// $.writeln("Selected Layers Count: " + selectedLayers.length);

// for (var i = 0; i < selectedLayers.length; i++) {
//     var layer = selectedLayers[i];
//     $.writeln("Selected Layer: " + layer.name + ", ID: " + layer.id);
// }

// var layer = getLayerById(7);
// if (layer) {
//     $.writeln("Found layer: " + layer.name);
// }

// $.writeln(app.activeDocument.activeLayers);
/**
 * 将 ActionDescriptor 转换为 JSON 格式
 * @param {ActionDescriptor} desc - 要转换的 ActionDescriptor
 * @returns JSON
 */
function ADToJson(desc) {
    var json = {};
    for (var i = 0; i < desc.count; i++) {
        var typeID = desc.getKey(i);
        var stringID = typeIDToStringID(typeID);
        var typeString = desc.getType(typeID).toString();

        // 根据类型获取值
        switch (typeString) {
            case "DescValueType.BOOLEANTYPE":
                json[stringID] = desc.getBoolean(typeID);
                break;
            case "DescValueType.DOUBLETYPE":
                json[stringID] = desc.getDouble(typeID);
                break;
            case "DescValueType.INTEGERTYPE":
                json[stringID] = desc.getInteger(typeID);
                break;
            case "DescValueType.STRINGTYPE":
                json[stringID] = desc.getString(typeID);
                break;
            case "DescValueType.OBJECTTYPE":
                var objectValue = desc.getObjectValue(typeID);
                json[stringID] = ADToJson(objectValue);
                break;
            case "DescValueType.CLASSTYPE":
            case "DescValueType.LISTTYPE":
            case "DescValueType.REFERENCETYPE":
                // 剩下这些留给你去补充完成
                break;
            default:
                break;
        }
    }
    return json;
}

/**
 * 根据图层Id获取图层
 */
function getLayerById(layerId) {
    var doc = app.activeDocument;

    function searchLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.id === layerId) {
                return layer;
            }
            if (layer.typename === "LayerSet") {
                var foundLayer = searchLayers(layer.layers);
                if (foundLayer) {
                    return foundLayer;
                }
            }
        }
        return null; // 如果没有找到，返回null
    }

    return searchLayers(doc.layers);
}

/**
 * 获取选中的图层
 */
function getSelectedLayers() {
    var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
    var selectedLayersReference = new ActionReference();
    selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
    selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    var desc = app.executeActionGet(selectedLayersReference);
    var layers = [];
    if (desc.hasKey(targetLayersTypeId)) {
        var list = desc.getList(targetLayersTypeId);
        for (var i = 0; i < list.count; i++) {
            var ar = list.getReference(i);
            var layerId = ar.getIdentifier();
            layers.push(getLayerById(layerId));
        }
    }
    if (layers.length === 1 && layers[0].id === 0) {
        layers = [];
        selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("LyrI"));
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(selectedLayersReference);
        var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
        layers.push(getLayerById(id));
    }
    return layers;
}

// 示例：输出所有选中图层名称
var selected = getSelectedLayers();
$.writeln("Selected Layers Count: " + selected.length);
for (var i = 0; i < selected.length; i++) {
    $.writeln(selected[i].name);
}
