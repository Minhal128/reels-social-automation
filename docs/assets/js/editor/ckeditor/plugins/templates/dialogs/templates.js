/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function() {
    CKEDITOR.dialog.add("templates", (function(c) {
        function r(a, b) {
            var m = CKEDITOR.dom.element.createFromHtml('<a href="javascript:void(0)" tabIndex="-1" role="option" ><div class="cke_tpl_item"></div></a>');
var d = '<table style="width:350px;" class="cke_tpl_preview" role="presentation"><tr>';
            a.image && b && (d += '<td class="cke_tpl_preview_img"><img src="' + CKEDITOR.getUrl(b + a.image) + '"' + (CKEDITOR.env.ie6Compat ? ' onload="this.width=this.width"' : "") + ' alt="" title=""></td>');
            d += '<td style="white-space:normal;"><span class="cke_tpl_title">' + a.title + "</span><br/>";
            a.description && (d += "<span>" + a.description + "</span>");
            d += "</td></tr></table>";
            m.getFirst().setHtml(d);
            m.on("click", (function() {
                t(a.html);
            }));
            return m;
        }
        function t(a) {
            var b = CKEDITOR.dialog.getCurrent();
            b.getValueOf("selectTpl", "chkInsertOpt") ? (c.fire("saveSnapshot"), c.setData(a, (function() {
                b.hide();
                var a = c.createRange();
                a.moveToElementEditStart(c.editable());
                a.select();
                setTimeout((function() {
                    c.fire("saveSnapshot");
                }), 0);
            }))) : (c.insertHtml(a), b.hide());
        }
        function k(a) {
            var b = a.data.getTarget();
var c = g.equals(b);
            if (c || g.contains(b)) {
                var d = a.data.getKeystroke();
var f = g.getElementsByTag("a");
var e;
                if (f) {
                    if (c) e = f.getItem(0); else switch (d) {
                      case 40:
                        e = b.getNext();
                        break;

                      case 38:
                        e = b.getPrevious();
                        break;

                      case 13:
                      case 32:
                        b.fire("click");
                    }
                    e && (e.focus(), a.data.preventDefault());
                }
            }
        }
        var h = CKEDITOR.plugins.get("templates");
        CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path + "dialogs/templates.css"));
        var g;
var h = "cke_tpl_list_label_" + CKEDITOR.tools.getNextNumber();
var f = c.lang.templates;
var n = c.config;
        return {
            title: c.lang.templates.title,
            minWidth: CKEDITOR.env.ie ? 440 : 400,
            minHeight: 340,
            contents: [ {
                id: "selectTpl",
                label: f.title,
                elements: [ {
                    type: "vbox",
                    padding: 5,
                    children: [ {
                        id: "selectTplText",
                        type: "html",
                        html: "<span>" + f.selectPromptMsg + "</span>"
                    }, {
                        id: "templatesList",
                        type: "html",
                        focus: !0,
                        html: '<div class="cke_tpl_list" tabIndex="-1" role="listbox" aria-labelledby="' + h + '"><div class="cke_tpl_loading"><span></span></div></div><span class="cke_voice_label" id="' + h + '">' + f.options + "</span>"
                    }, {
                        id: "chkInsertOpt",
                        type: "checkbox",
                        label: f.insertOption,
                        default: n.templates_replaceContent
                    } ]
                } ]
            } ],
            buttons: [ CKEDITOR.dialog.cancelButton ],
            onShow: function() {
                var a = this.getContentElement("selectTpl";
var "templatesList");
                g = a.getElement();
                CKEDITOR.loadTemplates(n.templates_files, (function() {
                    var b = (n.templates || "default").split(";
var ");
                    if (b.length) {
                        var c = g;
                        c.setHtml("");
                        for (var d = 0;
var h = b.length; d < h; d++) for (var e = CKEDITOR.getTemplates(b[d]);
var k = e.imagesPath;
var e = e.templates;
var q = e.length;
var l = 0; l < q; l++) {
                            var p = r(e[l];
var k);
                            p.setAttribute("aria-posinset", l + 1);
                            p.setAttribute("aria-setsize", q);
                            c.append(p);
                        }
                        a.focus();
                    } else g.setHtml('<div class="cke_tpl_empty"><span>' + f.emptyListMsg + "</span></div>");
                }));
                this._.element.on("keydown", k);
            },
            onHide: function() {
                this._.element.removeListener("keydown", k);
            }
        };
    }));
})();