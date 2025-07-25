//创建一个Document对象
var docRef = app.documents.add(400, 300, 72);

//创建一个ArtLayer对象
var newTextLayer = docRef.artLayers.add();

//注意:一个文本对象必须要依附于一个Layer对象，并且Layer的kind必须是TEXT类型
newTextLayer.kind = LayerKind.TEXT;

//当设置为TEXT类型时，PS自动会创建一个TextItem对象给Layer，因此可以直接引用
newTextLayer.textItem.font = "MicrosoftYaHeiUI-Blod";

//这里需要注意的是，TextItem.font的数据类型是字符串，该字符串是使用了TextFont
//对象中的postScriptName,这一点务必要注意。
//由这里看出，前面 printAllInstalledTextFontInfo函数的作用了，你可以打印出来，查找
//postScriptName的名称，然后记住是用这个名称来设置字体name和style

// 设置要显示的内容
newTextLayer.textItem.contents = "随风而行的PSDOM Demo";
// 设置字体大小
newTextLayer.textItem.size = 36;

// 设置文字颜色
var textColor = new SolidColor();
textColor.rgb.red = 255;
textColor.rgb.green = 0;
textColor.rgb.blue = 0;
newTextLayer.textItem.color = textColor;

