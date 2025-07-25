/**
 * 递归方式遍历文档中的所有图层
 */
(function () {
    function loopLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            $.writeln("doc.layers[" + i + "] " + layer.name + ". id: " + layer.id + ". itemIndex: " + layer.itemIndex);
            if (layer.typename == "LayerSet") {
                // 如果当前图层是图层组，就遍历它里头的图层
                loopLayers(layer.layers);
            }
        }
    }
    loopLayers(app.activeDocument.layers);
})();


app.activeDocument.layers