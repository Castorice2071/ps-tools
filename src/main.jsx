var SCRIPT = {
    name: "图稿设计工具箱-PS",
    version: "0.0.1",
};

var win = new Window("dialog", SCRIPT.name + " v" + SCRIPT.version, undefined, {
    closeButton: true,
});
win.alignChildren = "fill";

// =======================================================
// 标注尺寸
var PA = win.add("panel", undefined, "标注尺寸");
var BTN1 = PA.add("button", undefined, "确定");
BTN1.onClick = function () {
    markSize();
    win.close();
};

// =======================================================
// 编组排列
var PB = win.add("panel", undefined, "编组排列");
PB.alignChildren = "fill";

PB.groupColumns = PB.add("group");
PB.groupColumns.orientation = "row";
PB.groupColumns.add("statictext", undefined, "列数");
PB.valueColumns = PB.groupColumns.add("edittext", undefined, "3");
PB.valueColumns.preferredSize = [50, -1];

PB.groupGutterX = PB.add("group");
PB.groupGutterX.orientation = "row";
PB.groupGutterX.add("statictext", undefined, "水平间距");
PB.valueGutterX = PB.groupGutterX.add("edittext", undefined, "100");
PB.valueGutterX.preferredSize = [50, -1];

PB.groupGutterY = PB.add("group");
PB.groupGutterY.orientation = "row";
PB.groupGutterY.add("statictext", undefined, "垂直间距");
PB.valueGutterY = PB.groupGutterY.add("edittext", undefined, "100");
PB.valueGutterY.preferredSize = [50, -1];

PB.groupButtons = PB.add("group");
PB.groupButtons.orientation = "row";
PB.BTN1 = PB.groupButtons.add("button", undefined, "确定");

// =======================================================
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
        UTILS.drawArrow(
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2, y1],
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2 - CFG.markSizeArrowSize / 2, y1 + CFG.markSizeArrowSize],
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2 + CFG.markSizeArrowSize / 2, y1 + CFG.markSizeArrowSize]
        );
        UTILS.drawArrow(
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2, y2],
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2 - CFG.markSizeArrowSize / 2, y2 - CFG.markSizeArrowSize],
            [x1 - CFG.markSizeGap - CFG.markSizeShortLineWidth / 2 + CFG.markSizeArrowSize / 2, y2 - CFG.markSizeArrowSize]
        );

        // 下边
        UTILS.drawLine([x1, y2 + CFG.markSizeGap], [x1, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth]);
        UTILS.drawLine([x2, y2 + CFG.markSizeGap], [x2, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth]);
        UTILS.drawLine([x1, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2], [x2, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2]);
        UTILS.drawArrow(
            [x1, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2],
            [x1 + CFG.markSizeArrowSize, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2 - CFG.markSizeArrowSize / 2],
            [x1 + CFG.markSizeArrowSize, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2 + CFG.markSizeArrowSize / 2]
        );
        UTILS.drawArrow(
            [x2, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2],
            [x2 - CFG.markSizeArrowSize, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2 - CFG.markSizeArrowSize / 2],
            [x2 - CFG.markSizeArrowSize, y2 + CFG.markSizeGap + CFG.markSizeShortLineWidth / 2 + CFG.markSizeArrowSize / 2]
        );
    } catch (error) {
        $.writeln(error);
        $.writeln(error.line);
        alert("标注尺寸失败: " + error.message);
    }
}
