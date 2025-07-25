



/**
 * 打印所有已安装的字体信息
 */
// printAllInstalledTextFontInfo();
function printAllInstalledTextFontInfo() {
    var allFonts = [];

    for (var i = 0; i < app.fonts.length; i++) {
        var str = "{" + app.fonts[i].family + "|" + app.fonts[i].name + "|" + app.fonts[i].postScriptName + "|" + app.fonts[i].style + "}";

        allFonts.push(str);
    }

    alert(allFonts);
}
