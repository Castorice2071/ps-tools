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

/**
 * 获取选中的图层组
 */
function getSelectedLayerSets() {
    var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
    var selectedLayersReference = new ActionReference();
    selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
    selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    var desc = app.executeActionGet(selectedLayersReference);
    var layerSets = [];
    if (desc.hasKey(targetLayersTypeId)) {
        var list = desc.getList(targetLayersTypeId);
        for (var i = 0; i < list.count; i++) {
            var ar = list.getReference(i);
            var layerId = ar.getIdentifier();
            var layer = getLayerById(layerId);
            if (layer && layer.typename === "LayerSet") {
                layerSets.push(layer);
            }
        }
    }
    if (layerSets.length === 1 && layerSets[0].id === 0) {
        layerSets = [];
        selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("LyrI"));
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(selectedLayersReference);
        var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
        var layer = getLayerById(id);
        if (layer && layer.typename === "LayerSet") {
            layerSets.push(layer);
        }
    }
    return layerSets;
}

/**
 * 平移图层到指定位置
 * @param {*} layer
 * @param {*} x
 * @param {*} y
 */
function translateLayer(layer, x, y) {
    // 获取图层的边界
    var bounds = layer.bounds;
    var x1 = bounds[0].value;
    var y1 = bounds[1].value;

    var deltaX = x - x1;
    var deltaY = y - y1;

    // 平移图层到新的位置
    layer.translate(deltaX, deltaY);
}

/**
 * 添加文本图层到指定图层上方
 */
function addTextLayer(layer) {
    var doc = app.activeDocument;
    // 创建一个ArtLayer对象
    var textLayer = doc.artLayers.add();
    // 设置图层类型为文本
    textLayer.kind = LayerKind.TEXT;
    // 设置文本内容
    var text = "#" + layer.name;
    textLayer.textItem.contents = text;
    // 设置字体和大小
    textLayer.textItem.size = 64;
    textLayer.textItem.font = "MicrosoftYaHeiUI-Bold";

    // 设置文字位置
    var x = layer.bounds[0] + (layer.bounds[2] - layer.bounds[0]) / 2;
    var y = layer.bounds[1] - 100; // 在图层上方100像素处
    textLayer.textItem.position = [x, y];

    // 将 layer 与 textLayer 编个组
    var group = doc.layerSets.add();
    textLayer.move(group, ElementPlacement.INSIDE);
    layer.move(group, ElementPlacement.INSIDE);

    return group;
}

function main() {
    try {
        // 1. 获取所有选择的图层
        var items = getSelectedLayers();

        if (items.length <= 0) return;

        var groups = [];

        // 2. 遍历每个图层，添加文本图层
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $.writeln("Processing Layer: " + item.name);
            $.writeln("Processing Layer: " + item.kind);
            if (item.kind === LayerKind.SMARTOBJECT) {
                groups.push(addTextLayer(item));
            }
        }

        var l = groups.length;
        var __rows = 0; // 当前行数
        var columns = 2; // 每行显示的图层数量
        var gutter = {
            x: 100, // 水平间距
            y: 100, // 垂直间距
        };
        var bnds = selectionBounds(); // 获取选区边界
        if (l > 1) {
            for (var i = (j = 0); i < l; i++, j++) {
                if (j === columns) {
                    __rows++;
                    j = 0;
                }

                var x = 0 + (bnds[4] + gutter.x) * j; // 计算每个图层的 X 坐标
                var y = 0 + (bnds[5] + gutter.y) * __rows; // 计算每个图层的 Y 坐标

                translateLayer(groups[i], x, y); // 平移图层到新的位置
            }
        }

        function selectionBounds() {
            var bounds = "bounds";
            var arr = groups;
            var x = [];
            var y = [];
            var w = [];
            var h = [];
            var size = [[], []];
            var i = arr.length;
            while (i--) {
                $.writeln("name: " + arr[i].name);
                x.push(arr[i].bounds[0].value);
                y.push(arr[i].bounds[1].value);
                w.push(arr[i].bounds[2].value);
                h.push(arr[i].bounds[3].value);
                size[0].push(arr[i].bounds[2].value - arr[i].bounds[0].value);
                size[1].push(arr[i].bounds[3].value - arr[i].bounds[1].value);
            }
            return [
                Math.min.apply(null, x),
                Math.max.apply(null, y),
                Math.max.apply(null, w),
                Math.min.apply(null, h),
                Math.max.apply(null, size[0]),
                Math.max.apply(null, size[1]),
            ];
        }
    } catch (error) {
        alert("Error: " + error.message + " at line " + error.line);
    }
}

main();

// var layerSets = getSelectedLayerSets();

// $.writeln("Selected Layer Sets Count: " + layerSets.length);

// for (var i = 0; i < layerSets.length; i++) {
//     var layerSet = layerSets[i];
//     $.writeln("Layer Set Name: " + layerSet.name);
//     $.writeln("Layer Set ID: " + layerSet.id);
//     $.writeln("Layer Set Bounds: " + layerSet.bounds);
// }

// addTextLayer(app.activeDocument.activeLayer);
