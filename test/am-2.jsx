// var ref1 = new ActionReference();
// ref1.putName(stringIDToTypeID("layer"), "1");
// var layerDesc = executeActionGet(ref1);

// for (var i = 0; i < layerDesc.count; i++) {
//     // typeID - getKey 获取 typeID
//     var typeID = layerDesc.getKey(i);
//     // stringID - typeIDToStringID 获取 stringID
//     var stringID = typeIDToStringID(typeID);
//     // typeString - getType 获取类型
//     var typeString = layerDesc.getType(typeID);

//     if (stringID === "name") {
//         var value = layerDesc.getString(typeID);
//         $.writeln(stringID + "=>" + value);
//     }

//     // $.writeln(stringID + "=>" + typeString);
// }

/**
 * 将 ActionDescriptor 转换为 JSON 格式
 * @param {ActionDescriptor} desc - 要转换的 ActionDescriptor
 * @returns JSON
 */
function ADToJson(desc) {
    var json = {};
    for (var i = 0; i < desc.count; i++) {
        var typeID = desc.getKey(i);
        var stringID = typeIDToStringID(typeID);
        var typeString = desc.getType(typeID).toString();

        // 根据类型获取值
        switch (typeString) {
            case "DescValueType.BOOLEANTYPE":
                json[stringID] = desc.getBoolean(typeID);
                break;
            case "DescValueType.DOUBLETYPE":
                json[stringID] = desc.getDouble(typeID);
                break;
            case "DescValueType.INTEGERTYPE":
                json[stringID] = desc.getInteger(typeID);
                break;
            case "DescValueType.STRINGTYPE":
                json[stringID] = desc.getString(typeID);
                break;
            case "DescValueType.OBJECTTYPE":
                var objectValue = desc.getObjectValue(typeID);
                json[stringID] = ADToJson(objectValue);
                break;
            case "DescValueType.CLASSTYPE":
            case "DescValueType.LISTTYPE":
            case "DescValueType.REFERENCETYPE":
                // 剩下这些留给你去补充完成
                break;
            default:
                break;
        }
    }
    return json;
}

// =======================================================
// var ref1 = new ActionReference();
// ref1.putName(stringIDToTypeID("layer"), "1");  // 通过 名称 获取图层引用
//     // ref1.putIndex(stringIDToTypeID("itemIndex"), 1); // 通过图层 索引 获取图层引用
//     // ref1.putIdentifier(stringIDToTypeID("layerID"), 1); // 通过图层 ID 获取图层引用
// var layerDescriptor = executeActionGet(ref1);
// var json = ADToJson(layerDescriptor);

// =======================================================
// 获取当前选中的图层信息
// var ref1 = new ActionReference();
// // 它的含义是 layer -> ordinal -> target，也就是当前选中的图层
// ref1.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
// var layerDescriptor = executeActionGet(ref1);
// var json = ADToJson(layerDescriptor);
// for (var key in json) {
//     $.writeln(key + " => " + json[key]);
// }

// =======================================================
// 获取当前文档信息
// var ref1 = new ActionReference();
// ref1.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
// var docDescriptor = executeActionGet(ref1);
// var docJson = ADToJson(docDescriptor);
// for (var key in docJson) {
//     $.writeln(key + " => " + docJson[key]);
// }
// $.writeln(docJson.targetLayersIDs)

// =======================================================
// 获取 targetLayersIDs
// var ref1 = new ActionReference();
// ref1.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("targetLayersIDs"));
// ref1.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
// var docDescriptor = executeActionGet(ref1);
// var list = docDescriptor.getList(stringIDToTypeID("targetLayersIDs"));
// $.writeln("targetLayersIDs: " + list.count);
// // 遍历 targetLayersIDs
// for (var i = 0; i < list.count; i++) {
//     var typeID = docDescriptor.getKey(i);
//     var stringID = typeIDToStringID(typeID);
//     var typeString = docDescriptor.getType(typeID).toString();
//     $.writeln("targetLayersIDs[" + i + "] => " + stringID + " (" + typeString + ")");
// }

// =======================================================
// 获取应用程序信息
var ref1 = new ActionReference();
ref1.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("tool"));
ref1.putEnumerated(stringIDToTypeID("application"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var appDescriptor = executeActionGet(ref1);
var json = ADToJson(appDescriptor);
for (var key in json) {
    $.writeln(key + " => " + json[key]);
}