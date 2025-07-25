/**
 * 遍历一级图层
 */
(function () {
    var layers = app.activeDocument.layers;
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        $.writeln("doc.layers[" + i + "] " + layer.name + ". id: " + layer.id + ". itemIndex: " + layer.itemIndex);
    }
})();
