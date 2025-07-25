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
    textLayer.textItem.position = [x, y]

    // 将 layer 与 textLayer 编个组
    var group = doc.layerSets.add();
    textLayer.move(group, ElementPlacement.INSIDE);
    layer.move(group, ElementPlacement.INSIDE);
    return textLayer;
}

addTextLayer(app.activeDocument.activeLayer);
