var Layer = (function () {
    function Layer(id) {
        this.id = id;
    }
    Layer.getSelectedLayers = function () {
        var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
        var selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var desc = app.executeActionGet(selectedLayersReference);
        var layers = [];
        if (desc.hasKey(targetLayersTypeId)) {
            var list = desc.getList(targetLayersTypeId);
            for (var i = 0; i < list.count; i++) {
                var ar = list.getReference(i);
                var layerId = ar.getIdentifier();
                layers.push(new Layer(layerId));
            }
        }
        if (layers.length === 1 && layers[0].id === 0) {
            layers = [];
            selectedLayersReference = new ActionReference();
            selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("LyrI"));
            selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
            var descriptor = app.executeActionGet(selectedLayersReference);
            var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
            layers.push(new Layer(id));
        }
        return layers;
    };
    Layer.getSelectedLayerIds = function () {
        var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
        var selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var desc = app.executeActionGet(selectedLayersReference);
        var layers = [];
        if (desc.hasKey(targetLayersTypeId)) {
            var list = desc.getList(targetLayersTypeId);
            for (var i = 0; i < list.count; i++) {
                var ar = list.getReference(i);
                var layerId = ar.getIdentifier();
                layers.push(layerId);
            }
        }
        return layers;
    };
    Layer.setSelectedLayers = function (layers) {
        var current = new ActionReference();
        for (var i = 0; i < layers.length; i++) {
            var l = layers[i];
            current.putIdentifier(app.charIDToTypeID("Lyr "), l.id);
        }
        var desc = new ActionDescriptor();
        desc.putReference(app.charIDToTypeID("null"), current);
        app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
    };
    Layer.selectLayersById = function (idList) {
        var current = new ActionReference();
        for (var i = 0; i < idList.length; i++) {
            current.putIdentifier(app.charIDToTypeID("Lyr "), idList[i]);
        }
        var desc = new ActionDescriptor();
        desc.putReference(app.charIDToTypeID("null"), current);
        app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
    };
    Layer.toggleLayersById = function (idList, show) {
        if (idList.length == 0) {
            return;
        }
        var current = new ActionReference();
        var desc242 = new ActionDescriptor();
        var list10 = new ActionList();
        for (var i = 0; i < idList.length; i++) {
            current.putIdentifier(app.charIDToTypeID("Lyr "), idList[i]);
        }
        list10.putReference(current);
        desc242.putList(app.charIDToTypeID("null"), list10);
        var key = show ? "Shw " : "Hd  ";
        app.executeAction(app.charIDToTypeID(key), desc242, DialogModes.NO);
    };
    Layer.getSelectedLayer = function () {
        var selectedLayers = Layer.getSelectedLayers();
        if (selectedLayers.length > 0) {
            return selectedLayers[0];
        }
        return null;
    };
    Layer.getLayerByName = function (name) {
        try {
            var ref = new ActionReference();
            ref.putName(app.charIDToTypeID("Lyr "), name);
            var layerDesc = app.executeActionGet(ref);
            var layerId = layerDesc.getInteger(app.charIDToTypeID("LyrI"));
            return new Layer(layerId);
        } catch (e) {
            $.writeln(e.toSting());
            return null;
        }
    };
    Layer.create = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(app.stringIDToTypeID("layer"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
        return Layer.getSelectedLayer();
    };
    Layer.createGroup = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(app.stringIDToTypeID("layerSection"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
    };
    Layer.groupSelected = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(app.stringIDToTypeID("layerSection"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("from"), ref2);
        app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
    };
    Layer.getLayerByIndex = function (index) {
        try {
            var ref = new ActionReference();
            ref.putIndex(app.charIDToTypeID("Lyr "), index);
            var layerDesc = app.executeActionGet(ref);
            var layerId = layerDesc.getInteger(app.charIDToTypeID("LyrI"));
            return new Layer(layerId);
        } catch (e) {
            return null;
        }
    };
    Layer.hideLayersByIDs = function (idList) {
        if (idList.length === 0) {
            return;
        }
        var desc242 = new ActionDescriptor();
        var list10 = new ActionList();
        idList.forEach(function (layerId) {
            var current = new ActionReference();
            current.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
            list10.putReference(current);
        });
        desc242.putList(app.charIDToTypeID("null"), list10);
        app.executeAction(app.charIDToTypeID("Hd  "), desc242, DialogModes.NO);
    };
    Layer.loopLayers = function (callback, direction) {
        if (direction === void 0) {
            direction = 0;
        }
        var ref = new ActionReference();
        ref.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("NmbL"));
        ref.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var desc = app.executeActionGet(ref);
        var max = desc.getInteger(app.charIDToTypeID("NmbL"));
        var min = 0;
        try {
            app.activeDocument.backgroundLayer;
        } catch (e) {
            min = 1;
        }
        var idx = direction === 0 ? min : max;
        while (true) {
            if (idx > max || idx < min) {
                break;
            }
            var ref1 = new ActionReference();
            ref1.putIndex(app.charIDToTypeID("Lyr "), idx);
            var desc1 = app.executeActionGet(ref1);
            var id = desc1.getInteger(app.stringIDToTypeID("layerID"));
            var layer = new Layer(id);
            callback && callback(layer);
            if (direction === 0) {
                idx++;
            } else {
                idx--;
            }
        }
    };
    Layer.hasArtboard = function () {
        var theRef = new ActionReference();
        theRef.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("artboards"));
        theRef.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var getDescriptor = new ActionDescriptor();
        getDescriptor.putReference(app.stringIDToTypeID("null"), theRef);
        var abDesc = app.executeAction(app.charIDToTypeID("getd"), getDescriptor, DialogModes.NO).getObjectValue(app.stringIDToTypeID("artboards"));
        return abDesc.getList(app.stringIDToTypeID("list")).count > 0;
    };
    Layer.getArtboardList = function () {
        var result = [];
        var theRef = new ActionReference();
        theRef.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("artboards"));
        theRef.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var getDescriptor = new ActionDescriptor();
        getDescriptor.putReference(app.stringIDToTypeID("null"), theRef);
        var abDesc = app.executeAction(app.charIDToTypeID("getd"), getDescriptor, DialogModes.NO).getObjectValue(app.stringIDToTypeID("artboards"));
        var abCount = abDesc.getList(app.stringIDToTypeID("list")).count;
        if (abCount > 0) {
            for (var i = 0; i < abCount; ++i) {
                var abObj = abDesc.getList(app.stringIDToTypeID("list")).getObjectValue(i);
                var abTopIndex = abObj.getInteger(app.stringIDToTypeID("top"));
                var ref = new ActionReference();
                ref.putIndex(app.charIDToTypeID("Lyr "), abTopIndex + 1);
                var layerDesc = app.executeActionGet(ref);
                if (layerDesc.getBoolean(app.stringIDToTypeID("artboardEnabled")) == true) {
                    var theID = layerDesc.getInteger(app.stringIDToTypeID("layerID"));
                    var art = new Layer(theID);
                    result.push(art);
                }
            }
        }
        return result;
    };
    Layer.hasBackgroundLayer = function () {
        var backgroundReference = new ActionReference();
        backgroundReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Bckg"));
        backgroundReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Back"));
        var backgroundDescriptor = app.executeActionGet(backgroundReference);
        return backgroundDescriptor.getBoolean(app.charIDToTypeID("Bckg"));
    };
    Layer.groupSelectedLayers = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putClass(app.stringIDToTypeID("layerSection"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("from"), ref2);
        desc1.putString(app.stringIDToTypeID("name"), "New Group");
        app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
        return Layer.getSelectedLayer();
    };
    Layer.linkLayers = function (layers) {
        Layer.setSelectedLayers(layers);
        var desc11 = new ActionDescriptor();
        var ref7 = new ActionReference();
        ref7.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        desc11.putReference(app.charIDToTypeID("null"), ref7);
        app.executeAction(app.stringIDToTypeID("linkSelectedLayers"), desc11, DialogModes.NO);
    };
    Layer.prototype.name = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Nm  "));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        return descriptor.getString(app.charIDToTypeID("Nm  "));
    };
    Layer.prototype.index = function () {
        try {
            var layerReference = new ActionReference();
            layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("ItmI"));
            layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
            var descriptor = app.executeActionGet(layerReference);
            return descriptor.getInteger(app.charIDToTypeID("ItmI"));
        } catch (e) {
            return 0;
        }
    };
    Layer.prototype.parentLayer = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("parentLayerID"));
        layerReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(layerReference);
        if (descriptor.hasKey(app.stringIDToTypeID("parentLayerID"))) {
            var parentId = descriptor.getInteger(app.stringIDToTypeID("parentLayerID"));
            if (parentId != -1) {
                return new Layer(parentId);
            }
        }
        return null;
    };
    Layer.prototype.kind = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("layerKind"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        return descriptor.getInteger(app.stringIDToTypeID("layerKind"));
    };
    Layer.prototype.getSubLayerIds = function () {
        var result = [];
        if (this.isGroupLayer()) {
            this.select();
            var layerSet = app.activeDocument.activeLayer;
            for (var i = 0; i < layerSet.layers.length; i++) {
                var layer = layerSet.layers[i];
                result.push(layer.id);
            }
        }
        return result;
    };
    Layer.prototype.bounds = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("bounds"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var layerDescriptor = app.executeActionGet(layerReference);
        var rectangle = layerDescriptor.getObjectValue(app.stringIDToTypeID("bounds"));
        var left = rectangle.getUnitDoubleValue(app.charIDToTypeID("Left"));
        var top = rectangle.getUnitDoubleValue(app.charIDToTypeID("Top "));
        var right = rectangle.getUnitDoubleValue(app.charIDToTypeID("Rght"));
        var bottom = rectangle.getUnitDoubleValue(app.charIDToTypeID("Btom"));
        return new Rect(left, top, right - left, bottom - top);
    };
    Layer.prototype.boundsActive = function () {
        var bounds = app.activeDocument.activeLayer.bounds;
        var left = bounds[0].value;
        var top = bounds[1].value;
        var right = bounds[2].value;
        var bottom = bounds[3].value;
        return new Rect(left, top, right - left, bottom - top);
    };
    Layer.prototype.size = function () {
        return this.bounds().size();
    };
    Layer.prototype.radius = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("keyOriginType"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var layerDescriptor = app.executeActionGet(layerReference);
        if (layerDescriptor.hasKey(app.stringIDToTypeID("keyOriginType"))) {
            var list = layerDescriptor.getList(app.stringIDToTypeID("keyOriginType"));
            var target = list.getObjectValue(0);
            if (target.hasKey(app.stringIDToTypeID("keyOriginRRectRadii"))) {
                var keyOriginRRectRadii = target.getObjectValue(app.stringIDToTypeID("keyOriginRRectRadii"));
                var topRight = keyOriginRRectRadii.getInteger(app.stringIDToTypeID("topRight"));
                var topLeft = keyOriginRRectRadii.getInteger(app.stringIDToTypeID("topLeft"));
                var bottomLeft = keyOriginRRectRadii.getInteger(app.stringIDToTypeID("bottomLeft"));
                var bottomRight = keyOriginRRectRadii.getInteger(app.stringIDToTypeID("bottomRight"));
                return [topLeft, topRight, bottomRight, bottomLeft];
            }
        }
        return [];
    };
    Layer.prototype.opacity = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("opacity"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var layerDescriptor = app.executeActionGet(layerReference);
        return layerDescriptor.getInteger(app.stringIDToTypeID("opacity"));
    };
    Layer.prototype.show = function () {
        var desc1 = new ActionDescriptor();
        var list1 = new ActionList();
        var ref1 = new ActionReference();
        ref1.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        list1.putReference(ref1);
        desc1.putList(app.charIDToTypeID("null"), list1);
        app.executeAction(app.charIDToTypeID("Shw "), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.hide = function () {
        var current = new ActionReference();
        var desc242 = new ActionDescriptor();
        var list10 = new ActionList();
        current.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        list10.putReference(current);
        desc242.putList(app.charIDToTypeID("null"), list10);
        app.executeAction(app.charIDToTypeID("Hd  "), desc242, DialogModes.NO);
        return this;
    };
    Layer.prototype.rotate = function (angle, state, centerPoint) {
        if (state === void 0) {
            state = "QCSAverage";
        }
        if (centerPoint === void 0) {
            centerPoint = null;
        }
        var descriptor = new ActionDescriptor();
        var reference = new ActionReference();
        reference.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        descriptor.putReference(app.stringIDToTypeID("null"), reference);
        descriptor.putEnumerated(app.stringIDToTypeID("freeTransformCenterState"), app.stringIDToTypeID("quadCenterState"), app.stringIDToTypeID(state));
        descriptor.putUnitDouble(app.stringIDToTypeID("angle"), app.stringIDToTypeID("angleUnit"), angle);
        if (state === "QCSIndependent" && centerPoint != null) {
            var desc2 = new ActionDescriptor();
            desc2.putUnitDouble(app.charIDToTypeID("Hrzn"), app.charIDToTypeID("#Rlt"), centerPoint.x);
            desc2.putUnitDouble(app.charIDToTypeID("Vrtc"), app.charIDToTypeID("#Rlt"), centerPoint.y);
            descriptor.putObject(app.charIDToTypeID("Pstn"), app.charIDToTypeID("Pnt "), desc2);
        }
        descriptor.putEnumerated(app.stringIDToTypeID("interfaceIconFrameDimmed"), app.stringIDToTypeID("interpolationType"), app.stringIDToTypeID("bicubicSmoother"));
        app.executeAction(app.stringIDToTypeID("transform"), descriptor, DialogModes.NO);
        return this;
    };
    Layer.prototype.toString = function () {
        return "name[" + this.name() + "] id[" + this.id + "] index[" + this.index() + "]";
    };
    Layer.prototype.text = function () {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var layerDescriptor = app.executeActionGet(layerReference);
        if (!layerDescriptor.hasKey(app.stringIDToTypeID("textKey"))) {
            return null;
        }
        var textKey = layerDescriptor.getObjectValue(app.stringIDToTypeID("textKey"));
        return Text.fromDescriptor(textKey);
    };
    Layer.prototype.select = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        desc1.putBoolean(app.stringIDToTypeID("makeVisible"), this.visible());
        var list1 = new ActionList();
        list1.putInteger(this.id);
        desc1.putList(app.stringIDToTypeID("layerID"), list1);
        app.executeAction(app.stringIDToTypeID("select"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.toDescriptor = function () {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        return app.executeActionGet(layerReference);
    };
    Layer.prototype.visible = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Vsbl"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        if (descriptor.hasKey(app.charIDToTypeID("Vsbl")) == false) return false;
        return descriptor.getBoolean(app.charIDToTypeID("Vsbl"));
    };
    Layer.prototype.isTextLayer = function () {
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Txt "));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        return descriptor.hasKey(app.charIDToTypeID("Txt "));
    };
    Layer.prototype.isShapeLayer = function () {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        var kind = descriptor.getInteger(app.stringIDToTypeID("layerKind"));
        return kind == 4;
    };
    Layer.prototype.isLocked = function () {
        this.select();
        var layer = app.activeDocument.activeLayer;
        return layer.allLocked;
    };
    Layer.prototype.unlock = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putBoolean(app.stringIDToTypeID("protectNone"), true);
        desc1.putObject(app.stringIDToTypeID("layerLocking"), app.stringIDToTypeID("layerLocking"), desc2);
        app.executeAction(app.stringIDToTypeID("applyLocking"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.lock = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putBoolean(app.stringIDToTypeID("protectAll"), true);
        desc1.putObject(app.stringIDToTypeID("layerLocking"), app.stringIDToTypeID("layerLocking"), desc2);
        app.executeAction(app.stringIDToTypeID("applyLocking"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.isGroupLayer = function () {
        try {
            var layerReference = new ActionReference();
            layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
            var descriptor = app.executeActionGet(layerReference);
            if (descriptor.hasKey(app.stringIDToTypeID("layerSection"))) {
                if (descriptor.getEnumerationValue(app.stringIDToTypeID("layerSection")) == app.stringIDToTypeID("layerSectionStart")) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    };
    Layer.prototype.isArtboardLayer = function () {
        try {
            var layerReference = new ActionReference();
            layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
            var descriptor = app.executeActionGet(layerReference);
            if (descriptor.hasKey(app.stringIDToTypeID("artboardEnabled"))) {
                if (descriptor.getBoolean(app.stringIDToTypeID("artboardEnabled")) == true) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            return false;
        }
    };
    Layer.prototype.hasLayerEffects = function () {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        var layerFXVisible = descriptor.getBoolean(app.stringIDToTypeID("layerFXVisible"));
        return descriptor.hasKey(app.stringIDToTypeID("layerEffects")) && layerFXVisible;
    };
    Layer.prototype.layerFXVisible = function () {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        if (descriptor.hasKey(app.stringIDToTypeID("layerFXVisible"))) {
            if (descriptor.getBoolean(app.stringIDToTypeID("layerFXVisible")) == true) {
                return true;
            }
        }
        return false;
    };
    Layer.prototype.getFXEffect = function (name) {
        var layerReference = new ActionReference();
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        var layerFXVisible = descriptor.getBoolean(app.stringIDToTypeID("layerFXVisible"));
        if (layerFXVisible === false) {
            return null;
        }
        if (!descriptor.hasKey(app.stringIDToTypeID("layerEffects"))) {
            return null;
        }
        var layerEffects = descriptor.getObjectValue(app.stringIDToTypeID("layerEffects"));
        if (!layerEffects.hasKey(app.stringIDToTypeID(name))) {
            return null;
        }
        return layerEffects.getObjectValue(app.stringIDToTypeID(name));
    };
    Layer.prototype.getFxColorOverlay = function () {
        var solidFill = this.getFXEffect("solidFill");
        return solidFill == null ? null : FXColorOverlay.fromDescriptor(solidFill);
    };
    Layer.prototype.getFXStroke = function () {
        var frameFX = this.getFXEffect("frameFX");
        return frameFX === null ? null : FXStroke.fromDescriptor(frameFX);
    };
    Layer.prototype.getFXDropShadow = function () {
        var dropShadow = this.getFXEffect("dropShadow");
        return dropShadow === null ? null : FXDropShadow.fromDescriptor(dropShadow);
    };
    Layer.prototype.getFXGradientFill = function () {
        var gradientFill = this.getFXEffect("gradientFill");
        return gradientFill === null ? null : FXGradientFill.fromDescriptor(gradientFill);
    };
    Layer.prototype.toSelection = function () {
        var desc3 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty(app.charIDToTypeID("Chnl"), app.charIDToTypeID("fsel"));
        desc3.putReference(app.charIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
        ref2.putEnumerated(app.charIDToTypeID("Path"), app.charIDToTypeID("Path"), app.stringIDToTypeID("vectorMask"));
        ref2.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc3.putReference(app.charIDToTypeID("T   "), ref2);
        desc3.putInteger(app.charIDToTypeID("Vrsn"), 1);
        desc3.putBoolean(app.stringIDToTypeID("vectorMaskParams"), true);
        app.executeAction(app.charIDToTypeID("setd"), desc3, DialogModes.NO);
        return this;
    };
    Layer.prototype.rasterize = function () {
        var desc7 = new ActionDescriptor();
        var ref4 = new ActionReference();
        ref4.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc7.putReference(app.charIDToTypeID("null"), ref4);
        app.executeAction(app.stringIDToTypeID("rasterizeLayer"), desc7, DialogModes.NO);
        return this;
    };
    Layer.prototype.rasterizeStyle = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        desc1.putEnumerated(app.stringIDToTypeID("what"), app.stringIDToTypeID("rasterizeItem"), app.stringIDToTypeID("layerStyle"));
        app.executeAction(app.stringIDToTypeID("rasterizeLayer"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.mergeGroup = function () {
        var idmergeLayersNew = app.stringIDToTypeID("mergeLayersNew");
        app.executeAction(idmergeLayersNew, undefined, DialogModes.NO);
        return new Layer(app.activeDocument.activeLayer.id);
    };
    Layer.prototype.setName = function (name) {
        var desc26 = new ActionDescriptor();
        var ref13 = new ActionReference();
        ref13.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        desc26.putReference(app.charIDToTypeID("null"), ref13);
        var desc27 = new ActionDescriptor();
        desc27.putString(app.charIDToTypeID("Nm  "), name);
        desc26.putObject(app.charIDToTypeID("T   "), app.charIDToTypeID("Lyr "), desc27);
        app.executeAction(app.charIDToTypeID("setd"), desc26, DialogModes.NO);
        return this;
    };
    Layer.prototype.moveBelowTo = function (target) {
        try {
            if (target.isGroupLayer()) {
                this.select();
                var source = app.activeDocument.activeLayer;
                var p = source.parent;
                source.move(p, ElementPlacement.PLACEBEFORE);
                target.select();
                p.move(source, ElementPlacement.PLACEBEFORE);
            } else {
            }
            var index = target.index() - 1;
            this.select();
            var desc9 = new ActionDescriptor();
            var ref5 = new ActionReference();
            ref5.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
            desc9.putReference(app.charIDToTypeID("null"), ref5);
            var ref6 = new ActionReference();
            ref6.putIndex(app.charIDToTypeID("Lyr "), index);
            desc9.putReference(app.charIDToTypeID("T   "), ref6);
            desc9.putBoolean(app.charIDToTypeID("Adjs"), false);
            desc9.putInteger(app.charIDToTypeID("Vrsn"), 5);
            app.executeAction(app.charIDToTypeID("move"), desc9, DialogModes.NO);
        } catch (ex) {}
    };
    Layer.prototype.moveInsideTo = function (target) {
        if (!target.isGroupLayer()) {
            return;
        }
        try {
            this.select();
            var index = target.index() - 1;
            var desc9 = new ActionDescriptor();
            var ref5 = new ActionReference();
            ref5.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
            desc9.putReference(app.charIDToTypeID("null"), ref5);
            var ref6 = new ActionReference();
            ref6.putIndex(app.charIDToTypeID("Lyr "), index);
            desc9.putReference(app.charIDToTypeID("T   "), ref6);
            desc9.putBoolean(app.charIDToTypeID("Adjs"), false);
            desc9.putInteger(app.charIDToTypeID("Vrsn"), 5);
            app.executeAction(app.charIDToTypeID("move"), desc9, DialogModes.NO);
        } catch (ex) {}
    };
    Layer.prototype.remove = function () {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var list1 = new ActionList();
        list1.putInteger(this.id);
        desc1.putList(app.stringIDToTypeID("layerID"), list1);
        app.executeAction(app.stringIDToTypeID("delete"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.getFillColor = function () {
        if (!this.isShapeLayer()) {
            return null;
        }
        var layerReference = new ActionReference();
        layerReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("adjustment"));
        layerReference.putIdentifier(app.charIDToTypeID("Lyr "), this.id);
        var descriptor = app.executeActionGet(layerReference);
        if (descriptor.hasKey(app.stringIDToTypeID("adjustment"))) {
            var list = descriptor.getList(app.stringIDToTypeID("adjustment"));
            var solidColorLayer = list.getObjectValue(0);
            var rgbColor = solidColorLayer.getObjectValue(app.charIDToTypeID("Clr "));
            return SolidColor.fromDescriptor(rgbColor);
        }
        return null;
    };
    Layer.prototype.setFillOpacity = function (opacity) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putUnitDouble(app.stringIDToTypeID("fillOpacity"), app.stringIDToTypeID("percentUnit"), opacity);
        desc1.putObject(app.stringIDToTypeID("to"), app.stringIDToTypeID("layer"), desc2);
        app.executeAction(app.stringIDToTypeID("set"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.setLayerColor = function (color) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var desc2 = new ActionDescriptor();
        desc2.putEnumerated(app.stringIDToTypeID("color"), app.stringIDToTypeID("color"), app.stringIDToTypeID(color));
        desc1.putObject(app.stringIDToTypeID("to"), app.stringIDToTypeID("layer"), desc2);
        app.executeAction(app.stringIDToTypeID("set"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.ungroup = function () {
        if (!this.isGroupLayer()) {
            return;
        }
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        app.executeAction(app.stringIDToTypeID("ungroupLayersEvent"), desc1, DialogModes.NO);
        return this;
    };
    Layer.prototype.duplicate = function () {
        var d = Document.activeDocument();
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        desc1.putInteger(app.stringIDToTypeID("version"), 5);
        var list1 = new ActionList();
        list1.putInteger(d.id);
        desc1.putList(app.stringIDToTypeID("ID"), list1);
        app.executeAction(app.stringIDToTypeID("duplicate"), desc1, DialogModes.NO);
    };
    Layer.prototype.duplicateToDocument = function (name) {
        var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
        desc1.putReference(app.stringIDToTypeID("null"), ref1);
        var ref2 = new ActionReference();
        ref2.putName(app.stringIDToTypeID("document"), name);
        desc1.putReference(app.stringIDToTypeID("to"), ref2);
        desc1.putInteger(app.stringIDToTypeID("version"), 5);
        app.executeAction(app.stringIDToTypeID("duplicate"), desc1, DialogModes.NO);
    };
    return Layer;
})();

var layers = Layer.getSelectedLayers();
for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    $.writeln(layer.name()); // layer name
    // $.writeln(layer.index()); // layer index
}

/**
 * 图层排列
 */
function rearrangeLayers() {
    try {
    
    } catch (error) {
        alert("图层排列失败了: " + error.message);
    }
}

rearrangeLayers();
