//@include "../src/descriptor-info.jsx"
//@include "../src/JSON.jsx"

var ref = new ActionReference();
ref.putEnumerated(stringIDToTypeID("layer"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var desc = executeActionGet(ref);

// 把JSON数据输出到桌面文件
var descFlags = {
	reference : false,
	extended : false,
	maxRawLimit : 10000,
	maxXMPLimit : 100000,
	saveToFile: Folder.desktop.absoluteURI + '/descriptor-info-application.json' 
};
var descObject = descriptorInfo.getProperties(desc, descFlags)

$.writeln(JSON.stringify(descObject, null, 4));