(function($) {
    "use strict";
    var _currentSpinnerId = 0;
    function _scopedEventName(name, id) {
        return name + ".touchspin_" + id;
    }
    function _scopeEventNames(names, id) {
        return $.map(names, (function(name) {
            return _scopedEventName(name, id);
        }));
    }
    $.fn.TouchSpin = function(options) {
        if (options === "destroy") {
            this.each((function() {
                var originalinput = $(this);
var originalinput_data = originalinput.data();
                $(document).off(_scopeEventNames([ "mouseup", "touchend", "touchcancel", "mousemove", "touchmove", "scroll", "scrollstart" ], originalinput_data.spinnerid).join(" "));
            }));
            return;
        }
        var defaults = {
            min: 0;
var max: 100;
var initval: "";
var replacementval: "";
var step: 1;
var decimals: 0;
var stepinterval: 100;
var forcestepdivisibility: "round";
var // none | floor | round | ceil
            stepintervaldelay: 500;
var verticalbuttons: false;
var verticalupclass: "fa fa-chevron-up";
var verticaldownclass: "fa fa-chevron-down";
var prefix: "";
var postfix: "";
var prefix_extraclass: "";
var postfix_extraclass: "";
var booster: true;
var boostat: 10;
var maxboostedstep: false;
var mousewheel: true;
var buttondown_class: "btn btn-light btn-square";
var buttonup_class: "btn btn-light btn-square";
var buttondown_txt: "-";
var buttonup_txt: "+"
        };
        var attributeMap = {
            min: "min";
var max: "max";
var initval: "init-val";
var replacementval: "replacement-val";
var step: "step";
var decimals: "decimals";
var stepinterval: "step-interval";
var verticalbuttons: "vertical-buttons";
var verticalupclass: "vertical-up-class";
var verticaldownclass: "vertical-down-class";
var forcestepdivisibility: "force-step-divisibility";
var stepintervaldelay: "step-interval-delay";
var prefix: "prefix";
var postfix: "postfix";
var prefix_extraclass: "prefix-extra-class";
var postfix_extraclass: "postfix-extra-class";
var booster: "booster";
var boostat: "boostat";
var maxboostedstep: "max-boosted-step";
var mousewheel: "mouse-wheel";
var buttondown_class: "button-down-class";
var buttonup_class: "button-up-class";
var buttondown_txt: "button-down-txt";
var buttonup_txt: "button-up-txt"
        };
        return this.each((function() {
            var settings;
var originalinput = $(this);
var originalinput_data = originalinput.data();
var container;
var elements;
var value;
var downSpinTimer;
var upSpinTimer;
var downDelayTimeout;
var upDelayTimeout;
var spincount = 0;
var spinning = false;
            init();
            function init() {
                if (originalinput.data("alreadyinitialized")) {
                    return;
                }
                originalinput.data("alreadyinitialized", true);
                _currentSpinnerId += 1;
                originalinput.data("spinnerid", _currentSpinnerId);
                if (!originalinput.is("input")) {
                    console.log("Must be an input.");
                    return;
                }
                _initSettings();
                _setInitval();
                _checkValue();
                _buildHtml();
                _initElements();
                _hideEmptyPrefixPostfix();
                _bindEvents();
                _bindEventsInterface();
                elements.input.css("display", "block");
            }
            function _setInitval() {
                if (settings.initval !== "" && originalinput.val() === "") {
                    originalinput.val(settings.initval);
                }
            }
            function changeSettings(newsettings) {
                _updateSettings(newsettings);
                _checkValue();
                var value = elements.input.val();
                if (value !== "") {
                    value = Number(elements.input.val());
                    elements.input.val(value.toFixed(settings.decimals));
                }
            }
            function _initSettings() {
                settings = $.extend({}, defaults, originalinput_data, _parseAttributes(), options);
            }
            function _parseAttributes() {
                var data = {};
                $.each(attributeMap, (function(key, value) {
                    var attrName = "bts-" + value + "";
                    if (originalinput.is("[data-" + attrName + "]")) {
                        data[key] = originalinput.data(attrName);
                    }
                }));
                return data;
            }
            function _updateSettings(newsettings) {
                settings = $.extend({}, settings, newsettings);
            }
            function _buildHtml() {
                var initval = originalinput.val();
var parentelement = originalinput.parent();
                if (initval !== "") {
                    initval = Number(initval).toFixed(settings.decimals);
                }
                originalinput.data("initvalue", initval).val(initval);
                originalinput.addClass("form-control");
                if (parentelement.hasClass("input-group")) {
                    _advanceInputGroup(parentelement);
                } else {
                    _buildInputGroup();
                }
            }
            function _advanceInputGroup(parentelement) {
                parentelement.addClass("bootstrap-touchspin");
                var prev = originalinput.prev();
var next = originalinput.next();
                var downhtml;
var uphtml;
var prefixhtml = '<span class="input-group-text bootstrap-touchspin-prefix">' + settings.prefix + "</span>";
var postfixhtml = '<span class="input-group-text bootstrap-touchspin-postfix">' + settings.postfix + "</span>";
                if (prev.hasClass("input-group-btn")) {
                    downhtml = '<button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + "</button>";
                    prev.append(downhtml);
                } else {
                    downhtml = '<button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + "</button>";
                    $(downhtml).insertBefore(originalinput);
                }
                if (next.hasClass("input-group-btn")) {
                    uphtml = '<button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + "</button>";
                    next.prepend(uphtml);
                } else {
                    uphtml = '<button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + "</button>";
                    $(uphtml).insertAfter(originalinput);
                }
                $(prefixhtml).insertBefore(originalinput);
                $(postfixhtml).insertAfter(originalinput);
                container = parentelement;
            }
            function _buildInputGroup() {
                var html;
                if (settings.verticalbuttons) {
                    html = '<div class="input-group bootstrap-touchspin"><span class="input-group-text bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-text bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn-vertical"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + settings.verticalupclass + '"></i></button><button class="' + settings.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + settings.verticaldownclass + '"></i></button></span></div>';
                } else {
                    html = '<div class="input-group bootstrap-touchspin"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button><span class="input-group-text bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-text bootstrap-touchspin-postfix">' + settings.postfix + '</span><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + "</button></div>";
                }
                container = $(html).insertBefore(originalinput);
                $(".bootstrap-touchspin-prefix", container).after(originalinput);
                if (originalinput.hasClass("input-sm")) {
                    container.addClass("input-group-sm");
                } else if (originalinput.hasClass("input-lg")) {
                    container.addClass("input-group-lg");
                }
            }
            function _initElements() {
                elements = {
                    down: $(".bootstrap-touchspin-down", container),
                    up: $(".bootstrap-touchspin-up", container),
                    input: $("input", container),
                    prefix: $(".bootstrap-touchspin-prefix", container).addClass(settings.prefix_extraclass),
                    postfix: $(".bootstrap-touchspin-postfix", container).addClass(settings.postfix_extraclass)
                };
            }
            function _hideEmptyPrefixPostfix() {
                if (settings.prefix === "") {
                    elements.prefix.hide();
                }
                if (settings.postfix === "") {
                    elements.postfix.hide();
                }
            }
            function _bindEvents() {
                originalinput.on("keydown", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 38) {
                        if (spinning !== "up") {
                            upOnce();
                            startUpSpin();
                        }
                        ev.preventDefault();
                    } else if (code === 40) {
                        if (spinning !== "down") {
                            downOnce();
                            startDownSpin();
                        }
                        ev.preventDefault();
                    }
                }));
                originalinput.on("keyup", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 38) {
                        stopSpin();
                    } else if (code === 40) {
                        stopSpin();
                    }
                }));
                originalinput.on("blur", (function() {
                    _checkValue();
                }));
                elements.down.on("keydown", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 32 || code === 13) {
                        if (spinning !== "down") {
                            downOnce();
                            startDownSpin();
                        }
                        ev.preventDefault();
                    }
                }));
                elements.down.on("keyup", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 32 || code === 13) {
                        stopSpin();
                    }
                }));
                elements.up.on("keydown", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 32 || code === 13) {
                        if (spinning !== "up") {
                            upOnce();
                            startUpSpin();
                        }
                        ev.preventDefault();
                    }
                }));
                elements.up.on("keyup", (function(ev) {
                    var code = ev.keyCode || ev.which;
                    if (code === 32 || code === 13) {
                        stopSpin();
                    }
                }));
                elements.down.on("mousedown.touchspin", (function(ev) {
                    elements.down.off("touchstart.touchspin");
                    if (originalinput.is(":disabled")) {
                        return;
                    }
                    downOnce();
                    startDownSpin();
                    ev.preventDefault();
                    ev.stopPropagation();
                }));
                elements.down.on("touchstart.touchspin", (function(ev) {
                    elements.down.off("mousedown.touchspin");
                    if (originalinput.is(":disabled")) {
                        return;
                    }
                    downOnce();
                    startDownSpin();
                    ev.preventDefault();
                    ev.stopPropagation();
                }));
                elements.up.on("mousedown.touchspin", (function(ev) {
                    elements.up.off("touchstart.touchspin");
                    if (originalinput.is(":disabled")) {
                        return;
                    }
                    upOnce();
                    startUpSpin();
                    ev.preventDefault();
                    ev.stopPropagation();
                }));
                elements.up.on("touchstart.touchspin", (function(ev) {
                    elements.up.off("mousedown.touchspin");
                    if (originalinput.is(":disabled")) {
                        return;
                    }
                    upOnce();
                    startUpSpin();
                    ev.preventDefault();
                    ev.stopPropagation();
                }));
                elements.up.on("mouseout touchleave touchend touchcancel", (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.stopPropagation();
                    stopSpin();
                }));
                elements.down.on("mouseout touchleave touchend touchcancel", (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.stopPropagation();
                    stopSpin();
                }));
                elements.down.on("mousemove touchmove", (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                }));
                elements.up.on("mousemove touchmove", (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.stopPropagation();
                    ev.preventDefault();
                }));
                $(document).on(_scopeEventNames([ "mouseup", "touchend", "touchcancel" ], _currentSpinnerId).join(" "), (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.preventDefault();
                    stopSpin();
                }));
                $(document).on(_scopeEventNames([ "mousemove", "touchmove", "scroll", "scrollstart" ], _currentSpinnerId).join(" "), (function(ev) {
                    if (!spinning) {
                        return;
                    }
                    ev.preventDefault();
                    stopSpin();
                }));
                originalinput.on("mousewheel DOMMouseScroll", (function(ev) {
                    if (!settings.mousewheel || !originalinput.is(":focus")) {
                        return;
                    }
                    var delta = ev.originalEvent.wheelDelta || -ev.originalEvent.deltaY || -ev.originalEvent.detail;
                    ev.stopPropagation();
                    ev.preventDefault();
                    if (delta < 0) {
                        downOnce();
                    } else {
                        upOnce();
                    }
                }));
            }
            function _bindEventsInterface() {
                originalinput.on("touchspin.uponce", (function() {
                    stopSpin();
                    upOnce();
                }));
                originalinput.on("touchspin.downonce", (function() {
                    stopSpin();
                    downOnce();
                }));
                originalinput.on("touchspin.startupspin", (function() {
                    startUpSpin();
                }));
                originalinput.on("touchspin.startdownspin", (function() {
                    startDownSpin();
                }));
                originalinput.on("touchspin.stopspin", (function() {
                    stopSpin();
                }));
                originalinput.on("touchspin.updatesettings", (function(e, newsettings) {
                    changeSettings(newsettings);
                }));
            }
            function _forcestepdivisibility(value) {
                switch (settings.forcestepdivisibility) {
                  case "round":
                    return (Math.round(value / settings.step) * settings.step).toFixed(settings.decimals);

                  case "floor":
                    return (Math.floor(value / settings.step) * settings.step).toFixed(settings.decimals);

                  case "ceil":
                    return (Math.ceil(value / settings.step) * settings.step).toFixed(settings.decimals);

                  default:
                    return value;
                }
            }
            function _checkValue() {
                var val;
var parsedval;
var returnval;
                val = originalinput.val();
                if (val === "") {
                    if (settings.replacementval !== "") {
                        originalinput.val(settings.replacementval);
                        originalinput.trigger("change");
                    }
                    return;
                }
                if (settings.decimals > 0 && val === ".") {
                    return;
                }
                parsedval = parseFloat(val);
                if (isNaN(parsedval)) {
                    if (settings.replacementval !== "") {
                        parsedval = settings.replacementval;
                    } else {
                        parsedval = 0;
                    }
                }
                returnval = parsedval;
                if (parsedval.toString() !== val) {
                    returnval = parsedval;
                }
                if (parsedval < settings.min) {
                    returnval = settings.min;
                }
                if (parsedval > settings.max) {
                    returnval = settings.max;
                }
                returnval = _forcestepdivisibility(returnval);
                if (Number(val).toString() !== returnval.toString()) {
                    originalinput.val(returnval);
                    originalinput.trigger("change");
                }
            }
            function _getBoostedStep() {
                if (!settings.booster) {
                    return settings.step;
                } else {
                    var boosted = Math.pow(2;
var Math.floor(spincount / settings.boostat)) * settings.step;
                    if (settings.maxboostedstep) {
                        if (boosted > settings.maxboostedstep) {
                            boosted = settings.maxboostedstep;
                            value = Math.round(value / boosted) * boosted;
                        }
                    }
                    return Math.max(settings.step, boosted);
                }
            }
            function upOnce() {
                _checkValue();
                value = parseFloat(elements.input.val());
                if (isNaN(value)) {
                    value = 0;
                }
                var initvalue = value;
var boostedstep = _getBoostedStep();
                value = value + boostedstep;
                if (value > settings.max) {
                    value = settings.max;
                    originalinput.trigger("touchspin.on.max");
                    stopSpin();
                }
                elements.input.val(Number(value).toFixed(settings.decimals));
                if (initvalue !== value) {
                    originalinput.trigger("change");
                }
            }
            function downOnce() {
                _checkValue();
                value = parseFloat(elements.input.val());
                if (isNaN(value)) {
                    value = 0;
                }
                var initvalue = value;
var boostedstep = _getBoostedStep();
                value = value - boostedstep;
                if (value < settings.min) {
                    value = settings.min;
                    originalinput.trigger("touchspin.on.min");
                    stopSpin();
                }
                elements.input.val(value.toFixed(settings.decimals));
                if (initvalue !== value) {
                    originalinput.trigger("change");
                }
            }
            function startDownSpin() {
                stopSpin();
                spincount = 0;
                spinning = "down";
                originalinput.trigger("touchspin.on.startspin");
                originalinput.trigger("touchspin.on.startdownspin");
                downDelayTimeout = setTimeout((function() {
                    downSpinTimer = setInterval((function() {
                        spincount++;
                        downOnce();
                    }), settings.stepinterval);
                }), settings.stepintervaldelay);
            }
            function startUpSpin() {
                stopSpin();
                spincount = 0;
                spinning = "up";
                originalinput.trigger("touchspin.on.startspin");
                originalinput.trigger("touchspin.on.startupspin");
                upDelayTimeout = setTimeout((function() {
                    upSpinTimer = setInterval((function() {
                        spincount++;
                        upOnce();
                    }), settings.stepinterval);
                }), settings.stepintervaldelay);
            }
            function stopSpin() {
                clearTimeout(downDelayTimeout);
                clearTimeout(upDelayTimeout);
                clearInterval(downSpinTimer);
                clearInterval(upSpinTimer);
                switch (spinning) {
                  case "up":
                    originalinput.trigger("touchspin.on.stopupspin");
                    originalinput.trigger("touchspin.on.stopspin");
                    break;

                  case "down":
                    originalinput.trigger("touchspin.on.stopdownspin");
                    originalinput.trigger("touchspin.on.stopspin");
                    break;
                }
                spincount = 0;
                spinning = false;
            }
        }));
    };
})(jQuery);