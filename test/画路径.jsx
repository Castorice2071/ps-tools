function drawLine(doc, start, stop) {
    var startPoint = new PathPointInfo();
    startPoint.anchor = start;
    startPoint.leftDirection = start;
    startPoint.rightDirection = start;
    startPoint.kind = PointKind.CORNERPOINT;

    var stopPoint = new PathPointInfo();
    stopPoint.anchor = stop;
    stopPoint.leftDirection = stop;
    stopPoint.rightDirection = stop;
    stopPoint.kind = PointKind.CORNERPOINT;

    var spi = new SubPathInfo();
    spi.closed = false;
    spi.operation = ShapeOperation.SHAPEXOR;
    spi.entireSubPath = [startPoint, stopPoint];
    var path = doc.pathItems.add("Line", [spi]);
    path.strokePath(ToolType.PENCIL);
    path.remove();
}

// drawLine(app.activeDocument, [100, 100], [200, 200]);

function drawTriangle(doc, p1, p2, p3) {
    // 填充三角形
    try {
        doc.selection.deselect();
        doc.selection.select([p1, p2, p3]);
        // doc.selection.fill(app.foregroundColor);
        // doc.selection.deselect();
    } catch (e) {
        alert("填充三角形失败: " + e.message);
    }
}

drawTriangle(app.activeDocument, [100, 100], [106, 97], [106, 103]);
