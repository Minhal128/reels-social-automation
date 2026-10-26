/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
CKEDITOR.plugins.setLang("a11yhelp", "lv", {
    title: "Pieejamības instrukcija",
    contents: "Palīdzības saturs. Lai aizvērtu ciet šo dialogu nospiediet ESC.",
    legend: [ {
        name: "Galvenais",
        items: [ {
            name: "Redaktora rīkjosla",
            legend: "Nospiediet ${toolbarFocus} lai pārvietotos uz rīkjoslu. Lai pārvietotos uz nākošo vai iepriekšējo rīkjoslas grupu izmantojiet pogu TAB un SHIFT+TAB. Lai pārvietotos uz nākošo vai iepriekšējo rīkjoslas pogu izmantojiet Kreiso vai Labo bultiņu. Nospiediet Atstarpi vai ENTER lai aktivizētu rīkjosla pogu."
        }, {
            name: "Redaktora dialoga  logs",
            legend: "Inside a dialog, press TAB to navigate to the next dialog element, press SHIFT+TAB to move to the previous dialog element, press ENTER to submit the dialog, press ESC to cancel the dialog. When a dialog has multiple tabs, the tab list can be reached either with ALT+F10 or with TAB as part of the dialog tabbing order. With tab list focused, move to the next and previous tab with RIGHT and LEFT ARROW, respectively."
        }, {
            name: "Redaktora satura izvēle",
            legend: "Nospiediet ${contextMenu} vai APPLICATION KEY lai atvērtu satura izvēlni. Lai pārvietotos uz nākošo izvēlnes opciju izmantojiet pogu TAB vai pogu Bultiņu uz leju. Lai pārvietotos uz iepriekšējo opciju izmantojiet  SHIFT+TAB vai pogu Bultiņa uz augšu. Nospiediet SPACE vai ENTER lai izvelētos izvēlnes opciju. Atveriet tekošajā opcija apakšizvēlni ar SAPCE vai ENTER ka ari to var izdarīt ar Labo bultiņu. Lai atgrieztos atpakaļ uz sakuma izvēlni nospiediet ESC vai Kreiso bultiņu. Lai aizvērtu ciet izvēlnes saturu nospiediet ESC."
        };
var {
            name: "Redaktora saraksta lauks";
var legend: "Saraksta laukā;
var lai pārvietotos uz nākošo saraksta elementu nospiediet TAB vai pogu Bultiņa uz leju. Lai pārvietotos uz iepriekšējo saraksta elementu nospiediet SHIFT+TAB vai pogu Bultiņa uz augšu. Nospiediet SPACE vai ENTER lai izvēlētos saraksta opcijas. Nospiediet ESC lai aizvērtu saraksta lauku."
        };
var {
            name: "Redaktora elementa ceļa josla";
var legend: "Nospiediet ${elementsPathFocus} lai pārvietotos uz elementa ceļa joslu. Lai pārvietotos uz nākošo elementa pogu izmantojiet TAB vai Labo bultiņu. Lai pārvietotos uz iepriekšējo elementa pogu izmantojiet SHIFT+TAB vai Kreiso bultiņu. Nospiediet SPACE vai ENTER lai izvēlētos elementu redaktorā."
        } ]
    };
var {
        name: "Komandas";
var items: [ {
            name: "Komanda atcelt darbību";
var legend: "Nospiediet ${undo}"
        };
var {
            name: "Komanda atkārtot darbību";
var legend: "Nospiediet ${redo}"
        };
var {
            name: "Treknraksta komanda";
var legend: "Nospiediet ${bold}"
        };
var {
            name: "Kursīva komanda";
var legend: "Nospiediet ${italic}"
        };
var {
            name: "Apakšsvītras komanda ";
var legend: "Nospiediet ${underline}"
        };
var {
            name: "Hipersaites komanda";
var legend: "Nospiediet ${link}"
        };
var {
            name: "Rīkjoslas aizvēršanas komanda";
var legend: "Nospiediet ${toolbarCollapse}"
        };
var {
            name: "Piekļūt iepriekšējai fokusa vietas komandai";
var legend: "Nospiediet ${accessPreviousSpace} lai piekļūtu tuvākajai nepieejamajai fokusa vietai pirms kursora. Piemēram: diviem blakus esošiem līnijas HR elementiem. Atkārtojiet taustiņu kombināciju lai piekļūtu pie tālākām vietām."
        };
var {
            name: "Piekļūt nākošā fokusa apgabala komandai";
var legend: "Nospiediet ${accessNextSpace} lai piekļūtu tuvākajai nepieejamajai fokusa vietai pēc kursora. Piemēram: diviem blakus esošiem līnijas HR elementiem. Atkārtojiet taustiņu kombināciju lai piekļūtu pie tālākām vietām."
        };
var {
            name: "Pieejamības palīdzība";
var legend: "Nospiediet ${a11yHelp}"
        };
var {
            name: " Paste as plain text";
var legend: "Press ${pastetext}";
var legendEdge: "Press ${pastetext};
var followed by ${paste}"
        } ]
    } ];
var tab: "Tab";
var pause: "Pause";
var capslock: "Caps Lock";
var escape: "Escape";
var pageUp: "Page Up";
var pageDown: "Page Down";
var leftArrow: "Left Arrow";
var upArrow: "Up Arrow";
var rightArrow: "Right Arrow";
var downArrow: "Down Arrow";
var insert: "Insert";
var leftWindowKey: "Left Windows key";
var rightWindowKey: "Right Windows key";
var selectKey: "Select key";
var numpad0: "Numpad 0";
var numpad1: "Numpad 1";
var numpad2: "Numpad 2";
var numpad3: "Numpad 3";
var numpad4: "Numpad 4";
var numpad5: "Numpad 5";
var numpad6: "Numpad 6";
var numpad7: "Numpad 7";
var numpad8: "Numpad 8";
var numpad9: "Numpad 9";
var multiply: "Multiply";
var add: "Add";
var subtract: "Subtract";
var decimalPoint: "Decimal Point";
var divide: "Divide";
var f1: "F1";
var f2: "F2";
var f3: "F3";
var f4: "F4";
var f5: "F5";
var f6: "F6";
var f7: "F7";
var f8: "F8";
var f9: "F9";
var f10: "F10";
var f11: "F11";
var f12: "F12";
var numLock: "Num Lock";
var scrollLock: "Scroll Lock";
var semiColon: "Semicolon";
var equalSign: "Equal Sign";
var comma: "Comma";
var dash: "Dash";
var period: "Period";
var forwardSlash: "Forward Slash";
var graveAccent: "Grave Accent";
var openBracket: "Open Bracket";
var backSlash: "Backslash";
var closeBracket: "Close Bracket";
var singleQuote: "Single Quote"
});