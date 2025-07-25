//@include "../src/common.jsx"

// $.writeln(app.version);

var docRef = app.activeDocument;
var activeLayer = docRef.activeLayer;

$.writeln("当前文档名称: " + docRef.name);
$.writeln("activeLayer: " + activeLayer.name);

// var layerRef = docRef.artLayers.getByName("矩形 1");
// $.writeln("当前图层名称: " + layerRef.name);
// $.writeln("当前图层bounds: " + layerRef.bounds);

function markSize() {
    try {
        var docRef = app.activeDocument;
        var activeLayer = docRef.activeLayer;

        var bounds = activeLayer.bounds;
        var x1 = bounds[0].value;
        var x2 = bounds[2].value - 1;
        var y1 = bounds[1].value;
        var y2 = bounds[3].value - 1;
        var width = x2 - x1;
        var height = y2 - y1;

        // 设置前景色为黑色
        app.foregroundColor = UTILS.createSolidColor(0, 0, 0);

        // 左边
        UTILS.drawLine([x1 - CFG.markSizeGap, y1], [x1 - CFG.markSizeGap, y2]);
    } catch (error) {
        alert("标注尺寸失败: " + error.line + " " + error.message);
    }
}

// markSize();

// 新建一个图层组
try {
    var newLayerSet = docRef.layerSets["新图层组"];
} catch (error) {
    var newLayerSet = docRef.layerSets.add();
    newLayerSet.name = "新图层组";
}

// 在新图层组中添加一个图层
var newLayer = newLayerSet.artLayers.add();
newLayer.name = "新图层";
newLayer.kind = LayerKind.NORMAL;
