#target photoshop

if (app.documents.length > 0) {
    var doc = app.activeDocument;
    var newLayer = doc.layers.add();
    newLayer.name = "New Layer"; // 设置新图层的名称
    alert("新图层已添加：" + newLayer.name);
} else {
    alert("没有打开的文档！");
}