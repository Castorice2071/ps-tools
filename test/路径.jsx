function DrawPolygon() {
    //PS是状态机，基于当前选中的状态进行操作
    var doc = app.activeDocument;

    //获取参数的数量，使用js可变参数
    //因为多边形参数不确定，例如三角形，三个顶点，n边形，n个顶点
    var y = arguments.length;
    var i = 0;

    var lineArray = [];
    for (i = 0; i < y; i++) {
        //创建一个PathPointInfo对象
        //里面包含绘制点的相关信息

        lineArray[i] = new PathPointInfo();

        //多边形是凸包，没有任何曲线段表示，因此每个点都是CORNERPOINT类型
        //如果是曲线的话，那么每个点的类似是SMOOTHPOINT

        lineArray[i].kind = PointKind.CORNERPOINT;

        //要绘制的点的坐标，来源于参数，类型为[x,y];
        //对于非曲线来说，leftDirection = rightDirection=anchor
        lineArray[i].anchor = arguments[i];
        lineArray[i].leftDirection = lineArray[i].anchor;
        lineArray[i].rightDirection = lineArray[i].anchor;
    }

    //到此处，所有的绘制点的信息都保存在lineArray数组中

    //创建一个SubPathInfo对象
    var lineSubPathArray = new SubPathInfo();

    //SubPathiInfo.entireSubPath指向了要绘制的顶点数据数组
    lineSubPathArray.entireSubPath = lineArray;

    //设置SubPathiInfo.closed为true,这样在strokePath时候，会自动封闭整个路径
    //否则如果为false的话，那么会缺少最后一条线段，导致路径非封闭状态。
    lineSubPathArray.closed = true;

    //设置ShapeOperation为Add模式，叠加模式，前景层直接覆盖到背景层上
    //还有其他也写操作，可以理解为布尔操作，例如前景和背景取并集，交集，差集等
    lineSubPathArray.operation = ShapeOperation.SHAPEADD;

    //创建一个PathItem对象，使用的是doc.pathItems.add方法
    //注意，我们会发现是doc而不像TextItem是属于层对象的。
    var myPathItem = doc.pathItems.add("myPath", [lineSubPathArray]);

    //调用PathItem的描边函数
    //矢量图形绘制可以分为边的绘制以及封闭形体的填充两种操作
    //strokePath用来进行边的绘制
    //fillPath则用来进行填充内容
    myPathItem.strokePath(ToolType.PENCIL);

    //绘制好后，将PathItem去除掉，由于已经描边渲染了，所有所有效果都输出到
    //像素缓冲区了，因此不需要该PathItem了
    //如果你需要后续进行顶点级别的操作的话，那你也可以保留着，不要remove掉
    myPathItem.remove();
}

//从两个点生成4个绘制点，绘制Rect
function DrawRect(left, top, right, bottom) {
    DrawPolygon([left, top], [right, top], [right, bottom], [left, bottom]);
}

//由于strokePath时使用的颜色是基于当前的前景色的
//注意，如果是填充封闭路径fillPath的话，则使用指定颜色作为参数，但是描边是基于前
//景色的操作
//为了防止干扰，因此先记录下当前的前景色
var saveColor = app.foregroundColor;

//生成一个红色的SolidColor对象
var newColor = new SolidColor();
newColor.rgb.red = 255;
newColor.rgb.green = 0;
newColor.rgb.blue = 0;

//设置前景色为红色，并绘制三角形
app.foregroundColor = newColor;
DrawPolygon([250, 10], [350, 10], [250, 100]);

//修改颜色为绿色
newColor.rgb.red = 0;
newColor.rgb.green = 255; 
newColor.rgb.blue = 0;
 
//设置前景色为绿色，并绘制四边形
app.foregroundColor = newColor;
DrawRect(10, 100, 100, 200);

//修改颜色为蓝色，绘制8角形
newColor.rgb.red = 0;
newColor.rgb.green = 0;
newColor.rgb.blue = 255;
app.foregroundColor = newColor;
DrawPolygon(
    [36.9999885559082, 13.9999985694885],
    [165.99999666214, 13.9999985694885],
    [185.999989509583, 33.9999973773956],
    [185.999989509583, 61.9999945163727],
    [165.99999666214, 81.999847443],
    [36.9999885559082, 81.999847443],
    [16.9999957084656, 61.9999945163727],
    [16.9999957084656, 33.9999973773956]
);

//完成后，将前景色恢复到以前记录下来的颜色
app.foregroundColor = saveColor;
