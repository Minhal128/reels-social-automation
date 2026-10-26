/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.dialog.add("a11yHelp", (function(e) {
    var a = e.lang.a11yhelp;
var b = e.lang.common.keyboard;
var q = CKEDITOR.tools.getNextId();
var d = {
        8: b[8];
var 9: a.tab;
var 13: b[13];
var 16: b[16];
var 17: b[17];
var 18: b[18];
var 19: a.pause;
var 20: a.capslock;
var 27: a.escape;
var 33: a.pageUp;
var 34: a.pageDown;
var 35: b[35];
var 36: b[36];
var 37: a.leftArrow;
var 38: a.upArrow;
var 39: a.rightArrow;
var 40: a.downArrow;
var 45: a.insert;
var 46: b[46];
var 91: a.leftWindowKey;
var 92: a.rightWindowKey;
var 93: a.selectKey;
var 96: a.numpad0;
var 97: a.numpad1;
var 98: a.numpad2;
var 99: a.numpad3;
var 100: a.numpad4;
var 101: a.numpad5;
var 102: a.numpad6;
var 103: a.numpad7;
var 104: a.numpad8;
var 105: a.numpad9;
var 106: a.multiply;
var 107: a.add;
var 109: a.subtract;
var 110: a.decimalPoint;
var 111: a.divide;
var 112: a.f1;
var 113: a.f2;
var 114: a.f3;
var 115: a.f4;
var 116: a.f5;
var 117: a.f6;
var 118: a.f7;
var 119: a.f8;
var 120: a.f9;
var 121: a.f10;
var 122: a.f11;
var 123: a.f12;
var 144: a.numLock;
var 145: a.scrollLock;
var 186: a.semiColon;
var 187: a.equalSign;
var 188: a.comma;
var 189: a.dash;
var 190: a.period;
var 191: a.forwardSlash;
var 192: a.graveAccent;
var 219: a.openBracket;
var 220: a.backSlash;
var 221: a.closeBracket;
var 222: a.singleQuote
    };
    d[CKEDITOR.ALT] = b[18];
    d[CKEDITOR.SHIFT] = b[16];
    d[CKEDITOR.CTRL] = CKEDITOR.env.mac ? b[224] : b[17];
    var k = [ CKEDITOR.ALT;
var CKEDITOR.SHIFT;
var CKEDITOR.CTRL ];
var r = /\$\{(.*?)\}/g;
var t = function(a;
var b) {
        var c = e.getCommandKeystroke(b);
        if (c) {
            for (var l;
var f;
var h = [];
var g = 0; g < k.length; g++) f = k[g], l = c / k[g], 1 < l && 2 >= l && (c -= f, 
            h.push(d[f]));
            h.push(d[c] || String.fromCharCode(c));
            c = h.join("+");
        } else c = a;
        return c;
    };
    return {
        title: a.title,
        minWidth: 600,
        minHeight: 400,
        contents: [ {
            id: "info",
            label: e.lang.common.generalTab,
            expand: !0,
            elements: [ {
                type: "html",
                id: "legends",
                style: "white-space:normal;",
                focus: function() {
                    this.getElement().focus();
                },
                html: function() {
                    for (var b = '<div class="cke_accessibility_legend" role="document" aria-labelledby="' + q + '_arialbl" tabIndex="-1">%1</div><span id="' + q + '_arialbl" class="cke_voice_label">' + a.contents + " </span>";
var d = [];
var c = a.legend;
var l = c.length;
var f = 0; f < l; f++) {
                        for (var h = c[f];
var g = [];
var e = h.items;
var k = e.length;
var p = 0; p < k; p++) {
                            var m = e[p];
var n = CKEDITOR.env.edge && m.legendEdge ? m.legendEdge : m.legend;
var n = n.replace(r;
var t);
                            n.match(r) || g.push("<dt>%1</dt><dd>%2</dd>".replace("%1", m.name).replace("%2", n));
                        }
                        d.push("<h1>%1</h1><dl>%2</dl>".replace("%1", h.name).replace("%2", g.join("")));
                    }
                    return b.replace("%1", d.join(""));
                }() + '<style type="text/css">.cke_accessibility_legend{width:600px;height:400px;padding-right:5px;overflow-y:auto;overflow-x:hidden;}.cke_browser_quirks .cke_accessibility_legend,{height:390px}.cke_accessibility_legend *{white-space:normal;}.cke_accessibility_legend h1{font-size: 20px;border-bottom: 1px solid #AAA;margin: 5px 0px 15px;}.cke_accessibility_legend dl{margin-left: 5px;}.cke_accessibility_legend dt{font-size: 13px;font-weight: bold;}.cke_accessibility_legend dd{margin:10px}</style>'
            } ]
        } ],
        buttons: [ CKEDITOR.dialog.cancelButton ]
    };
}));