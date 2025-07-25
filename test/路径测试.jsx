// 绘制三角形的 Photoshop 脚本
// 保存为 .jsx 文件并在 Photoshop 中执行

// 设置三角形参数
var centerX = 400; // 画布中心 X 坐标
var centerY = 300; // 画布中心 Y 坐标
var radius = 200; // 三角形外接圆半径
var fillColor = [255, 0, 0]; // RGB 红色填充

// 计算三角形三个顶点的坐标 (等边三角形)
var angle1 = -Math.PI / 2; // 顶部顶点 (90°)
var angle2 = -Math.PI / 2 + (Math.PI * 2) / 3; // 右下顶点 (210°)
var angle3 = -Math.PI / 2 + (Math.PI * 4) / 3; // 左下顶点 (330°)

var point1 = [centerX + radius * Math.cos(angle1), centerY + radius * Math.sin(angle1)];
var point2 = [centerX + radius * Math.cos(angle2), centerY + radius * Math.sin(angle2)];
var point3 = [centerX + radius * Math.cos(angle3), centerY + radius * Math.sin(angle3)];

// 创建新文档 (如果需要在现有文档绘制，请删除这部分)
var doc = app.documents.add(800, 600, 72, "Triangle Canvas");

// 创建路径
var trianglePath = {};
trianglePath.subPathInfo = new SubPathInfo();
trianglePath.subPathInfo.operation = ShapeOperation.SHAPEXOR;
trianglePath.subPathInfo.closed = true;
trianglePath.subPathInfo.entireSubPath = [
    new PathPointInfo({
        kind: PointKind.CORNERPOINT,
        anchor: point1,
        leftDirection: point1,
        rightDirection: point1,
    }),
    new PathPointInfo({
        kind: PointKind.CORNERPOINT,
        anchor: point2,
        leftDirection: point2,
        rightDirection: point2,
    }),
    new PathPointInfo({
        kind: PointKind.CORNERPOINT,
        anchor: point3,
        leftDirection: point3,
        rightDirection: point3,
    }),
];

// 创建形状图层
doc.pathItems.add("Triangle", [trianglePath.subPathInfo]);
doc.activePath.makeSelection(0, 1, SelectionType.REPLACE);

// 填充颜色
var fillColor = new SolidColor();
fillColor.rgb.red = fillColor[0];
fillColor.rgb.green = fillColor[1];
fillColor.rgb.blue = fillColor[2];

app.foregroundColor = fillColor;
doc.selection.fill(app.foregroundColor, ColorBlendMode.NORMAL, 100, false);
doc.selection.deselect();
