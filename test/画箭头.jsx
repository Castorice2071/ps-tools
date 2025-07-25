//@target photoshop

try {
    var doc = app.activeDocument;

    var newColor = new SolidColor();
    newColor.rgb.red = 255;
    newColor.rgb.green = 0;
    newColor.rgb.blue = 0;

    app.foregroundColor = newColor;

    // 点1
    var p1 = new PathPointInfo();
    p1.anchor = [100, 100];
    p1.leftDirection = [100, 100];
    p1.rightDirection = [100, 100];
    p1.kind = PointKind.CORNERPOINT;

    // 点2
    var p2 = new PathPointInfo();
    p2.anchor = [106, 97];
    p2.leftDirection = [106, 97];
    p2.rightDirection = [106, 97];
    p2.kind = PointKind.CORNERPOINT;

    // 点3
    var p3 = new PathPointInfo();
    p3.anchor = [106, 103];
    p3.leftDirection = [106, 103];
    p3.rightDirection = [106, 103];
    p3.kind = PointKind.CORNERPOINT;

    // 填充三角形
    try {
        doc.selection.deselect();
        doc.selection.select([p1, p2, p3]);
        doc.selection.fill(app.foregroundColor);
        doc.selection.deselect();
    } catch (e) {
        alert("填充三角形失败: " + e.message);
    }
} catch (error) {
    alert("Error creating arrow path: " + error.message + "\nLine: " + error.line);
}
