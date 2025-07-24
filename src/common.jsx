var SCRIPT = {
    name: "图稿设计工具箱-PS",
    version: "0.0.1",
};

var CFG = {
    markSizeLayerSetName: "标注尺寸组",
    markSizeGap: 4, // 标注线与选区的间距
    markSizeShortLineWidth: 8, // 短线的长度
    markSizeArrowSize: 6, // 箭头大小
};

var UTILS = {
    /**
     * 输出对象所有属性
     * @param {*} obj
     */
    printProperties: function (obj) {
        for (var prop in obj) {
            // 检查属性是否为对象的自有属性
            if (!obj.hasOwnProperty(prop)) continue;
            $.writeln(prop + ": " + obj[prop]);
        }
    },

    /**
     * 绘制线段
     * @param {*} start
     * @param {*} stop
     */
    drawLine: function (start, stop) {
        var doc = app.activeDocument;

        // 创建起点
        var startPoint = new PathPointInfo();
        startPoint.anchor = start;
        startPoint.leftDirection = start;
        startPoint.rightDirection = start;
        startPoint.kind = PointKind.CORNERPOINT;

        // 创建终点
        var stopPoint = new PathPointInfo();
        stopPoint.anchor = stop;
        stopPoint.leftDirection = stop;
        stopPoint.rightDirection = stop;
        stopPoint.kind = PointKind.CORNERPOINT;

        // 创建子路径信息
        // 设置为非闭合路径，操作类型为异或
        // 这样可以在现有图层上绘制线段而不影响其他内容
        var spi = new SubPathInfo();
        spi.closed = false;
        spi.operation = ShapeOperation.SHAPEXOR;
        spi.entireSubPath = [startPoint, stopPoint];

        // 创建路径项并描边
        // 使用PENCIL工具进行描边
        var uniqueName = "Line " + Date.now();
        var line = doc.pathItems.add(uniqueName, [spi]);
        line.strokePath(ToolType.PENCIL);
        // 描边完成后移除路径项
        // 因为我们只需要线段的效果，不需要保留路径项
        line.remove();
    },

    /**
     * 绘制箭头
     */
    drawArrow: function (p1, p2, p3) {
        try {
            var doc = app.activeDocument;
            doc.selection.deselect();
            doc.selection.select([p1, p2, p3]);
            doc.selection.fill(app.foregroundColor);
            doc.selection.deselect();
        } catch (e) {
            alert("绘制箭头失败: " + e.message);
        }
    },

    /**
     * 创建 SolidColor 对象
     * @param {*} r
     * @param {*} g
     * @param {*} b
     * @returns
     */
    createSolidColor: function (r, g, b) {
        var color = new SolidColor();
        color.rgb.red = r;
        color.rgb.green = g;
        color.rgb.blue = b;
        return color;
    },
};

polyfills();
function polyfills() {
    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) callback(this[i], i, this);
    };

    Array.prototype.includes = function (search) {
        return this.indexOf(search) !== -1;
    };

    Array.prototype.indexOf = function (obj, start) {
        for (var i = start || 0, j = this.length; i < j; i++) {
            if (this[i] === obj) return i;
        }
        return -1;
    };

    Array.prototype.filter = function (callback, context) {
        arr = [];
        for (var i = 0; i < this.length; i++) {
            if (callback.call(context, this[i], i, this)) arr.push(this[i]);
        }
        return arr;
    };

    Array.prototype.map = function (callback, context) {
        arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(callback.call(context, this[i], i, this));
        }
        return arr;
    };

    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };

    Object.keys = function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };
}
