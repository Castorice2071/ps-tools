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

// var layer = app.activeDocument.activeLayer;

// $.writeln("当前图层名称: " + layer.name);
// $.writeln("当前图层类型: " + layer.kind);
// $.writeln("当前图层可见性: " + layer.visible);
// $.writeln(": " + layer.position);

// var newX = 100; // 新的 X 坐标
// var newY = 200; // 新的 Y 坐标
// // 修改 layer 的位置
// // layer.translate(newX - layer.bounds[0].value, newY - layer.bounds[1].value);

// // translateLayer(layer, newX, newY);

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

function main() {
    try {
        // 1. 获取所有选择的图层
        var items = getSelectedLayers();

        $.writeln("items: " + items[0].bounds);

        var l = items.length;
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

                var x = bnds[0] + (bnds[4] + gutter.x) * j; // 计算每个图层的 X 坐标
                var y = bnds[1] + (bnds[5] + gutter.y) * __rows; // 计算每个图层的 Y 坐标

                translateLayer(items[i], x, y); // 平移图层到新的位置
            }
        }

        function selectionBounds() {
            var bounds = "bounds";
            var arr = items;
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
        $.writeln("发生错误: " + error.message + " " + error.line);
    }
}

main();
