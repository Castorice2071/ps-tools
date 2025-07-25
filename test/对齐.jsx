function main() {
    // var doc = app.activeDocument;
    // var layers = doc.layers;

    // var artLayers = doc.artLayers;
    // $.writeln("artLayers.length: " + artLayers.length);

    // $.writeln(doc.activeLayer);

    // // 获取画布的中心点
    // var canvasWidth = doc.width;
    // var canvasHeight = doc.height;
    // $.writeln("canvasWidth: " + canvasWidth);
    // $.writeln("canvasHeight: " + canvasHeight);

    // var centerX = canvasWidth / 2;
    // var centerY = canvasHeight / 2;

    // // 遍历所有图层并将其对齐到画布中心
    // for (var i = 0; i < layers.length; i++) {
    //     var layer = layers[i];
    //     var bounds = layer.bounds;
    //     var layerWidth = bounds[2] - bounds[0];
    //     var layerHeight = bounds[3] - bounds[1];

    //     // 计算图层的新位置
    //     var newX = centerX - layerWidth / 2;
    //     var newY = centerY - layerHeight / 2;

    //     // 移动图层
    //     layer.translate(newX - bounds[0], newY - bounds[1]);
    // }

    // alert("所有图层已对齐到画布中心！");
    function getSelectedLayers(doc) {
        var selectedLayers = [];
        var ref = new ActionReference();
        ref.putProperty(stringIDToTypeID("property"), stringIDToTypeID("targetLayers"));
        ref.putEnumerated(stringIDToTypeID("document"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
        try {
            var desc = executeActionGet(ref);
            if (desc.hasKey(stringIDToTypeID("targetLayers"))) {
                var layersList = desc.getList(stringIDToTypeID("targetLayers"));
                for (var i = 0; i < layersList.count; i++) {
                    var idx = layersList.getReference(i).getIndex();
                    selectedLayers.push(doc.layers[doc.layers.length - idx]);
                }
            }
        } catch (e) {
            // 只有一个图层被选中时
            selectedLayers.push(doc.activeLayer);
        }
        return selectedLayers;
    }

    // 用法
    var doc = app.activeDocument;
    var selected = getSelectedLayers(doc);
    for (var i = 0; i < selected.length; i++) {
        $.writeln(selected[i].name);
    }
}

main();
