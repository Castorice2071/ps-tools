//@include "./common.jsx"

var win = new Window("dialog", SCRIPT.name + " v" + SCRIPT.version, undefined, {
    closeButton: true,
});
win.alignChildren = ["fill", "fill"];

// 标注尺寸
// ==========
var PA = win.add("panel", undefined, "标注尺寸");
PA.BTN1 = PA.add("button", undefined, "确定");
PA.BTN1.onClick = function () {
    markSize();
    win.close();
};

win.show();

function markSize() {
    try {
        // 保存当前前景色
        var storeForegroundColor = app.foregroundColor;

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

        // 图层组
        try {
            var newLayerSet = docRef.layerSets[CFG.markSizeLayerSetName];
        } catch (error) {
            var newLayerSet = docRef.layerSets.add();
            newLayerSet.name = CFG.markSizeLayerSetName;
        }

        // 在图层组中添加一个图层
        var newLayer = newLayerSet.artLayers.add();

        // 左边
        UTILS.drawLine([x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth, y1], [x1 - CFG.markSizeGap, y1]);
        UTILS.drawLine([x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth, y2], [x1 - CFG.markSizeGap, y2]);
        UTILS.drawLine([x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2, y1], [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2, y2]);

        // 下边
        UTILS.drawLine([x1, y2 + CFG.markSizeGap], [x1, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth]);
        UTILS.drawLine([x2, y2 + CFG.markSizeGap], [x2, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth]);
        UTILS.drawLine([x1, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2], [x2, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2]);
    } catch (error) {
        $.writeln(error);
        $.writeln(error.line);
        alert("标注尺寸失败: " + error.message);
    }
}
